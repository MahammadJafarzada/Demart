import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Pressable } from 'react-native';
import tw from 'twrnc';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled:boolean;
  style:any;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <View style={tw`mt-4 bg-[#000787] rounded-lg `}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#000787', 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.0016,
    color: '#fff', 
    textAlign: 'center',
  },
});

export default CustomButton;