
import React from 'react';
import {  Dimensions, Image, ToastAndroid, Platform,Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth';
//For Facebook Login
import { LoginManager, AccessToken } from 'react-native-fbsdk';
// For Google sign in
import { GoogleSignin } from '@react-native-community/google-signin';
import Logger from './Logger';
import constant from '../config/constant';
GoogleSignin.configure({
    webClientId: constant.WEB_CLIENT_ID,
  });

const fontScale = Dimensions.get('window').fontScale;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Helpers = {

    saveInPref: function (key, value) {
        AsyncStorage.setItem(key, value);
    },
    removeFromPref: function (key) {
        AsyncStorage.removeItem(key);
    },
    getFromPref: async function (key, defaultValue) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return value
        } else
            return defaultValue;
    },

    clearPref: async function () {
        await AsyncStorage.clear();
    },
    isLandScapeModeSize(size) {
        if (fontScale > 1) {
            return ((windowWidth * size) / 375) / 1;
        } else {
            return ((windowWidth * size) / 375) / fontScale;
        }

    },
    getDynamicSize(size) {
        if (windowHeight > windowWidth) {

            if (fontScale > 1) {
                return ((windowWidth * size) / 375) / 1;
            } else {
                return ((windowWidth * size) / 375) / fontScale;
            }

        } else {
            return ((windowHeight * size) / 667) / fontScale;   // For Returning in px
        }
    },
    getNewDynamicSize(size) {
        if (windowHeight > windowWidth) {
            return ((windowWidth * size) / 375) / fontScale;
        } else {
            return ((windowHeight * size) / 667) / fontScale;   // For Returning in px
        }
    },
  
    getDynamicSizeHeight(size) {
        let height = (windowHeight * size) / 667;
        return height
    },
    renderErrorPlaceholder(imageUri) {
        return (
            <Image
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
                source={{ uri: imageUri }}

            />
        )
    },
    renderPlaceholder() {
        return (
            <Image
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
            // source={require('../assets/img_default.png')}

            />
        )
    },

    verifyResponse(response, dontShowAlert) {
        if (parseInt(response.status) == "200") {
            return true;
        }
        if (!dontShowAlert)
            //  alert(response.Message)
            return false;
    },

    isLoggedIn() {
        return false
    },
    async onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          Logger.log( 'User cancelled the login process');
          alert('User cancelled the login process')
        }
      
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        Logger.log("Facebook Access Token"+JSON.stringify(data))
        if (!data) {
        Logger.log('Something went wrong obtaining access token');
        }
      
        // Create a Firebase credential with the AccessToken
        const provider = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(provider);
        
      },
      async onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
        let google_result = await auth().signInWithCredential(googleCredential)
      //  Logger.log("Google Credentials"+JSON.stringify(google_result))
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      },
     
      firebaseAuthSignOut(){
        auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
      },
      hideKeyboard(){
        Keyboard.dismiss()
    },
    

}
export default Helpers;