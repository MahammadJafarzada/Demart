import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Icon from "@expo/vector-icons/Feather";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { RootState } from "../../redux/store";
import axios from "axios";
import { CHAT_URL, MESSAGES_URL } from "../../utils/config";
import ChatBubble from "../../components/ChatComponents/ChatBubble";
import {
  addUser,
  resetUnreadMessageCount,
  setChatScreenActive,
  setSelectedUser,
  setUpdateLastMessageDate,
  updateLastMessageDate,
  updateUserOrder,
} from "../../redux/reducers/ConnectionSlice";
import { useDispatch, useSelector } from "react-redux";
import SignalRService from "../../middleware/signalrMiddleware";
import { IMessage } from "../../middleware/signalrMiddleware";
import { RootStackParamList } from "../../../types";
import DateHeader from "../../components/ChatComponents/DateHeader";
import formatMessageDate from "../../components/ChatComponents/formattedMessage";
import ChatHeader from "../../components/ChatComponents/ChatHeader";
import SwipeToExitWrapper from "../../components/SwipeToExit";
import ChatMessages from "../../components/ChatComponents/ChatMessages";

export interface IMessageWithFullDate extends IMessage {
  fullDate: Date;
  sending: boolean;
}

export interface IMessageGroup {
  type: "date" | "message";
  content: string | IMessageWithFullDate;
}

