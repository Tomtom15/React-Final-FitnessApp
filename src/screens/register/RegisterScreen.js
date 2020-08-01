import React, { Component } from 'react'
import { Text, View,ScrollView,Image,TouchableOpacity, Keyboard, Alert } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Container from '../../components/container/Container'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import strings from '../../config/string'
import CommonStyles from '../../styles/CommonStyles';
import Input from '../../components/input/Input';
import constant from '../../config/constant';
import Button from '../../components/button/Button'
import Helpers from '../../utils/Helper';
import Indicator from '../../components/indicator/Indicator';
import Logger from '../../utils/Helper'
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';


export class RegisterScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            country_code:"+91",
            phone_number:"",
            password:"",
            email:"",
            hide:true,
            verify:false,
            confirmation: null, 
            verificationCode: '',
            err_password:"",
            err_email:"",
            isLoading :false,
            status:'active',
            username:"",
            err_username:""
        }
    }
    toogleHide(){
        let hide = this.state.hide
        this.setState({hide:!hide})
    }
    validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(this.state.country_code + this.state.phone_number)
      }
      // Handle the button press
  async signInWithPhoneNumber() {
    await this.setState({isLoading:true})
    let phoneNumber = this.state.country_code + this.state.phone_number
    auth().signInWithPhoneNumber(phoneNumber).then((confirmation)=>{
       this.setState({
          confirmation,
          isLoading:false
        })
    }).catch((error)=>{
      setTimeout(() => {
        Alert.alert('Error',error.message?error.message:error,[
         
          { text: "OK", onPress: () => this.setState({isLoading:false})}
        ],)
      }, 1000);
    })
  }

  async confirmCode() {
    await this.setState({isLoading:true})
    const { confirmation, verificationCode } = this.state
    // try {
    //   let result = await confirmation.confirm(verificationCode);
    //   this.setState({
    //     verify:true
    //   })
     
    // } catch (error) {
    //   alert('Invalid code')
    //   console.log('Invalid code.');
    // }
    confirmation.confirm(verificationCode).then((result)=>{
      this.setState({
        verify:true,
        isLoading:false
      })
    }).catch((error)=>{
      setTimeout(() => {
        Alert.alert('Error',error.message?error.message:error,[
         
          { text: "OK", onPress: () => this.setState({isLoading:false})}
        ],)
      }, 1000);
    })
  }
  validate(){
    let validateEmail = false
    let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let verifyMobile = false
    let validatePassword= false
    let verifyUsername = false
    if(this.state.username){
      verifyUsername=true
    }else{
      verifyUsername=false
      this.setState({
        err_username:"Enter valid username"
      })
    }
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
    if(this.state.verify){
      verifyMobile=true
    }else{
      verifyMobile=false
      alert("Please verify phone number before proceeding")
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
    if(verifyUsername && validateEmail && validatePassword){
      this.setState({
        isLoading:true
      })
      this.createUserWithEmailAndPassword()
    }

  }
  createUserWithEmailAndPassword(){

    auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(async(data) => {
      console.log(data.user.uid)    
      database().ref(`users/${data.user.uid}`)
          .set({
            username:this.state.username,
            email:this.state.email,
            phone:this.state.country_code+this.state.phone_number,
            status:this.state.status
          });
      await Helpers.saveInPref(constant.PREF_USER_ID,data.user.uid)
      await this.setState({
          isLoading:false
      })
      this.props.navigation.navigate("home")
    }).catch(async (error)=> {
      // Handle error.
      await this.setState({
        isLoading:false
      })
      alert(error.message?error.message:error)
      
    });
  }
    render() {
        return (
            <Container
                hidden={false}
                navigation={this.props.navigation}
               
            >
             <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.gradient}>    
              <KeyboardAwareScrollView>
              <Indicator isVisible={this.state.isLoading}/> 
                  <Text style={[CommonStyles.boldText,styles.login]}>{strings.signup}</Text>
                  <Input
                                                    setRef={(ref) => { this.username = ref }}
                                                    returnKeyType="done"
                                                    style={styles.marginTop}
                                                    inputStyle={[CommonStyles.normalText]}
                                                    value={this.state.username}
                                                    placeholder={strings.placeholder_username}
                                                    autoCapitalize='none'
                                                    keyboardType='default'
                                                    errorText={this.state.err_username}
                                                    editable={true}
                                                   
                                                    onChangeText={(text) => this.setState({
                                                        username:text
                                                    })}
                                          
                                                    onSubmitEditing={() => Keyboard.dismiss()}
                                                />
                  <Input
                                                    setRef={(ref) => { this.email = ref }}
                                                    returnKeyType="done"
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
                                          
                                                    onSubmitEditing={() => Keyboard.dismiss()}
                                                />
                  <View style={styles.div1}>
                    <View>
                  <Input
                                                setRef={(ref) => { this.country_code = ref }}
                                                returnKeyType="next"
                                                style={styles.styleMobileCode}
                                                inputStyle={[CommonStyles.normalText, styles.alignCenter]}
                                                value={this.state.country_code}                                                
                                                autoCapitalize='none'
                                                keyboardType='phone-pad'
                                                errorText={this.state.err_country_code}
                                                editable={this.state.confirmation==null?true:false}
                                                maxLength={constant.MAX_COUNTRY_CODE}
                                                onChangeText={(text) => this.setState({
                                                    country_code:text
                                                })}
                                                onSubmitEditing={() => this.phone_number.focus()}
                        />
                        </View>
                        <View style={{flex:1}}>
                              <Input
                                                setRef={(ref) => { this.phone_number = ref }}
                                                returnKeyType="done"
                                                style={styles.stylePhone}
                                                inputStyle={[CommonStyles.normalText]}
                                                value={this.state.phone_number}
                                                placeholder={strings.placeholder_phone}
                                                autoCapitalize='none'
                                                keyboardType='phone-pad'
                                                errorText={this.state.err_phone_no}
                                                editable={this.state.confirmation==null?true:false}
                                                maxLength={constant.MAX_PHONE_NUMBER_LIMIT}
                                                onChangeText={(text) => this.setState({
                                                    phone_number:text
                                                })}
                                      
                                                onSubmitEditing={() => Helpers.hideKeyboard()}
                                            />

                                            </View>
                                             </View>
                                            
                                             {this.state.confirmation == null?
                                             <Button
                                            setRef={(ref) => { this.button = ref }}
                                            title={strings.send_otp}
                                            autoCapitalize={false}
                                            style={[CommonStyles.normalText,styles.verify_otp]}
                                            // enable={this.state.country_code.length < 2 || this.state.phone_number.length < 8}   
                                            onButtonClick={() =>
                                                (this.validatePhoneNumber()?this.signInWithPhoneNumber():alert("Enter Valid Phone Number"))
                                            }
                                      />:
                                      <View style={styles.div2}>
                                      
                                        <Text style={[styles.text,styles.marginLeft]}>
                                            {strings.otp_sent}
                                        </Text>
                                    
                                      </View>
                                      }
                                      {
                                               this.state.confirmation!=null &&
                                               <View>
                                                  <Input
                                                    setRef={(ref) => { this.verificationCode = ref }}
                                                    returnKeyType="done"
                                                    style={styles.styleOTP}
                                                    inputStyle={[CommonStyles.normalText]}
                                                    value={this.state.verificationCode}
                                                    placeholder={strings.placeholder_otp}
                                                    autoCapitalize='none'
                                                    keyboardType='numeric'
                                                    errorText={this.state.err_otp}
                                                    editable={true}
                                                    maxLength={constant.MAX_OTP_LIMIT}
                                                    onChangeText={(text) => this.setState({
                                                        verificationCode:text
                                                    })}
                                          
                                                    onSubmitEditing={() => this.confirmCode()}
                                                />
                                            {this.state.verify==false &&
                                                <Button
                                               
                                                setRef={(ref) => { this.button = ref }}
                                                title={strings.verify_otp}
                                                autoCapitalize={false}
                                                style={[CommonStyles.normalText,styles.verify_otp]}
                                                enable={this.state.verificationCode.length < 6 }   
                                                onButtonClick={() =>
                                                    (this.confirmCode())
                                                }
                                                />
                                            }

                                            </View>
                                               
                                             }
                                      {
                                          
                                      this.state.verify &&
                                      <View>
                                      <View style={styles.div2}>
                                      <Image
                                            source={require('../../assets/tick.png')}
                                            style={styles.image}
                                        />
                                        <Text style={[styles.text,styles.marginLeft]}>
                                            {strings.otp_verified}
                                        </Text>
                                    
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
                                                maxLength={constant.MAX_PHONE_NUMBER_LIMIT}
                                                onChangeText={(text) => this.setState({password:text})}
                                                rightImage={this.state.hide?require('../../assets/eye.png'):require('../../assets/visibility-off.png')}
                                                rightImagePress={()=>this.toogleHide()}
                                                onSubmitEditing={() => Helpers.hideKeyboard()}
                                            />
                                            <Button
                                            setRef={(ref) => { this.button = ref }}
                                            title={strings.signup}
                                            autoCapitalize={false}
                                            style={[CommonStyles.normalText,styles.button]}
                                           //  enable={this.state.country_code.length < 2 || this.state.phone_number.length < 8 || this.state.password==""}
                                            
                                            onButtonClick={() =>
                                            this.validate()
                                    }
                                      />
               </View>
               }
               <View style={styles.div2}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                <Text 
                                style={[CommonStyles.boldText, styles.text]}>{strings.back_to_login}</Text>
                    </TouchableOpacity>
                  

                </View>
               
              </KeyboardAwareScrollView>

                  
             </LinearGradient>
            </Container>
        )
    }
}

export default RegisterScreen
