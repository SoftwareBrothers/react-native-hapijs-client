import { createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import HomeScreen from './home-screen'
import LoginScreen from './login-screen'
import RegisterScreen from './register-screen'
import AuthLoadingScreen from './auth-loading-screen'



const AppStack = createStackNavigator({
  Home: HomeScreen,
})
const AuthStack = createStackNavigator({ 
  authIndex: {
    screen: createMaterialTopTabNavigator({
      Login: LoginScreen,
      Register: RegisterScreen
    }),
    navigationOptions: {
      headerTitle: 'Not logged in'
    }
  },
})

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)