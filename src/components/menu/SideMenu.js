import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import {withNavigation} from 'react-navigation'

import Helpers from '../../utils/Helper'
import { colors } from 'react-native-elements'
import Container from '../container/Container'

import constant from '../../config/constant';

class Menu extends Component {
    async signOut(){
        await Helpers.saveInPref(constant.PREF_USER_ID,'')
        let user_id = await Helpers.getFromPref(constant.PREF_USER_ID,"")
        console.log("log out "+user_id)
        this.props.navigation.navigate('login')
    }
    render() {
        return (
            <Container
            hidden={false}
            navigation={this.props.navigation}
            title="Fitness App"
            isHeader
            >
            <View style={{marginTop:Helpers.getDynamicSize(50)}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('home')}>
                <Text style={style.item}> Home </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('profile')}>
                <Text style={style.item}> Edit Profile </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('instructor')}>
                <Text style={style.item}> Instructor </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('subscription')}>
                <Text style={style.item}> Subscription Plan </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.signOut()}>
                <Text style={style.item}> Sign out </Text>
            </TouchableOpacity>
            </View>
            </Container>
        )
    }
}
const style= StyleSheet.create({
    item:{
        paddingVertical:Helpers.getDynamicSize(10),
        marginHorizontal:Helpers.getDynamicSize(10),
        borderBottomWidth:1,
        borderBottomColor:colors.grey0
    }
})

export default withNavigation(Menu)