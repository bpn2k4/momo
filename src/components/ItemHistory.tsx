import { Image, Pressable, View } from 'react-native'

import iconBank from '@assets/icons/icon_bank.png'

const ItemHistory = (props: ItemHistoryProps) => {

  const { onPress } = props


  return (
    <Pressable onPress={onPress} className='w-full px-[10px] flex flex-row py-2 items-center bg-white active:bg-rgb-230'>
      <View className='flex items-center justify-center w-11 h-11 rounded-full bg-white border border-rgb-230'>
        <Image
          className='w-6 h-6'
          source={iconBank} />
      </View>
    </Pressable>
  )
}

export default ItemHistory

type ItemHistoryProps = {
  onPress?: VoidFunction
}