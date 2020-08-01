import React, { Component } from 'react'
import { Text, View,TouchableHighlight,Keyboard,Alert,Image} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import database from '@react-native-firebase/database';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";

import Helpers from '../../utils/Helper'
import constant from '../../config/constant'
import Container from '../../components/container/Container'
import Indicator from '../../components/indicator/Indicator';
import styles from './styles'
import CommonStyles from '../../styles/CommonStyles'
import string from '../../config/string'
import Input from '../../components/input/Input'
import colors from '../../theme/colors'
import Button from '../../components/button/Button'
import Logger from '../../utils/Logger';
import { setUserProfile } from '../../redux/actions/Actions';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';



let data = [{
    value: 'Weight Loss',
    label: 'Weight Loss'
  }, {
    value: 'Muscle Power',
    label:'Muscle Power'
  }, {
    value: 'Flexibility',
    label:'Flexibility'
  },{
      value:'Arm Strength',
      label:'Arm Strength'
  },{
      value:'Leg Strength',
      label:'Leg Strength'
  }];

export class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            uid: "",
            isLoading:false,
            weight:"",
            err_weight:"",
            height:"",
            err_height:"",
            age:"",
            err_age:"",
            goal:"",
            name:"",
            err_name:"",
            data:"",
            render:false,
            meal_type:'',
            instructor:''
        }
    }
 
    
    
    async componentDidMount(){
       let uid = await Helpers.getFromPref(constant.PREF_USER_ID,"Not Found")
       Logger.log(uid)
       await this.setState({
           uid
       })
       this.readFromFirebase(uid)
       const { navigation } = this.props;
       this.focusListener = navigation.addListener("didFocus", () => {
        this.readFromFirebase(uid)
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    readFromFirebase(uid){
         database()
        .ref('/userData/'+uid)
        .once('value')
        .then(async(snapshot) => {
            Logger.log('User data: ', snapshot.val());
            
            await this.setState({
                data:snapshot.val(),
                name:snapshot.val().name,
                height:snapshot.val().height,
                weight:snapshot.val().weight,
                age:snapshot.val().age,
                goal:snapshot.val().goal,
                meal_contents:snapshot.val().meal?snapshot.val().meal.ingredients:{},
                meal_type:snapshot.val().meal?snapshot.val().meal.label:"",
                instructor:snapshot.val().instructor?snapshot.val().instructor:"",
                subscription:snapshot.val().subscription?snapshot.val().subscription:{}
            })
            this.props.setUserProfile(snapshot.val())
        });
    }
    validate(){
      
        let errorName = true
        let errorHeight=true
        let errorWeight=true
        let errorAge=true
        let errorGoal=true
        if(this.state.name){
            this.setState({
                err_name:""
            })
            errorName = false
        }else{
            this.setState({
                err_name:"Please enter name"
            })
            errorName=true
        }
        if(this.state.height){
            this.setState({
                err_height:""
            })
            errorHeight = false
        }else{
            this.setState({
                err_height:"Please enter height"
            })
            errorHeight=true
        }
        if(this.state.weight){
            this.setState({
                err_weight:""
            })
            errorWeight=false
        }else{
            this.setState({
                err_weight:"Please enter weight"
            })
            errorWeight=true
        }
        if(this.state.age){
            this.setState({
                err_age:""
            })
            errorAge=false
        }else{
            errorAge=false
            this.setState({
                err_age:"Please enter age"
            })
        }
        if(this.state.goal){
            errorGoal=false
            this.setState({
                err_goal:""
            })
        }else{
            errorGoal=true
            this.setState({
                err_goal:"Select a goal"
        })
    }
    if(errorName || errorHeight || errorWeight|| errorAge||errorGoal){
       
    }else{
        this.writeUserData()
    }

   
}
writeUserData(){
    const{height,weight,age,goal,name,uid}=this.state
    this.setState({
        isLoading:true
    })
    database().ref('/userData/'+uid)
    .set({
      name:name,
      height: height,
      weight:weight,
      age: age,
      goal:goal
    })
    .then(() => 
    {setTimeout(() => {
        Alert.alert('Success','Data set',[
         
          { text: "OK", onPress: () => this.setState({isLoading:false})}
        ],)
      }, 1000);}
    )
    .catch((error)=>{
        Logger.log("error"+error)
        setTimeout(() => {
            Alert.alert('Error',error.message?error.message:error,[
             
              { text: "OK", onPress: () => this.setState({isLoading:false})}
            ],)
          }, 1000);
    });
}
    selectedItem(data){
        alert(data)
        this.setState({
            goal:data
        })
    }
   
    render() {
        return (
        <Container
            hidden={false}
            navigation={this.props.navigation}
            title="User Profile"
            isHeader
            leftMenu
            rightIcon={require('../../assets/logout.png')}
            onRightMenuClick={()=>this.signOut()}

        >
        <ScrollView>
            <Indicator isVisible={this.state.isLoading}/> 
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.name}</Text>
                <Text
                     style={[CommonStyles.normalText,{color:colors.black},styles.input]}                                                
                    
                >{this.props.userData?this.props.userData.name:""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.height}</Text>
                <Text
                     style={[CommonStyles.normalText,{color:colors.black},styles.input]}                                                
                    
                >{this.props.userData?this.props.userData.height:""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.weight}</Text>
                <Text
                     style={[CommonStyles.normalText,{color:colors.black},styles.input]}                                                
                    
                >{this.props.userData?this.props.userData.weight:""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.age}</Text>
                <Text
                     style={[CommonStyles.normalText,{color:colors.black},styles.input]}                                                
                    
                >{this.props.userData?this.props.userData.age:""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.placeholder_goal}</Text>
                <Text
                     style={[CommonStyles.normalText,{color:colors.black},styles.input]}                                                
                    
                >{this.props.userData?this.props.userData.goal:""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.placeholder_instructor}</Text>
                <Text
                     style={[CommonStyles.normalText,{color:colors.black},styles.input]}                                                
                    
                >{this.props.userData && this.props.userData.instructor?this.props.userData.instructor.name:""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.subscription_plan}</Text>
                <Text style={[CommonStyles.normalText,{color:'black'},styles.input]}>{this.state.subscription && this.state.subscription.price && this.state.subscription.time?(this.state.subscription.price+" for "+this.state.subscription.time):""}</Text>
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.meal_plan}</Text>
                <Text style={[CommonStyles.normalText,{color:'black'}]}>{this.state.meal_type}</Text>
            </View>
            
            <View style={styles.row}>
            <Text style={styles.meal_title}>{this.state.meal_type}</Text>
           
            {this.state.meal_contents &&  (Object.keys(this.state.meal_contents).length!=0) && 
            <View>
                <Text style={styles.meal_title}>Breakfast</Text>
                {this.renderHeader()}
                {this.state.meal_contents.breakfast && this.state.meal_contents.breakfast.map((source,index)=>{
                    return(

                        <View style={{flexDirection:'row'}}>
                        <Image
                         source={source.avatar?{"uri":source.avatar}:require('../../assets/placeholder_meal.jpg')}
                         style={{height:Helpers.getDynamicSize(30),width:Helpers.getDynamicSize(30)}}
                         resizeMode='contain'
                        />   
                            <Text
                                ellipsizeMode="tail"
                                style={[styles.inputQuantity,CommonStyles.normalText,styles.text]}
                            >{source.quantity}</Text>
                      
                            <Text
                                   ellipsizeMode="tail"
                                  style={[styles.inputName,CommonStyles.normalText,styles.text]}
                            >{source.name}</Text>
                             <Text
                                 ellipsizeMode="tail"
                                 style={[styles.inputQuantity,CommonStyles.normalText,styles.text]}
                            >{source.calories}</Text>
                            
                        </View>
                       
                    )
                })}
                <Text style={styles.meal_title}>Lunch</Text>
                {this.renderHeader()}
                {this.state.meal_contents.lunch && this.state.meal_contents.lunch.map((source,index)=>{
                    return(
                        <View style={{flexDirection:'row',width:'100%'}}>
                        <Image
                         source={source.avatar?{"uri":source.avatar}:require('../../assets/placeholder_meal.jpg')}
                         style={{height:Helpers.getDynamicSize(30),width:Helpers.getDynamicSize(30)}}
                         resizeMode='contain'
                        />
                       <Text
                        ellipsizeMode="tail"
                           style={[styles.inputQuantity,CommonStyles.normalText,styles.text]}
                       >{source.quantity}</Text>
                 
                       <Text
                        ellipsizeMode="tail"
                            style={[styles.inputName,CommonStyles.normalText,styles.text]}
                       >{source.name}</Text>
                        <Text
                         ellipsizeMode="tail"
                             style={[styles.inputQuantity,CommonStyles.normalText,styles.text]}
                       >{source.calories}</Text>
                       
                   </View>
                    )
                })}
                <Text style={styles.meal_title}>Dinner</Text>
                {this.renderHeader()}
                {this.state.meal_contents.dinner && this.state.meal_contents.dinner.map((source,index)=>{
                    return(
                        <View style={{flexDirection:'row'}}>
                        <Image
                         source={source.avatar?{"uri":source.avatar}:require('../../assets/placeholder_meal.jpg')}
                         style={{height:Helpers.getDynamicSize(30),width:Helpers.getDynamicSize(30)}}
                         resizeMode='contain'
                        />
                       <Text
                           style={[styles.inputQuantity,CommonStyles.normalText,styles.text]}
                       >{source.quantity}</Text>
                 
                       <Text
                             style={[styles.inputName,CommonStyles.normalText,styles.text]}
                       >{source.name}</Text>
                        <Text
                             style={[styles.inputQuantity,CommonStyles.normalText,styles.text]}
                       >{source.calories}</Text>
                       
                   </View>
                       
                    )
                })}
            </View>

            }
            </View>
            </ScrollView>
               
        </Container>
        )
    }
    renderHeader(){
        return(
            <View style={{flexDirection:'row',marginBottom:Helpers.getDynamicSize(10),width:'100%'}}>
                        <Text
                           style={[CommonStyles.boldText,styles.text]}
                       >Picture</Text>
                       <Text
                           style={[styles.inputQuantity,CommonStyles.boldText,styles.text]}
                       >Quantity</Text>
                 
                       <Text
                             style={[styles.inputName,CommonStyles.boldText,styles.text]}
                       >Ingredient</Text>
                        <Text
                             style={[styles.inputQuantity,CommonStyles.boldText,styles.text]}
                       >Calories</Text>
                       
                   </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        userData: state.component.userData,
    }
}
const set = dispatch => {
    return {
        setUserProfile: (data) => {
            dispatch(setUserProfile(data))
        },
        
    }
}
export default connect(mapStateToProps, set)(HomeScreen) 

