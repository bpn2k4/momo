import { Image, ImageStyle, StyleProp } from 'react-native'

import iconGift from '@assets/icons/icon_gift.png'
import iconGiftActive from '@assets/icons/icon_gift_active.png'
import iconHistory from '@assets/icons/icon_history.png'
import iconHistoryActive from '@assets/icons/icon_history_active.png'
import iconMomo from '@assets/icons/icon_momo.png'
import iconMomoActive from '@assets/icons/icon_momo_active.png'
import iconUser from '@assets/icons/icon_user.png'
import iconUserActive from '@assets/icons/icon_user_active.png'

type IconProps = {
  style?: StyleProp<ImageStyle>
}


export const IconGift = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className='w-6 h-6'
    source={iconGift} />
)
export const IconGiftActive = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className='w-6 h-6'
    source={iconGiftActive} />
)
export const IconHistory = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className={'w-6 h-6'}
    source={iconHistory} />
)
export const IconHistoryActive = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className={'w-6 h-6'}
    source={iconHistoryActive} />
)
export const IconMomo = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className='w-6 h-6'
    source={iconMomo} />
)
export const IconMomoActive = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className='w-6 h-6'
    source={iconMomoActive} />
)
export const IconUser = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className='w-6 h-6'
    source={iconUser} />
)
export const IconUserActive = (props: IconProps) => (
  <Image
    style={[{ objectFit: 'contain' }, props?.style]}
    className='w-6 h-6'
    source={iconUserActive} />
)

