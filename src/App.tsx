import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './Navigator'
import { Provider } from 'react-redux'
import { i18n, store } from '@libs'
import { I18nextProvider } from 'react-i18next'
import Util from '@utils'

const App = () => {

  const a = {
    a: 1,
    x: 2,
    y: 3,
    b: 1,
    d: {
      z: 1,
      y: 2,
      o: 123,
      a: {
        a: 1,
        c: 100,
        b: 2
      }
    }
  }

  const b = Util.sortKeys(a)
  console.log(b)


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
