import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './Navigator'
import { Provider } from 'react-redux'
import { i18n, store } from '@libs'
import { I18nextProvider } from 'react-i18next'

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  )
}

export default App
