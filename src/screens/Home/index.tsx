import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Animated, Dimensions, Pressable, Text, View } from 'react-native'

import HomePage from './HomePage'
import History from './History'
import Preference from './Preference'
import Account from './Account'

import { IconGift, IconGiftActive, IconHistory, IconHistoryActive, IconMomo, IconMomoActive, IconUser, IconUserActive } from '../../components/Icon'
import { Color } from '../../const'
import { useSpring, animated } from '@react-spring/native'

const Tab = createMaterialTopTabNavigator()



const Home = () => {

  const screens = [
    { name: 'HomePage', component: HomePage, title: 'Momo', Icon: IconMomo, IconActive: IconMomoActive },
    { name: 'Preference', component: Preference, title: 'Preference', Icon: IconGift, IconActive: IconGiftActive },
    { name: 'History', component: History, title: 'History', Icon: IconHistory, IconActive: IconHistoryActive },
    { name: 'Account', component: Account, title: 'Account', Icon: IconUser, IconActive: IconUserActive },
  ]

  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      screenOptions={{
        swipeEnabled: false,
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.rgb155,
        tabBarPressColor: Color.transparent,
        tabBarStyle: { height: 60, backgroundColor: Color.white, overflow: 'visible' },
        tabBarLabelStyle: {
          fontSize: 10,
          textTransform: 'none'
        }
      }}
      tabBar={props => <BottomTab {...props} />}
    >
      {screens.map(({ name, title, component, Icon, IconActive }, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={component}
          options={{
            title: title,
            animationEnabled: false,
            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? <IconActive /> : <Icon />}
              </View>
            )
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

const BottomTab = (props: MaterialTopTabBarProps & { onPressQr?: VoidFunction }) => {

  const { state, descriptors, navigation, position } = props
  const windowWidth = Dimensions.get('window').width
  const itemTabWidth = windowWidth / 5
  const indicatorWidth = 48
  const currentTabIndex = state.index < 2 ? state.index : state.index + 1
  const indicatorPositionLeft = currentTabIndex * itemTabWidth + itemTabWidth / 2 - indicatorWidth / 2

  const [style, spring] = useSpring(() => ({
    left: indicatorPositionLeft
  }))
  spring.start({
    left: indicatorPositionLeft,
    config: {
      duration: 200
    }
  })

  return (
    <View className='w-full h-[60px] flex-row bg-white relative'>
      {state.routes.slice(0, 2).map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }
        return (
          <Pressable
            key={index}
            className='flex-1 items-center mt-[10px]'
            onPress={onPress}>
            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: 'green' })}
            <Text
              className='text-[10px] mt-[2px]'
              style={{ color: isFocused ? Color.primary : Color.rgb155 }}>
              {options.title}
            </Text>
          </Pressable>
        )
      })}

      <View className='flex-1 relative'>
        <View className='w-full absolute -top-4 bottom-0 flex-col items-center'>
          <Pressable className='w-14 h-14 rounded-full bg-red-500 border-4 border-white'></Pressable>
        </View>
      </View>

      {state.routes.slice(2).map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index + 2
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }
        return (
          <Pressable
            key={index}
            className='flex-1 items-center mt-2'
            onPress={onPress}>
            {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: 'green' })}
            <Text
              className='text-[10px] mt-[2px]'
              style={{ color: isFocused ? Color.primary : Color.rgb155 }}>
              {options.title}
            </Text>
          </Pressable>
        )
      })}
      <animated.View
        className='absolute h-[2px] top-0'
        style={{
          ...style,
          height: 2,
          width: indicatorWidth,
          backgroundColor: Color.primary,
        }}>
      </animated.View>
    </View>
  )
}

export default Home