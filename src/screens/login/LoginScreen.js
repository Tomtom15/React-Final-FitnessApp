import React, { Component } from 'react'
import { Text, View,ScrollView,Image,TouchableOpacity,Alert} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Container from '../../components/container/Container'
import LinearGradient from 'react-native-linear-gradient';
import styles from './style'
import strings from '../../config/string'
import CommonStyles from '../../styles/CommonStyles';
import Input from '../../components/input/Input';
import constant from '../../config/constant';
import Button from '../../components/button/Button'
import colors from '../../theme/colors';
import Helper from '../../utils/Helper';
import Helpers from '../../utils/Helper';
import Logger from '../../utils/Logger';
import Indicator from '../../components/indicator/Indicator';




export class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            err_email:"",
            password:"",
            err_password:"",
            hide:true,
            isLoading:false
        }
    }
    toogleHide(){
        let hide = this.state.hide
        this.setState({hide:!hide})
    }
    validate(){
    let validateEmail = false
    let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let validatePassword= false
    if(this.state.email && regEx.test(this.state.email)){
      validateEmail= true
      this.setState({
        err_email:""
      })
    }else{
      validateEmail = false
      this.setState({
        err_email:"Enter valid email"
      })
    }
    if(this.state.password && this.state.password!=""){
      validatePassword=true
      this.setState({
        err_password:""
      })
    }else{
      validatePassword=false
      this.setState({
        err_password:"Enter Password to continue"
      })
    }
    if(validateEmail && validatePassword){
      this.setState({
        isLoading:true
      })
      this.signInWithFirebase()
    }
    }
   async signInWithFirebase(){
    auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async(data)=>{
        Logger.log(data.user.uid)    
        database().ref("users").child("/"+data.user.uid).once('value').then((snapshot)=>{
          if(snapshot.val().status=="Inactive"){
            setTimeout(() => {
              Alert.alert('Error',"User is Inactivated by Admin",[
               
                { text: "OK", onPress: () => this.setState({isLoading:false})}
              ],)
            }, 1000);
          }
          else{
            Helper.saveInPref(constant.PREF_USER_ID,data.user.uid)
            this.setState({
                isLoading:false
            })
            this.props.navigation.navigate("home")
          }
      })
       
    }).catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        Logger.log(error)
        setTimeout(() => {
          Alert.alert('Error',error.message?error.message:error,[
           
            { text: "OK", onPress: () => this.setState({isLoading:false})}
          ],)
        }, 1000);
      });
    }
    render() {
        return (
            <Container
                hidden={false}
                navigation={this.props.navigation}
               
            >
            
             <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.gradient}>  
             <Indicator isVisible={this.state.isLoading}/> 
              <KeyboardAwareScrollView>
                  <Text style={[CommonStyles.boldText,styles.login]}>{strings.login}</Text>
                  <View style={styles.div1}>
                
                  <Input
                                                    setRef={(ref) => { this.email = ref }}
                                                    returnKeyType="next"
                                                    style={styles.styleEmail}
                                                    inputStyle={[CommonStyles.normalText]}
                                                    value={this.state.email}
                                                    placeholder={strings.placeholder_email}
                                                    autoCapitalize='none'
                                                    keyboardType='email-address'
                                                    errorText={this.state.err_email}
                                                    editable={true}
                                                   
                                                    onChangeText={(text) => this.setState({
                                                        email:text
                                                    })}
                                          
                                                    onSubmitEditing={() => this.password.focus()}
                                                />
                  </View>
                                     <Input
                                                setRef={(ref) => { this.password = ref }}
                                                returnKeyType="done"
                                                style={styles.stylePassword}
                                                inputStyle={[CommonStyles.normalText]}
                                                value={this.state.password}
                                                placeholder={strings.placeholder_password}
                                                autoCapitalize='none'
                                                keyboardType='default'
                                                inputType ="password"
                                                secureTextEntry={this.state.hide==true?true:false}
                                                errorText={this.state.err_password}
                                                editable={true}                                      
                                                onChangeText={(text) => this.setState({password:text})}
                                                rightImage={this.state.hide?require('../../assets/eye.png'):require('../../assets/visibility-off.png')}
                                                rightImagePress={()=>this.toogleHide()}
                                                onSubmitEditing={() => Helpers.hideKeyboard()}
                                            />
                                            <Button
                                            setRef={(ref) => { this.button = ref }}
                                            title={strings.login}
                                            autoCapitalize={false}
                                            style={[CommonStyles.normalText,styles.button]}
                                        //   enable={this.state.country_code.length < 2 || this.state.phone_number.length < 8 || this.state.password==""}
                                            
                                            onButtonClick={() =>
                                                this.validate()
                                            }
                                      />
                    <View style={styles.div2}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('register')}>
                                        <Text 
                                        style={[CommonStyles.boldText, styles.text]}>{strings.signup}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('forgotpassword')}>
                                        <Text style={[CommonStyles.boldText, styles.text]}>{strings.forgot_password}</Text>
                            </TouchableOpacity>

                </View>
                <View style={[styles.div2,{justifyContent:'center'}]}>
                <TouchableOpacity onPress={()=>this.loginWithFacebook()}>
                                <Image 
                                source={require('../../assets/facebook.png')}
                                style={styles.image}
                                />
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.loginWithGoogle()}>
                                 <Image 
                                source={require('../../assets/google.png')}
                                style={[styles.image,styles.marginLeft]}
                                />
                </TouchableOpacity>
                </View>


              </KeyboardAwareScrollView>

                  
             </LinearGradient>
            </Container>
        )
    }
    async loginWithFacebook(){
        this.setState({
            isLoading:true
        })
        try{      
        let response = await Helper.onFacebookButtonPress()
        Helper.saveInPref(constant.PREF_USER_ID,response.user.uid)
        await this.setState({
            isLoading:false
        })
        this.props.navigation.navigate("home")
      }catch(error){
        await this.setState({
          isLoading:false
      })
        alert("Error Login with facebook")
      }
    }
    async loginWithGoogle(){
      this.setState({
        isLoading:true
    })
    try{      
      let response = await Helpers.onGoogleButtonPress()
      Logger.log(response)
      Helper.saveInPref(constant.PREF_USER_ID,response.user.uid)
      await this.setState({
        isLoading:false
      })
      this.props.navigation.navigate("home")
    }catch(error){
        await this.setState({
          isLoading:false
        })
        Logger.log(error)
        alert("Error Login with Google")
  }
       
    }
}

export default LoginScreen

