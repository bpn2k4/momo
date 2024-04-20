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
  const [indicatorPositionLeft, setIndicatorPositionLeft] = useState(12)
  const [elementsWidth, _] = useState(state.routes.map(_ => 100))

  const ref = useRef<TouchableOpacity>(null)
  const currentTabIndex = state.index
  const scrollViewRef = useRef<ScrollView>(null)

  const [style, spring] = useSpring(() => ({
    left: indicatorPositionLeft
  }))

  /**Calculate indicator width and position left when change tab
   * Add {isFocused} because when app start, this component not be mounted
   * so that indicator's width can not be recalculated
   */
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        const scrollX = elementsWidth.slice(0, currentTabIndex).reduce((prev, item) => prev + item, 0) - windowWidth / 2 + width / 2
        scrollViewRef.current?.scrollTo({
          x: scrollX,
          animated: true
        })
        const newIndicatorWidth = width - 20
        if (!isNaN(newIndicatorWidth)) {
          setIndicatorWidth(width - 20)
          setIndicatorPositionLeft(pageX + 12)
        }
      })
    }
  }, [currentTabIndex])

  /**Listen scroll event of scroll view change indicator position when scroll */
  const onScrollScrollView = () => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        setIndicatorPositionLeft(pageX + 12)
      })
    }
  }

  /**@ Perform indicator animation every time component re-render
   * If this screen is not focused, function ref.current.measure can not run
   * so that indicatorPositionLeft will be NaN
   * So check indicatorPositionLeft is not NaN to perform indicator animation
   */
  if (!isNaN(indicatorPositionLeft)) {
    spring.start({
      left: indicatorPositionLeft,
      config: {
        duration: 200
      }
    })
  }

  return (
    <View className='w-full h-11 bg-white relative border-b border-rgb-235'>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={onScrollScrollView}>
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
              className='justify-center px-3 relative'
              onLayout={e => {
                console.log(index, e.nativeEvent.layout)
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
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <animated.View
        className='absolute h-[2px] bottom-[1px]'
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

export default History


type TabProps = {
  type: typeof HistoryTypes[keyof typeof HistoryTypes]
}
