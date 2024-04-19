import store, { AppState } from './redux-store'
import i18n from './i18n'

export const authSelector = (state: AppState) => state.auth
export { store, i18n }