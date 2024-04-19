import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

const Tab = createMaterialTopTabNavigator()

const HistoryTypes = {
  ALL: 'ALL',
  PAY: 'PAY'
} as const

const TabItem = (props: TabProps) => {
  const { type } = props

  return (
    <View className='flex-1'>
      <Text>{type}</Text>
    </View>
  )
}

const All = () => <TabItem type={HistoryTypes.ALL} />
const Phone = () => <TabItem type={HistoryTypes.PAY} />

const tabs = [
  { name: 'All', Component: All },
  { name: 'Phone', Component: Phone },
]

const History = () => {

  const { t } = useTranslation()

  return (
    <View className='flex-1'>
      <Tab.Navigator>
        {tabs.map(({ name, Component }, index) => (
          <Tab.Screen
            name={name}
            component={Component} />
        ))}
      </Tab.Navigator>
    </View>
  )
}

export default History


type TabProps = {
  type: typeof HistoryTypes[keyof typeof HistoryTypes]
}
