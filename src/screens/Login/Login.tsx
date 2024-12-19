import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputFields";
import { RootStackParamList } from "../../../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("Main");
  };
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView
        contentContainerStyle={tw`flex-1 justify-center items-center p-6`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`mb-6`}>
          <Text style={tw`text-3xl font-bold text-center`}>Welcome Back!</Text>
        </View>
        <View style={tw`w-full`}>
          <InputField
            label="Username or email"
            iconName="person-outline"
            value={usernameInput}
            onChangeText={setUsernameInput}
          />
          <InputField
            label="Password"
            iconName="eye-outline"
            secureTextEntry={!isPasswordVisible}
            value={passwordInput}
            onChangeText={setPasswordInput}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={tw`text-pink-500 text-right mb-2`}>Forgot Password?</Text>
          </TouchableOpacity>
          <CustomButton
            title={isLoading ? "Login..." : "Login"}
            onPress={handleLogin}
            disabled={isLoading}
            style={isLoading ? tw`bg-gray-400` : tw`bg-blue-500`}
          />
        </View>
        <View style={tw`mt-4`}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={tw`text-pink-500 text-center`}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
