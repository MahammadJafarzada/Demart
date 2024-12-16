import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

interface InputFieldProps {
  label: string;
  iconName: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  togglePasswordVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconName,
  secureTextEntry = false,
  value,
  onChangeText,
  onFocus,
  togglePasswordVisibility,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedLabel] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused]);

  return (
    <View style={tw`mb-4 relative`}>
      <Animated.Text
        style={[
          styles.floatingLabel,
          {
            top: animatedLabel.interpolate({
              inputRange: [0, 1],
              outputRange: [20, -8],
            }),
            fontSize: animatedLabel.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: animatedLabel.interpolate({
              inputRange: [0, 1],
              outputRange: ["#888", "#000"],
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        placeholder=""
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setIsFocused(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => setIsFocused(false)}
        style={tw`bg-gray-200 p-4 rounded-lg pl-4`}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <Ionicons
          name={
            iconName === "eye-outline" && secureTextEntry
              ? "eye-off"
              : iconName === "person-outline"
              ? "person-outline"
              : "eye"
          }
          size={23}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingLabel: {
    position: "absolute",
    left: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    bottom: 8,
    padding: 8,
  },
});

export default InputField;