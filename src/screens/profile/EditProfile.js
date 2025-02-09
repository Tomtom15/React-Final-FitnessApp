import React, { Component } from 'react'
import { Text, View,TouchableHighlight,Keyboard,Alert,TextInput, Image} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import database from '@react-native-firebase/database';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { setUserProfile,setInstructor } from '../../redux/actions/Actions';

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
import mealData from './data'
import { TouchableOpacity } from 'react-native-gesture-handler';




export class EditProfile extends Component {
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
            meal:"",
            err_meal:"",
            selected_meal:"",
            meal_contents:{},
            editable:false,
            mealIndex:-1,
            goals:[],
            mealData:[],
            editMeal:0
        }
    }
    onChangeText=(text,index,type,key)=>{
        Logger.log(text)
        Logger.log(index)
        let meal_content = this.state.meal_contents
       let ingredients=  meal_content[type]
       let obj = ingredients[index]
       let new_obj = Object.assign({}, obj, { [key]: text })
      
       meal_content[type][index]=new_obj
       Logger.log(meal_content)
       this.setState({
           meal_contents:meal_content
       })

    }
    onChangeDropdownValue=(item,index,type)=>{
        let meal_content = this.state.meal_contents
        let ingredients=  meal_content[type]
        let obj = ingredients[index]
        let new_obj = Object.assign({}, obj, { "avatar":item.avatar,"quantity":item.quantity,"calories":item.calories,"name":item.value})
       
        meal_content[type][index]=new_obj
        Logger.log(meal_content)
        this.setState({
            meal_contents:meal_content
        })
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
    async componentDidMount(){
       let uid = await Helpers.getFromPref(constant.PREF_USER_ID,"Not Found")
       Logger.log(uid)
       await this.setState({
           uid
       })
       this.readFromFirebase(uid)
       this.readGoalFromFirebase()
       this.readMealDataFromFirebase()
      

    }
    readMealDataFromFirebase(){
        this.setState({
            isLoading:true
        })
       database()
       .ref('/meals/')
       .once('value')
       .then(async (snapshot) => {
            const mealObj =snapshot.val();
        
            const mealList = mealObj &&  Object.keys(mealObj).map(key => ({
              ...mealObj[key],
              id:key
            }));
          this.setState({
            mealData: mealList,
            isLoading: false,
          });
        });
    }
    readGoalFromFirebase(){
        this.setState({
            isLoading:true
        })
       database().
       ref('/goals/').
       once('value')
       .then(async (snapshot) => {
            const goalObj =snapshot.val();
            console.log(snapshot.val())
            const goalList = goalObj &&  Object.keys(goalObj).map(key => ({
              ...goalObj[key],
              id:key
            }));
          this.setState({
            goals: goalList,
            isLoading: false,
          });
        });
    }
    readFromFirebase(uid){
         database()
        .ref('/userData/'+uid)
        .once('value')
        .then(async (snapshot) => {
            Logger.log(snapshot.val());
            await this.setState({
                data:snapshot.val(),
                name:snapshot.val().name?snapshot.val().name:"",
                height:snapshot.val().height?snapshot.val().height:"",
                weight:snapshot.val().weight?snapshot.val().weight:"",
                age:snapshot.val().age?snapshot.val().age:null,
                goal:snapshot.val().goal?snapshot.val().goal:"",
                meal:snapshot.val().meal?snapshot.val().meal.label:"",
                meal_contents:snapshot.val().meal?snapshot.val().meal.ingredients:{},
                meal_type:snapshot.val().meal?snapshot.val().meal.label:"",
                instructor:snapshot.val().instructor?snapshot.val().instructor:"",
                subscription:snapshot.val().subscription?snapshot.val().subscription:{},
                editable:snapshot.val().subscription && snapshot.val().subscription.price && snapshot.val().subscription.time?true:false
            })
           
           this.props.setInstructor(this.state.instructor)
            this.props.setUserProfile(snapshot.val())
        });
    }
    validate(){
      
        let errorName = true
        let errorHeight=true
        let errorWeight=true
        let errorAge=true
        let errorGoal=true
        let errorMeal= true
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
        if(this.state.meal_contents && Object.keys(this.state.meal_contents).length!=0){
            errorMeal = false
            this.setState({
                err_meal:""
            })
        }else{
            errorMeal=true
            this.setState({
                err_meal:"Select a meal type"
            })
        }
    }
    if(errorName || errorHeight || errorWeight|| errorAge||errorGoal){
       
    }else{
        this.writeUserData()
    }

   
}
writeUserData(){
    const{height,weight,age,goal,name,uid,meal,meal_contents}=this.state
    Logger.log("meal"+meal)
    let mealData = {
        label:meal,
        ingredients:meal_contents
    }
    this.setState({
        isLoading:true
    })
    database().ref('/userData/'+uid)
    .update({
      name:name,
      height: height,
      weight:weight,
      age: age,
      goal:goal,
      meal:mealData,
      subscription:this.state.subscription
    })
    .then(() => 
    {setTimeout(() => {
        Alert.alert('Success','Data set',[
         
          { text: "OK", onPress: () => 
          {
            this.setState({isLoading:false})
            this.props.navigation.navigate('home')
          }
     
        
        }
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
            title="Edit Profile"
            isHeader
            leftMenu
            rightIcon={require('../../assets/logout.png')}
            onRightMenuClick={()=>this.signOut()}

        >
           <KeyboardAwareScrollView>
            <Indicator isVisible={this.state.isLoading}/> 
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.name}</Text>
                <Input
                     setRef={(ref) => { this.name = ref }}
                     returnKeyType="next"
                     style={styles.input}
                     inputStyle={[CommonStyles.normalText,{color:colors.black}]}
                     value={this.state.name}
                     placeholder={string.placeholder_name}
                     autoCapitalize='none'
                     keyboardType='default'
                     errorText={this.state.err_name}
                     editable={true}
                     placeholderTextColor={colors.gray}                              
                     onChangeText={(text) => this.setState({
                                                name:text
                                                })}
                     onSubmitEditing={() => this.height.focus() }                                                 
                    
                />
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.height}</Text>
                <Input
                     setRef={(ref) => { this.height = ref }}
                     returnKeyType="next"
                     style={styles.input}
                     inputStyle={[CommonStyles.normalText,{color:colors.black}]}
                     value={this.state.height}
                     placeholder={string.placeholder_height}
                     autoCapitalize='none'
                     keyboardType='numeric'
                     errorText={this.state.err_height}
                     editable={true}
                     placeholderTextColor={colors.gray}                              
                     onChangeText={(text) => this.setState({
                                                height:text
                                                })}
                     onSubmitEditing={() => this.weight.focus() }                                                 
                    
                />
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.weight}</Text>
                <Input
                     setRef={(ref) => { this.weight = ref }}
                     returnKeyType="next"
                     style={styles.input}
                     inputStyle={[CommonStyles.normalText,{color:colors.black}]}
                     value={this.state.weight}
                     placeholder={string.placeholder_weight}
                     autoCapitalize='none'
                     keyboardType='numeric'
                     errorText={this.state.err_weight}
                     editable={true}
                     placeholderTextColor={colors.gray}                              
                     onChangeText={(text) => this.setState({
                                                weight:text
                                                })}
                     onSubmitEditing={() => this.age.focus()}                                                 
                    
                />
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.age}</Text>
                <Input
                     setRef={(ref) => { this.age = ref }}
                     returnKeyType="next"
                     style={styles.input}
                     inputStyle={[CommonStyles.normalText,{color:colors.black}]}
                     value={this.state.age}
                     placeholder={string.placeholder_age}
                     autoCapitalize='none'
                     keyboardType='numeric'
                     errorText={this.state.err_age}
                     editable={true}
                     placeholderTextColor={colors.gray}                              
                     onChangeText={(text) => this.setState({
                                                age:text
                                                })}
                     onSubmitEditing={() => Keyboard.dismiss()}                                                 
                    
                />
            </View>
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.placeholder_goal}</Text>
            </View>
            <View style={styles.div1}>
            <Text style={[CommonStyles.normalText,styles.errorText]}>{this.state.err_goal}</Text>
            {this.state.goals && this.state.goals.length>0 &&
            <DropDownPicker
                items={this.state.goals}
                defaultValue={this.state.goal}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => this.setState({
                    goal: item.value
                })}
            />
            }
           
            <View style={styles.row}>
                <Text style={[CommonStyles.boldText,styles.label]}>{string.placeholder_meal_plan}</Text>
            </View>
            {this.state.goals && this.state.goals.length>0 &&
            <DropDownPicker
                items={this.state.mealData}
              //  defaultValue={this.state.meal}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item,index) =>
                this.setState({
                    meal:item.label,
                    meal_contents:item.ingredients,
                    mealIndex:index
                })}
            />
            }
            {this.state.meal_contents &&  (Object.keys(this.state.meal_contents).length!=0) && 
            <View>
            <View style={styles.row}>
                <Text style={{fontSize:Helpers.getDynamicSize(20),fontWeight:'bold',color:colors.primary}}>Breakfast</Text>
            </View>

               
                {this.renderHeader()}
                {this.state.meal_contents.breakfast && this.state.meal_contents.breakfast.map((source,index)=>{
                    return(
                        <View style={{flexDirection:'row',flex:1}}>
                        <Image
                         source={source.avatar?{"uri":source.avatar}:require('../../assets/placeholder_meal.jpg')}
                         style={{height:Helpers.getDynamicSize(30),width:Helpers.getDynamicSize(30)}}
                         resizeMode='contain'
                        />
                        <View style={styles.inputQuantity}>
                            <Input
                                style={styles.inputQuantity}
                                inputStyle={[styles.center]}
                                value={source.quantity}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"breakfast","quantity")}
                            />
                        </View>
                        <View style={styles.inputName}>
                        {this.state.editBreakfast==1?
                            <DropDownPicker
                                items={mealData}
                                defaultValue=""
                                containerStyle={{height: 40}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={(text)=>this.onChangeDropdownValue(text,index,"breakfast")}
                            />:
                         
                              <Input
                                style={styles.inputName}
                                value={source.name}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"breakfast","name")}
                            />
                        
                            }
                            </View>
                            <Input
                                style={styles.inputQuantity}
                                value={source.calories}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"breakfast","calories")}
                            />
                        </View>
                       
                    )
                })}
                <View style={styles.row}>
                <Text style={{fontSize:Helpers.getDynamicSize(20),fontWeight:'bold',color:colors.primary}}>Lunch</Text>
                
            </View>
                {this.renderHeader()}
                {this.state.meal_contents.lunch && this.state.meal_contents.lunch.map((source,index)=>{
                    return(
                        <View style={{flexDirection:'row',flex:1}}>
                        <Image
                         source={source.avatar?{"uri":source.avatar}:require('../../assets/placeholder_meal.jpg')}
                         style={{height:Helpers.getDynamicSize(30),width:Helpers.getDynamicSize(30)}}
                         resizeMode='contain'
                        />
                        <View style={styles.inputQuantity}>
                            <Input
                                style={styles.inputQuantity}
                                inputStyle={[styles.center]}
                                value={source.quantity}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"lunch","quantity")}
                            />
                        </View>
                        <View style={styles.inputName}>
                            {/* <Input
                                style={styles.inputName}
                                value={source.name}
                                editable={this.state.editable}
                                onChangeText={(text)=>this.onChangeText(text,index,"lunch","name")}
                            /> */}
                            {this.state.editLunch?
                            <DropDownPicker
                                items={mealData}
                                defaultValue=""
                                containerStyle={{height: 40}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={(text)=>this.onChangeDropdownValue(text,index,"lunch")}
                            />:
                            <Input
                                style={styles.inputName}
                                value={source.name}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"lunch","name")}
                            />
                            }
                            </View>
                            <Input
                                style={styles.inputQuantity}
                                value={source.calories}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"lunch","calories")}
                            />
                        </View>
                       
                    )
                })}
                <View style={styles.row}>
                <Text style={{fontSize:Helpers.getDynamicSize(20),fontWeight:'bold',color:colors.primary}}>Dinner</Text>
                
            </View>
                {this.renderHeader()}
                {this.state.meal_contents.dinner && this.state.meal_contents.dinner.map((source,index)=>{
                    return(
                        <View style={{flexDirection:'row',flex:1}}>
                        <Image
                         source={source.avatar?{"uri":source.avatar}:require('../../assets/placeholder_meal.jpg')}
                         style={{height:Helpers.getDynamicSize(30),width:Helpers.getDynamicSize(30)}}
                         resizeMode='contain'
                        />
                        <View style={styles.inputQuantity}>
                            <Input
                                style={styles.inputQuantity}
                                inputStyle={[styles.center]}
                                value={source.quantity}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"dinner","quantity")}
                            />
                        </View>
                        <View style={styles.inputName}>
                        {this.state.editDinner?
                            <DropDownPicker
                                items={mealData}
                                defaultValue=""
                                containerStyle={{height: 40}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={(text)=>this.onChangeDropdownValue(text,index,"dinner")}
                            />:
                              <Input
                                style={styles.inputName}
                                value={source.name}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"dinner","name")}
                            />
                            }
                          
                            </View>
                            <Input
                                style={styles.inputQuantity}
                                value={source.calories}
                                editable={false}
                                onChangeText={(text)=>this.onChangeText(text,index,"dinner","calories")}
                            />
                        </View>
                       
                    )
                })}
            </View>

            }
            
            

            <Button
                setRef={(ref) => { this.button = ref }}
                title={string.save}
                autoCapitalize={false}
                style={[CommonStyles.normalText,styles.button]}
                 onButtonClick={() =>
                            this.validate()
                }
                />       
            </View>
            </KeyboardAwareScrollView>      
        </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        userData: state.component.userData,
        instructor:state.component.instructor
    }
}
const set = dispatch => {
    return {
        setUserProfile: (data) => {
            dispatch(setUserProfile(data))
        },
        setInstructor: (data) => {
            dispatch(setInstructor(data))
        },
        
    }
}
export default connect(mapStateToProps, set)(EditProfile) 

