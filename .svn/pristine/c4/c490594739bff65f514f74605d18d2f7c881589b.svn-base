import React, { Component } from 'react'
import { Text, View, Keyboard,TouchableOpacity } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

import Container from '../../components/container/Container'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import strings from '../../config/string'
import CommonStyles from '../../styles/CommonStyles';
import Button from '../../components/button/Button'
import Helpers from '../../utils/Helper';
import Logger from '../../utils/Logger'
import Input from '../../components/input/Input';
import Indicator from '../../components/indicator/Indicator'
export class ForgotPasswordScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            err_email:"",
            isLoading:false
        }
    }
    validateEmail(){
        let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(this.state.email && regEx.test(this.state.email)){
            this.handlePasswordReset()
        }else{
        this.setState({
            err_email:"Enter valid email"
        })
        }
    }
    async handlePasswordReset(){
        this.setState({
            isLoading:true
        })
        auth().sendPasswordResetEmail(this.state.email).then(async(data)=>{
           
            await this.setState({
                isLoading:false
            })
            alert("Reset password link has been sent to the email.")
            this.props.navigation.goBack()
           
        }).catch(async(error) =>{
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            Logger.log(error)
            await this.setState({
                isLoading:false
            })
            alert(error.message)
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
                  <View style={styles.div1}>
                    <Text style={[CommonStyles.boldText,styles.forgot_password]}>{strings.forgot_password}</Text> 
                    <Input
                                                    setRef={(ref) => { this.email = ref }}
                                                    returnKeyType="done"
                                                    style={styles.styleEmail}
                                                    inputStyle={[CommonStyles.normalText]}
                                                    value={this.state.email}
                                                    placeholder={strings.placeholder_enter_email}
                                                    autoCapitalize='none'
                                                    keyboardType='email-address'
                                                    errorText={this.state.err_email}
                                                    editable={true}
                                                   
                                                    onChangeText={(text) => this.setState({
                                                        email:text
                                                    })}
                                          
                                                    onSubmitEditing={() => Keyboard.dismiss()}
                                                />

                                        <Button
                                            setRef={(ref) => { this.button = ref }}
                                            title={strings.send_email}
                                            autoCapitalize={false}
                                            style={[CommonStyles.normalText,styles.button]}     
                                            onButtonClick={() =>
                                                this.validateEmail()
                                            }
                                      />
                                      <View style={styles.div2}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                                    <Text 
                                                    style={[CommonStyles.boldText, styles.text]}>{strings.back_to_login}</Text>
                                        </TouchableOpacity>  
                                      </View>
               
                  </View>
                  </KeyboardAwareScrollView>
                  </LinearGradient>
        </Container>
        )
    }
}

export default ForgotPasswordScreen
