import { useTranslation } from 'react-i18next'
import { useLayoutEffect, useRef, useState } from 'react'
import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSpring, animated } from '@react-spring/native'

import ItemHistory from '@components/ItemHistory'
import { Color } from '@const'

const Tab = createMaterialTopTabNavigator()

const HistoryTypes = {
  ALL: 'ALL',
  PAY: 'PAY'
} as const

const TabItem = (props: TabProps) => {
  const { type } = props

  return (
    <View className='flex-1 flex-col'>
      <ScrollView>
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
        <ItemHistory />
      </ScrollView>
    </View>
  )
}

const All = () => <TabItem type={HistoryTypes.ALL} />
const Phone = () => <TabItem type={HistoryTypes.PAY} />
const X1 = () => <TabItem type={HistoryTypes.PAY} />
const X2 = () => <TabItem type={HistoryTypes.PAY} />
const X3 = () => <TabItem type={HistoryTypes.PAY} />

const tabs = [
  { name: 'Tất cả', Component: All },
  { name: 'Chuyển tiền', Component: Phone },
  { name: 'Nạp tiền vào ví', Component: X1 },
  { name: 'Điện thoại - 4G/5G', Component: X2 },
  { name: 'Mua sắm', Component: X3 },
  { name: 'Du lịch - Đi lại', Component: X3 },
  { name: 'Tài chính - bảo hiểm', Component: X3 },
  { name: 'Khác', Component: X3 },
]

const History = () => {

  const { t } = useTranslation()

  return (
    <View className='flex-1'>
      <View className='h-[84px]'>

      </View>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}>
        {tabs.map(({ name, Component }, index) => (
          <Tab.Screen
            key={name}
            name={name}
            options={{
              title: name
            }}
            component={Component} />
        ))}
      </Tab.Navigator>
    </View>
  )
}

const TabBar = (props: MaterialTopTabBarProps) => {
  const { state, descriptors, navigation } = props
  const windowWidth = Dimensions.get('window').width

  const [indicatorWidth, setIndicatorWidth] = useState(100)
  const [elementsWidth, _] = useState(state.routes.map(_ => 100))

  const ref = useRef<TouchableOpacity>(null)
  const currentTabIndex = state.index
  const scrollViewRef = useRef<ScrollView>(null)

  const [style, spring] = useSpring(() => ({
    width: indicatorWidth
  }))

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        const newIndicatorWidth = width - 24
        if (!isNaN(newIndicatorWidth)) {
          setIndicatorWidth(newIndicatorWidth)
        }
        const scrollX = Math.max(0, elementsWidth.slice(0, currentTabIndex).reduce((prev, item) => prev + item, 0) - windowWidth / 2 + width / 2)
        scrollViewRef.current?.scrollTo({
          x: scrollX,
          animated: true
        })
      })
    }
  }, [currentTabIndex])

  if (!isNaN(indicatorWidth)) {
    spring.start({
      width: indicatorWidth,
      config: {
        duration: 200
      }
    })
  }

  return (
    <View className='w-full h-11 bg-white relative flex flex-col'>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
            else {
              navigation.navigate(state.routes[0].name, route.params)
            }
          }
          return (
            <TouchableOpacity
              key={index}
              ref={isFocused ? ref : null}
              activeOpacity={0.5}
              className='justify-center px-3'
              onLayout={e => {
                elementsWidth[index] = e.nativeEvent.layout.width
                setIndicatorWidth(elementsWidth[currentTabIndex] - 20)
              }}
              onPress={onPress}>
              <Text className='font-semibold text-transparent'>
                {options.title}
              </Text>
              <View className='absolute top-0 left-0 right-0 bottom-0 items-center justify-center'>
                <Text
                  className={`${isFocused ? 'font-semibold text-primary' : 'text-rgb-50'}`}>
                  {options.title}
                </Text>
              </View>
              {isFocused && (
                <animated.View
                  className='absolute h-[2px] bottom-0 z-[1]'
                  style={{
                    ...style,
                    left: 12,
                    height: 2,
                    backgroundColor: Color.primary,
                  }}>

                </animated.View>
              )}
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View className='w-full h-[1px] bg-rgb-235'></View>
    </View>
  )
}

export default History


type TabProps = {
  type: typeof HistoryTypes[keyof typeof HistoryTypes]
}
