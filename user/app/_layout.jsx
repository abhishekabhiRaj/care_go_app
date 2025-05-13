import { Slot, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { persistStore } from 'redux-persist'

import { store } from '@/store'

// Persistor setup
const persistor = persistStore(store)

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AuthGate />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

// Handles authentication-based redirects
function AuthGate() {
  const segments = useSegments()
  const router = useRouter()

  const user = false // Replace with actual auth state from Redux
  const inAuthGroup = segments[0] === '(auth)'

  useEffect(() => {
    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login')
    } else if (user && inAuthGroup) {
      router.replace('/(main)/(tabs)')
    }
  }, [user, segments])

  return <Slot />
}
