import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  Slider as MainSlider,
  MostFavouraiteProducts,
  FeedHeader,
  ShowWrapper,
  Icons,
} from '@/components'
import { useGetFeedInfoQuery } from '@/services'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function FeedScreen() {
  //? Assets

  //? Get Feeds Query
  const {
    data: { childCategories, currentCategory, sliders, bannerOneType, bannerTwoType },
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetFeedInfoQuery(
    {},
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  )

  //? Assets
  const [selectedTab, setSelectedTab] = useState('Booking')
  const dummyBookings = [
    {
      id: '10292938',
      status: 'Open',
      time: 'Tomorrow @ 5:00 PM',
      from: 'Bhopal',
      to: 'Ranchi',
      tripType: 'One Way',
      carType: 'Sedan',
      carImage:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10655/1744284802118/front-left-side-47.jpg?impolicy=resize&imwidth=360',
    },
    {
      id: '10293999',
      status: 'Confirmed',
      time: 'Today @ 3:00 PM',
      from: 'Delhi',
      to: 'Agra',
      tripType: 'Round Trip',
      carType: 'SUV',
      carImage:
        'https://imgd.aeplcdn.com/642x336/n/cw/ec/131825/be-6e-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80',
    },
    {
      id: '10300001',
      status: 'Pending',
      time: 'Monday @ 10:30 AM',
      from: 'Mumbai',
      to: 'Pune',
      tripType: 'One Way',
      carType: 'Hatchback',
      carImage:
        'https://stimg2.cardekho.com/images/roadTestimages/large/20151205_205955/355/tata0.jpg?impolicy=resize&imwidth=420',
    },
    {
      id: '10292921',
      status: 'Open',
      time: 'Tomorrow @ 5:00 PM',
      from: 'Bhopal',
      to: 'Ranchi',
      tripType: 'One Way',
      carType: 'Sedan',
      carImage:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10655/1744284802118/front-left-side-47.jpg?impolicy=resize&imwidth=360',
    },
    {
      id: '10293934',
      status: 'Confirmed',
      time: 'Today @ 3:00 PM',
      from: 'Delhi',
      to: 'Agra',
      tripType: 'Round Trip',
      carType: 'SUV',
      carImage:
        'https://imgd.aeplcdn.com/642x336/n/cw/ec/131825/be-6e-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80',
    },
    {
      id: '10300090',
      status: 'Pending',
      time: 'Monday @ 10:30 AM',
      from: 'Mumbai',
      to: 'Pune',
      tripType: 'One Way',
      carType: 'Hatchback',
      carImage:
        'https://stimg2.cardekho.com/images/roadTestimages/large/20151205_205955/355/tata0.jpg?impolicy=resize&imwidth=420',
    },
  ]
  //? Render(s)
  const renderTabContent = () => {
    if (selectedTab === 'Booking') {
      return (
        <ScrollView>
          {/* <View >
            <Text className='text-xs'>ID:10292938 (Open)</Text>
            <Text className='text-sm font-semibold'>Tomorrow @ 5:00 PM</Text>
            <View className='flex-row justify-between'>
              <Text>Bhopal</Text>
              <View>
              <Text>Icon</Text>
              <Text>One Way</Text>
              </View>
              <Text>Ranchi</Text>
            </View>
            <View style={{ width:100, height:100, backgroundColor:'grey'  }}></View>
         </View> */}
          {dummyBookings.map((item, index) => (
            <BookingCard key={item.id} data={item} />
          ))}
        </ScrollView>
      )
    } else if (selectedTab === 'Free Vehicles') {
      return (
        <ScrollView>
          <Text>Free Vehicles Tab Content</Text>
          {/* Add Free Vehicles-specific content here */}
        </ScrollView>
      )
    }
  }

  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          header: props => <FeedHeader {...props} title="Home" icon="menu-outline" />,
        }}
      />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        type="detail"
      >
        <ScrollView className="bg-white flex h-full px-3">
          <>
            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
              <View>
                <Text
                  style={[styles.tabButton, selectedTab === 'Booking' && styles.activeTab]}
                  onPress={() => setSelectedTab('Booking')}
                >
                  Booking
                </Text>
                {selectedTab === 'Booking' && (
                  <View className="bg-greenish" style={{ height: 3, width: '100%' }}></View>
                )}
              </View>
              <View>
                <Text
                  style={[styles.tabButton, selectedTab === 'Free Vehicles' && styles.activeTab]}
                  onPress={() => setSelectedTab('Free Vehicles')}
                >
                  Free Vehicles
                </Text>
                {selectedTab === 'Free Vehicles' && (
                  <View className="bg-greenish" style={{ height: 3, width: '100%' }}></View>
                )}
              </View>
            </View>

            {/* Tab Content */}
            {renderTabContent()}

            {/* old codes  */}
            {/* <Categories
              childCategories={{ categories: childCategories, title: '所有分类' }}
              color={currentCategory?.colors?.start}
              name={currentCategory?.name}
              homePage
            />
            <DiscountSlider currentCategory={currentCategory} />
            <BannerOne data={bannerOneType} />
            <BestSellsSlider categorySlug={currentCategory?.slug} />
            <BannerTwo data={bannerTwoType} />
            <MostFavouraiteProducts categorySlug={currentCategory?.slug} /> */}
          </>
        </ScrollView>
      </ShowWrapper>
    </>
  )
}
function BookingCard({ data }) {
  return (
    <View
      className="p-4 bg-white rounded-xl  space-y-3 border border-gray-300 mb-4"
      style={{ elevation: 2 }}
    >
      <Text className="text-xs text-gray-500 mb-[-12px]">
        ID: {data.id} ({data.status})
      </Text>
      <Text className="text-sm font-extrabold font-black mb-[-12px]">{data.time}</Text>

      <View className="flex-row justify-between items-center mb-[-12px]">
        <Text className="text-sm text-black">{data.from}</Text>

        <View className="items-center">
          <Ionicons name="car-sport-outline" size={20} color="#59c28e" />
          <Text className="text-xs text-gray-500">{data.tripType}</Text>
        </View>

        <Text className="text-sm text-black">{data.to}</Text>
      </View>

      <View className="flex-row items-center">
        <Image
          source={{ uri: data.carImage }}
          className="w-12 h-12 rounded-lg"
          resizeMode="cover"
        />
        <Text className="ml-2 text-sm text-gray-500">{data.carType}</Text>
      </View>
      <View style={{ height: 3, width: '100%' }} className="bg-gray-200 rounded"></View>
      <View className="flex-row items-center justify-between p-3 bg-gray-200 rounded-lg">
        <View className="flex-row items-center">
          <Image
            source={{ uri: 'https://www.w3schools.com/w3images/team2.jpg' }}
            className="w-12 h-12 rounded-lg"
            resizeMode="cover"
          />
          <Text className="ml-2 text-sm text-black">Rakesh Kumar</Text>
          <Icons.Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2">
            <View className="bg-yellow-500 p-2 rounded">
              <Icons.Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="mr-2">
            <View className="bg-greenish p-2 rounded">
              <Icons.Ionicons name="call-outline" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#000',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#59c28e', // Active tab color
    borderBottom: '2px solid #000',
  },
})
