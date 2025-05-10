import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="p-5 bg-white">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://avatar.iran.liara.run/public/40' }}
              className="w-20 h-20 rounded-full mr-4"
              resizeMode="cover"
            />
            <View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">Hi👋🏻 John!</Text>
              <Text className="text-base text-gray-600">23409185786</Text>
            </View>
          </View>
        </View>

        {/* Status Section */}
        <View className="flex-row justify-evenly px-5 py-5">
          <View className="bg-orange-500 py-3 px-8 rounded-md">
            <Text className="text-white text-lg font-bold">Free User</Text>
          </View>
          <TouchableOpacity className="bg-greenish py-3 px-8 rounded-md">
            <Text className="text-white text-lg font-bold">Upgrade Now</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-blue-500 text-sm font-bold text-center py-2">
          You can only take 2 more bookings as a FREE User. Upgrade Now!!!
        </Text>

        {/* Account Section */}
        <View className="mt-5 px-5">
          <Text className="text-base font-bold text-gray-800 mb-3">Account</Text>         
           <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200"
          onPress={() => router.push("/(main)/profile/personal-info")}
          >
            <Text className="text-base text-gray-800">Personal Information</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">My Network</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Offers & Contest</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Manage Drivers</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Manage Vehicles</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200"
          onPress={() => router.push("/(main)/profile/payment-method")}
          >
            <Text className="text-base text-gray-800">Payment Methods</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Language</Text>
            <View className="flex-row items-center">
              <Text className="text-base text-gray-600 mr-2">English</Text>
              <Text className="text-xl text-gray-600">›</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Transactions</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View className="mt-5 px-5 mb-5">
          <Text className="text-base font-bold text-gray-800 mb-3">General</Text>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">About us</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Privacy Policy</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Booking Management Software</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
            <Text className="text-base text-gray-800">Logout</Text>
            <Text className="text-xl text-gray-600">›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;