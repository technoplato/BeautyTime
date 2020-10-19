import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import useCustomFonts from './src/Fonts/useCustomFonts'
import { createStackNavigator } from '@react-navigation/stack'
import { useKeepAwake } from 'expo-keep-awake'

import { Image, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import ApplicationStyles from './src/Themes/ApplicationStyles'

import ServiceSelectionScreen from './src/screens/ServiceSelectionScreen'
import OptionsSelectionScreen from './src/screens/OptionsSelectionScreen'
import ActiveServicesScreen from './src/screens/ActiveServicesScreen'
import SessionCompleteScreen from './src/screens/SessionCompleteScreen'

const Stack = createStackNavigator()

const Navigation = () => {
  const { loading } = useCustomFonts()
  useKeepAwake()

  if (loading) return null
  return (
    <NavigationContainer>
      <PaperProvider theme={ApplicationStyles.theme}>
        <Stack.Navigator
          screenOptions={{
            header: () => (
              <View
                style={{
                  height: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 30,
                  padding: 12,
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    height: 120,
                    margin: 24,
                  }}
                  source={require('../BeautyTime/assets/bb_logo.png')}
                  resizeMode="contain"
                />
              </View>
            ),
          }}
        >
          <Stack.Screen
            name="Services"
            component={ServiceSelectionScreen}
          />
          <Stack.Screen
            name="Options"
            component={OptionsSelectionScreen}
          />
          <Stack.Screen
            name="ActiveServices"
            component={ActiveServicesScreen}
          />
          <Stack.Screen
            name="SessionComplete"
            component={SessionCompleteScreen}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default Navigation
