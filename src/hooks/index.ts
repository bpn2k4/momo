import { useDispatch as useDispatch_, useSelector as useSelector_ } from 'react-redux'

import { AppDispatch, AppState } from '../libs/redux-store'
import useDebounce from './useDebounce'

export const useSelector = useSelector_.withTypes<AppState>()
export const useDispatch = useDispatch_.withTypes<AppDispatch>()

export { useDebounce }