export const MemoizedChatBubble = memo(ChatBubble);
export const MemoizedDateHeader = memo(DateHeader);

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [groupedMessages, setGroupedMessages] = useState<IMessageGroup[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);
  const selectedUser = useSelector(
    (state: RootState) => state.connection.selectedUser
  );
  const currentUserId = useSelector(
    (state: RootState) => state.auth.decodedToken.data.inspectorId
  );
  const [isChatScreenActive, setIsChatScreenActive] = useState<boolean>(false);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      setIsChatScreenActive(true);

      return () => setIsChatScreenActive(false);
    }, [])
  );

  const processMessages = useCallback(
    (messages: IMessage[]): IMessageGroup[] => {
      const messagesWithDates: IMessageWithFullDate[] = messages.map((msg) => ({
        ...msg,
        fullDate: new Date(msg.createdDate),
        sending,
      }));

      const groups: IMessageGroup[] = [];
      let currentDate: string | null = null;

      messagesWithDates.forEach((message) => {
        const messageDate = new Date(message.fullDate);
        const formattedDate = formatMessageDate(messageDate);

        if (formattedDate !== currentDate) {
          groups.push({
            type: "date",
            content: formattedDate,
          });
          currentDate = formattedDate;
        }

        groups.push({
          type: "message",
          content: message,
        });
      });

      return groups;
    },
    []
  );

  const fetchMessages = useCallback(async () => {
    if (!selectedUser || !token) return;
    try {
      const response = await axios.get(`${MESSAGES_URL}+${selectedUser.id}`, {
        headers: {
          accept: "application/json",
          "api-key": token,
        },
      });

      const fetchedMessages = response.data.data.map((msg: any) => ({
        id: msg.id,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        content: msg.content,
        createdDate: msg.createdDate,
        isSeen: msg.isSeen,
      }));

      const reversedMessages = fetchedMessages.reverse();
      setGroupedMessages(processMessages(reversedMessages));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [selectedUser, token, processMessages]);

  useEffect(() => {
    const signalR = SignalRService.getInstance();

    const handleMessage = (res: string) => {
      const parsedRes = JSON.parse(res);
      const newMessage: IMessage = {
        ...parsedRes.data,
        createdDate: parsedRes.data.createdDate,
      };

      if (selectedUser.id === parsedRes.data.senderId) {
        setGroupedMessages((prevGroupedMessages) => {
          const updatedMessages = prevGroupedMessages
            .filter((item) => item.type === "message")
            .map((item) => item.content as IMessageWithFullDate);

          return processMessages([...updatedMessages, newMessage]);
        });

        signalR.invoke(
          "UpdateNewMessageAsSeen",
          currentUserId,
          selectedUser.id
        );
        dispatch(updateUserOrder(selectedUser.id));
        dispatch(resetUnreadMessageCount(selectedUser.id));
      }
    };

    const handleSeenMessage = (res: number) => {
      if (res == selectedUser.id) {
        setGroupedMessages((prevGroupedMessages) => {
          const updatedMessages = prevGroupedMessages.map((group) => {
            if (group.type === "message") {
              const message = group.content as IMessageWithFullDate;
              if (message.senderId == currentUserId) {
                return {
                  ...group,
                  content: { ...message, isSeen: true },
                };
              }
            }
            return group;
          });
          return updatedMessages;
        });
      }
    };

    const handleOnlineStatus = (res: any) => {
      if (selectedUser && res.id === selectedUser.id) {
        dispatch(setSelectedUser({ ...selectedUser, isOnline: res.isOnline }));
      }
    };

    signalR.on("Messages", handleMessage);
    signalR.on("IsMessagesSeen", handleSeenMessage);
    signalR.on("IsMyNewMessageSeen", handleSeenMessage);
    signalR.on("GetUserOnlineStatus", handleOnlineStatus);

    return () => {
      signalR.off("Messages", handleMessage);
      signalR.off("IsMessagesSeen", handleSeenMessage);
      signalR.off("IsMyNewMessageSeen", handleSeenMessage);
      signalR.off("GetUserOnlineStatus", handleOnlineStatus);
    };
  }, [selectedUser, currentUserId, dispatch, processMessages]);

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
      dispatch(setChatScreenActive(true));
      if (selectedUser) {
        dispatch(resetUnreadMessageCount(selectedUser.id));
      }

      return () => {
        dispatch(setChatScreenActive(false));
      };
    }, [selectedUser, dispatch])
  );

  const sendMessage = async () => {
    if (!inputMessage.trim() || sending || !selectedUser) return;
    setSending(true);

    const newMessage: IMessageWithFullDate = {
      id: Date.now(),
      senderId: currentUserId,
      receiverId: selectedUser.id,
      content: inputMessage.trim(),
      createdDate: new Date().toISOString(),
      isSeen: false,
      fullDate: new Date(),
      sending: true,
    };

    setUpdateLastMessageDate(newMessage.createdDate);

    setGroupedMessages((prevGroupedMessages) => {
      const updatedMessages = prevGroupedMessages
        .filter((item) => item.type === "message")
        .map((item) => item.content as IMessageWithFullDate);

      return processMessages([...updatedMessages, newMessage]);
    });

    setInputMessage("");

    try {
      const response = await axios.post(
        `${CHAT_URL}/SendMessage`,
        {
          receiverId: selectedUser.id,
          content: newMessage.content,
        },
        {
          headers: {
            accept: "application/json",
            "api-key": token,
          },
        }
      );

      if (response.status === 200) {
        const sentMessage: IMessage = {
          ...response.data.data,
          createdDate: response.data.data.createdDate,
        };
        setGroupedMessages((prevGroupedMessages) => {
          const updatedMessages = prevGroupedMessages.map((group) => {
            if (group.type === "message") {
              const message = group.content as IMessageWithFullDate;
              if (message.id === newMessage.id) {
                return {
                  ...group,
                  content: {
                    ...sentMessage,
                    fullDate: new Date(sentMessage.createdDate),
                    sending: false,
                  },
                };
              }
            }
            return group;
          });
          return updatedMessages;
        });

        dispatch(addUser(selectedUser));
        dispatch(updateUserOrder(selectedUser.id));
        dispatch(
          updateLastMessageDate({
            userId: selectedUser.id,
            date: sentMessage.createdDate,
          })
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const keyExtractor = useCallback((item: IMessageGroup, index: number) => {
    if (item.type === "date") {
      return `date-${item.content}`;
    }
    return `message-${(item.content as IMessageWithFullDate).id}-${index}`;
  }, []);
  const flatListRef = useRef<FlatList<IMessageGroup>>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [groupedMessages]);
  const handleExit = () => {
    navigation.goBack();
  };
  return (
    <SwipeToExitWrapper onExit={handleExit}>
      <SafeAreaView style={tw`flex-1`}>
        <ImageBackground
          source={require("../../../assets/images/bg-dgk.png")}
          style={tw`flex-1 justify-center`}
          resizeMode="cover"
        >
          <ChatHeader navigation={navigation} selectedUser={selectedUser} />
          <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
          >
            <FlatList
              data={groupedMessages.slice().reverse()}
              renderItem={({ item }) => (
                <ChatMessages item={item} currentUserId={currentUserId} />
              )}
              inverted
              keyExtractor={keyExtractor}
              style={tw`flex-1 p-2`}
              initialNumToRender={15}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
            <View
              style={tw`flex-row items-center p-2 border-t border-gray-300 bg-white bg-opacity-80`}
            >
              <TextInput
                value={inputMessage}
                onChangeText={setInputMessage}
                style={tw`flex-1 bg-white p-2 rounded-full border border-gray-300`}
                placeholder="Mesajınızı daxil edin..."
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={tw`ml-2 bg-blue-500 p-3 rounded-full`}
                disabled={sending}
              >
                <Icon name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    </SwipeToExitWrapper>
  );
};
export default memo(ChatScreen);
