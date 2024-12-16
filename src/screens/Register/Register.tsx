import { View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import tw from 'twrnc';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputFields';
import { RootStackParamList } from '../../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = () => {
    if (!usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
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
        <View style={tw`w-full`}>
          <InputField
            label="İstifadəçi adı"
            iconName="person-outline"
            value={usernameInput}
            onChangeText={setUsernameInput}
          />
          <InputField
            label="E-poçt"
            iconName="mail-outline"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <InputField
            label="Şifrə"
            iconName="eye-outline"
            secureTextEntry={!isPasswordVisible}
            value={passwordInput}
            onChangeText={setPasswordInput}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <InputField
            label="Şifrəni təsdiq et"
            iconName="eye-outline"
            secureTextEntry={!isPasswordVisible}
            value={confirmPasswordInput}
            onChangeText={setConfirmPasswordInput}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <CustomButton
            title={isLoading ? "Qeydiyyatdan keçirilir..." : "Qeydiyyatdan keç"}
            onPress={handleRegister}
            disabled={isLoading}
            style={isLoading ? tw`bg-gray-400` : tw`bg-green-500`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;