console.disableYellowBox = true;
import * as Screens from '../screens';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Helpers from '../utils/Helper';
import constant from '../config/constant';

const LoginStack = createStackNavigator({
    login: {
        screen: Screens.LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    register: {
        screen: Screens.RegisterScreen,
        navigationOptions: {
            header: null,
        }
    },
    forgotpassword: {
        screen: Screens.ForgotPasswordScreen,
        navigationOptions: {
            header: null
        }
    }
})
const AppStack = createStackNavigator({
    home: {
        screen: Screens.HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    profile: {
        screen: Screens.EditProfile,
        navigationOptions: {
            header: null,
        }
    },
    instructor:{
        screen:Screens.Instructor,
        navigationOptions:{
            header:null
        }
    },
    map:{
        screen: Screens.MapScreen,
        navigationOptions: {
            header: null,
        }
    },
    subscription:{
        screen:Screens.SubscriptionScreen,
        navigationOptions:{
            header:null
        }
    },
    instructor_detail:{
        screen:Screens.InstructorDetail,
        navigationOptions:{
            header:null
        }
    }
})
 const AppDrawer = createDrawerNavigator({
    home: AppStack,
}, {
    contentComponent: Screens.SideMenu,
    drawerWidth: '75%',
    drawerPosition: "left"
})


const AppNavigator = createSwitchNavigator({
    splash:Screens.SplashScreen,
    Login: LoginStack,
    appFlow: AppDrawer,
});



export default createAppContainer(AppNavigator);