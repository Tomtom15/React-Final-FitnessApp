import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Helpers from '../../utils/Helper'
import constant from '../../config/constant'

export default class SplashScreen extends Component {
    constructor(props){
        super(props)
    }
   async componentDidMount(){
        let uid = await Helpers.getFromPref(constant.PREF_USER_ID,'')
        if(uid && uid!=''){
            this.props.navigation.navigate('home')
        }else{
            this.props.navigation.navigate('login')
        }
    }

    render() {
        return (
            <View style={{backgroundColor:'transparent'}}>
                
            </View>
        )
    }
}
