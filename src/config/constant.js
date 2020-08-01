import { React } from 'react';
import { Dimensions, StatusBar, Platform } from 'react-native';
import Helpers from '../utils/Helper';



//Device Size
let DEVICE_WIDTH = Dimensions.get('window').width;
let DEVICE_HEIGHT = Dimensions.get('window').height;
let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const IS_IPhone4S = 480.0;
export const IS_IPhone5S = 568.0;
export const IS_IPhone6 = 667.0;
export const IS_IPhone7P = 736.0;
export const IS_IPhoneX = 812.0;
export const IS_IPhoneXR = 896.0;


export default {
    MAX_COUNTRY_CODE:4,
    MAX_PHONE_NUMBER_LIMIT:10,
    MAX_OTP_LIMIT : 6,
    PREF_USER_ID:"USER_ID",
    WEB_CLIENT_ID:"454047416239-vkf1g4a737fsqvqbl1l6lve436uh4f07.apps.googleusercontent.com"
};
