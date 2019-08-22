import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import Login from './modules/Login';
import Repositories from './modules/Repositories';
import Details from './modules/Details';

const stackNavigator = createStackNavigator({
  Repositories: { screen: Repositories },
  Details: { screen: Details }
}, {
    initialRouteName: 'Repositories',
    mode: 'modal'
  }
);

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator({
    Login: { screen: Login },
    Logged: { screen: stackNavigator }
  },
    {
      initialRouteName: userLogged ? 'Logged': 'Login'
    }
  )
);

export default Routes;