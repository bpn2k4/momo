import { ReactNode } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '@screens/Home'

const screens = [
  { name: 'Home', component: Home }
]

const Stack = createNativeStackNavigator()

const AppNavigator = ({ children }: AppNavigatorProps) => {

  return (
    <Stack.Navigator>
      {screens.map(({ name, component }, index) => (
        <Stack.Screen
          key={index}
          name={name}
          component={component}
          options={{ headerShown: false }} />
      ))}
      {children}
    </Stack.Navigator>
  )
}

export default AppNavigator

type AppNavigatorProps = {
  children?: ReactNode
}