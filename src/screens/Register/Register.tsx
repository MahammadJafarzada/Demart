import { View, SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import tw from "twrnc";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputFields";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";

const Register = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = () => {
    if (!emailInput || !passwordInput || !confirmPasswordInput) {
      alert("Zəhmət olmasa bütün sahələri doldurun");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      alert("Düzgün e-poçt ünvanı daxil edin");
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      alert("Şifrələr uyğun gəlmir");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      alert("Qeydiyyat uğurla tamamlandı!");
      navigation.navigate("Login");
    }, 2000);
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
          <Text style={tw`text-3xl font-bold text-center`}>Create an account</Text>
        </View>
        <View style={tw`w-full`}>
          <InputField
            label="Username or email"
            iconName="person-outline"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <InputField
            label="Password"
            iconName="eye-outline"
            secureTextEntry={!isPasswordVisible}
            value={passwordInput}
            onChangeText={setPasswordInput}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <InputField
            label="Confirm Password"
            iconName="eye-outline"
            secureTextEntry={!isPasswordVisible}
            value={confirmPasswordInput}
            onChangeText={setConfirmPasswordInput}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <CustomButton
            title={isLoading ? "Register..." : "Register"}
            onPress={handleRegister}
            disabled={isLoading}
            style={isLoading ? tw`bg-gray-400` : tw`bg-green-500`}
          />
        </View>
        <View style={tw`mt-4`}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-pink-500 text-center`}>I Already Have an Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
