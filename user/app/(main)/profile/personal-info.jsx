import React, { useLayoutEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Reusable RoleButton component
const RoleButton = ({ role, selectedRole, onSelect }) => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
  return (
    <TouchableOpacity
      className={`flex-1 mx-1 py-3 rounded-md border border-gray-300 ${
        role === selectedRole ? 'bg-gray-800' : 'bg-white'
      }`}
      onPress={() => onSelect(role)}
    >
      <Text
        className={`text-center font-bold ${
          role === selectedRole ? 'text-white' : 'text-gray-800'
        }`}
      >
        {role}
      </Text>
    </TouchableOpacity>
  );
};

const PersonalInfoScreen = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Agent'); // Default role
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigation = useNavigation();

  // List of available roles
  const roles = ['Agent', 'Owner', 'Driver'];

  // Handle role selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  // Handle form submission (for the Update button)
  const handleUpdate = () => {
    console.log('Updated Info:', { name, location, companyName, email, role, licenseNumber });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='bg-white p-4' style={{ elevation:5  }}>
          <Text onPress={() => navigation.goBack()}>Back</Text>
          </View>
          <View className="p-5">
            {/* Avatar */}
            <View className="items-center mb-8">
              <Image
                source={{ uri: 'https://avatar.iran.liara.run/public/40' }}
                className="w-20 h-20 rounded-full"
                resizeMode="cover"
              />
            </View>

            {/* Form Fields */}
            <View className="mb-6">
              <TextInput
                className="bg-white rounded-md p-4 text-base text-gray-800 border border-gray-300"
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="bg-white rounded-md p-4 text-base text-gray-800 border border-gray-300"
                value={location}
                onChangeText={setLocation}
                placeholder="Location"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="bg-white rounded-md p-4 text-base text-gray-800 border border-gray-300"
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View className="mb-6">
              <TextInput
                className="bg-white rounded-md p-4 text-base text-gray-800 border border-gray-300"
                value={email}
                onChangeText={setEmail}
                placeholder="Email (Optional)"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
              />
            </View>

            {/* Role Selection */}
            <View className="flex-row justify-between mb-6">
              {roles.map((roleItem) => (
                <RoleButton
                  key={roleItem}
                  role={roleItem}
                  selectedRole={role}
                  onSelect={handleRoleSelect}
                />
              ))}
            </View>

            <View className="mb-8">
              <TextInput
                className="bg-white rounded-md p-4 text-base text-gray-800 border border-gray-300"
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                placeholder="License Number (Optional)"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            {/* Update Button */}
            <TouchableOpacity
              className="bg-green-500 py-4 rounded-md mt-4 mb-10"
              onPress={handleUpdate}
            >
              <Text className="text-center text-white font-bold text-base">
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;