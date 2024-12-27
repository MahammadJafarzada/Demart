import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/InputFields'
import tw from "twrnc";
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../types'

const ForgotPassword = () => {
    const [emailInput, setEmailInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const handleSendEmail = () => {
        navigation.navigate('Login')
    }

  return (
    <SafeAreaView style={tw`flex-1`}>
    <ScrollView
      contentContainerStyle={tw`flex-1 justify-center items-center p-6`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`mb-6`}>
        <Text style={tw`text-3xl font-bold text-center`}>Forgot password?</Text>
      </View>
      <View style={tw`w-full`}>
        <InputField
          label="Your Email"
          iconName="mail-outline"
          value={emailInput}
          onChangeText={setEmailInput}
        />
        
        <CustomButton
          title={isLoading ? "Submit..." : "Submit"}
          onPress={handleSendEmail}
          disabled={isLoading}
          style={isLoading ? tw`bg-gray-400` : tw`bg-green-500`}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default ForgotPassword