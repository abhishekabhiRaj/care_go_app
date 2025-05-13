import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, useRouter } from 'expo-router'
import { useEffect, useState, useRef } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import { Button, HandleResponse, Logo, TextField } from '@/components'
import { useAppDispatch } from '@/hooks'
import { useLoginMutation } from '@/services'
import { userLogin } from '@/store'
import * as yup from 'yup'

import image from "@/assets/images/login/login.png";

const mobileLoginSchema = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  otp: yup.string().when('isOtpSent', {
    is: true,
    then: schema =>
      schema.required('OTP is required').matches(/^[0-9]{4,6}$/, 'OTP must be 4-6 digits'),
    otherwise: schema => schema.notRequired(),
  }),
})

export default function LoginScreen() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [otpSent, setOtpSent] = useState(false)

  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    setFocus,
    watch,
  } = useForm({
    resolver: yupResolver(mobileLoginSchema),
    defaultValues: { mobile: '', otp: '', isOtpSent: false },
  })

  useEffect(() => {
    setFocus('mobile')
  }, [])

  const onSendOtp = ({ mobile }) => {
    if (mobile) {
      // API call to send OTP here
      console.log('Sending OTP to', mobile)
      setOtpSent(true)
    }
  }

  const onSubmitOtp = ({ mobile, otp }) => {
    // Call your login mutation here with mobile and otp
    login({ body: { mobile, otp } })
  }

  const onSuccess = () => {
    dispatch(userLogin(data.data.token))
    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Go Back',
          headerBackTitleVisible: false,
        }}
      />
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message || 'An error occurred.'}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}
      <View className="h-[100%] bg-white">
        <View className="h-56">
          <Image source={image} style={{ width: '100%', height: 250, resizeMode: 'cover' }} />
        </View>
        <View className='p-0 px-6'>
        <View className="w-full bg-white px-8 py-6 space-y-1 shadow-2xl rounded-xl" 
         style={{
          shadowColor: 'grey',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8, // Android specific
        }}>
          {/* <Logo className="mx-auto w-40 h-16" /> */}
          <Text className="mt-2 mb-3 text-lg font-bold">Login</Text>

          <TextField
            errors={formErrors.mobile}
            placeholder="Enter Mobile Number"
            name="mobile"
            keyboardType="phone-pad"
            control={control}
          />
          {otpSent && (
            <Controller
              control={control}
              name="otp"
              render={({ field: { onChange, value = '' }, fieldState: { error } }) => {
                const inputs = useRef([])

                const handleChange = (text, index) => {
                  const otpArray = value.split('')
                  otpArray[index] = text
                  const newValue = otpArray.join('')
                  onChange(newValue)

                  if (text && index < 5) {
                    inputs.current[index + 1]?.focus()
                  }
                }

                const handleKeyPress = (e, index) => {
                  if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
                    inputs.current[index - 1]?.focus()
                  }
                }

                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 24,
                    }}
                  >
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <TextInput
                          key={index}
                          ref={ref => (inputs.current[index] = ref)}
                          style={{
                            width: 40,
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            textAlign: 'center',
                            fontSize: 18,
                          }}
                          maxLength={1}
                          keyboardType="numeric"
                          value={value[index] || ''}
                          onChangeText={text => handleChange(text, index)}
                          onKeyPress={e => handleKeyPress(e, index)}
                        />
                      ))}
                    {error && (
                      <Text
                        style={{ color: 'red', fontSize: 12, position: 'absolute', bottom: -20 }}
                      >
                        {error.message}
                      </Text>
                    )}
                  </View>
                )
              }}
            />
          )}
          <Button
            isLoading={isLoading}
            onPress={otpSent ? handleSubmit(onSubmitOtp) : handleSubmit(onSendOtp)}
          >
            {otpSent ? 'Submit' : 'Send OTP'}
          </Button>

          <View className="flex flex-row pt-2">
            <Text className="mr-2 text-gray-800 text-xs">I don't have an account yet.</Text>
            <Link replace href="/register" className="text-blue-400 text-xs">
              Create an account
            </Link>
          </View>
        </View>
        </View>
      </View>
    </>
  )
}


{/* <View className="w-[100vw] bg-blue-300 px-8 py-6 space-y-1"> */}
