import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

// Reusable PaymentMethodButton component
const PaymentMethodButton = ({ method, selectedMethod, onSelect }) => {
  return (
    <TouchableOpacity
      className={`flex-1 mx-2 py-3 rounded-full border border-gray-300 ${
        method === selectedMethod ? 'bg-gray-800' : 'bg-white'
      }`}
      onPress={() => onSelect(method)}
    >
      <Text
        className={`text-center font-bold ${
          method === selectedMethod ? 'text-white' : 'text-gray-800'
        }`}
      >
        {method}
      </Text>
    </TouchableOpacity>
  );
};

const PaymentMethodsScreen = () => {
  // State for payment method and input
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default payment method
  const [paymentDetail, setPaymentDetail] = useState('');

  // List of available payment methods
  const methods = ['UPI', 'BANK DETAILS'];

  // Handle payment method selection
  const handleMethodSelect = (selectedMethod) => {
    setPaymentMethod(selectedMethod);
    setPaymentDetail(''); // Reset input when switching methods
  };

  // Handle form submission (for the Update button)
  const handleUpdate = () => {
    console.log('Updated Payment Method:', { paymentMethod, paymentDetail });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-5">
        {/* Instruction Text */}
        <Text className="text-base text-gray-800 mb-6">
          Please select your payment method
        </Text>

        {/* Payment Method Selection */}
        <View className="flex-row justify-between mb-6">
          {methods.map((method) => (
            <PaymentMethodButton
              key={method}
              method={method}
              selectedMethod={paymentMethod}
              onSelect={handleMethodSelect}
            />
          ))}
        </View>

        {/* Input Field */}
        <View className="mb-6">
          <TextInput
            className="bg-white rounded-md p-4 text-base text-gray-800 border border-gray-300"
            value={paymentDetail}
            onChangeText={setPaymentDetail}
            placeholder={paymentMethod === 'UPI' ? 'Enter UPI ID' : 'Enter Bank Details'}
            placeholderTextColor="#A9A9A9"
          />
        </View>

        {/* Description Text */}
        <Text className="text-sm text-blue-800 mb-8">
          Please enter required details. You will receive your commission in the
          same once booking has been ended.
        </Text>

        {/* Update Button */}
        <TouchableOpacity
          className="bg-greenish py-4 rounded-md mt-4"
          onPress={handleUpdate}
        >
          <Text className="text-center text-white font-bold text-base">
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;