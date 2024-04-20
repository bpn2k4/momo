import { Image, Pressable, Text, View } from 'react-native'

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
      <View className='flex-1 flex flex-col ml-3'>
        <Text className='font-semibold text-rgb-50' numberOfLines={2}>
          Chuyển tiền/Thanh toán đến ZALOPAY_FKC(BVBank)
        </Text>
        <Text className='text-rgb-105 text-xs mt-1'>19:22 - 16/04/2024</Text>
        <View className='flex flex-row justify-between mt-1'>
          <Text className='text-rgb-105 text-xs'>
            Số dư ví: ******
          </Text>
          <Text className='text-rgb-50 font-semibold'>
            -12.000đ
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ItemHistory

type ItemHistoryProps = {
  onPress?: VoidFunction,
  title?: string,
  datetime?: string,
  monney?: number
}