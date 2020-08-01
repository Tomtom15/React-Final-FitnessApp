import React, { Component } from 'react';
import { View, Text } from 'react-native';
import database from '@react-native-firebase/database';

import Helpers from '../../utils/Helper'
import constant from '../../config/constant'
import Container from '../../components/container/Container'
import Indicator from '../../components/indicator/Indicator';
import CommonStyles from '../../styles/CommonStyles'
import string from '../../config/string'
import Input from '../../components/input/Input'
import colors from '../../theme/colors'
import Button from '../../components/button/Button'
import Logger from '../../utils/Logger';
import styles from './styles'
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default class Instructors extends Component {
  constructor(props) {
    super(props);
    this.state = {
        instructorList:[],
        uid:"",
        editable:false,
        isLoading:false,
        instructor:{}
    };
  }
  async componentDidMount(){
   
    let uid = await Helpers.getFromPref(constant.PREF_USER_ID,"Not Found")
    Logger.log(uid)
    await this.setState({
        uid
    })
    this.readFromFirebase(uid)
  }
  readFromFirebase(uid){
    database()
   .ref('/userData/'+uid)
   .once('value')
   .then(async (snapshot) => {
       Logger.log('User data: ', snapshot.val());
       await this.setState({
           editable:snapshot.val() && snapshot.val().subscription && snapshot.val().subscription.price && snapshot.val().subscription.time?true:false,
           instructor:snapshot.val() && snapshot.val().instructor
       })
       this.readInstructorsFromFirebase()
   });
  }
  readInstructorsFromFirebase(){
    this.setState({
        isLoading:true
    })
   database()
   .ref('/instructors/')
   .once('value')
   .then(async(snapshot) => {
        const instructorObj =snapshot.val();
    
        const instructorList = instructorObj &&  Object.keys(instructorObj).map(key => ({
          ...instructorObj[key],
          id:key,
        }));
      this.setState({
        instructorList: instructorList,
        isLoading: false,
      });
    });
}
  render() {
    return (
        <Container
        hidden={false}
        navigation={this.props.navigation}
        title="Instructor"
        isHeader
        leftMenu
        >
        <Indicator isVisible={this.state.isLoading}/> 
            <View style={styles.margin}>
            <FlatList
            data={this.state.instructorList}
            renderItem={(item)=>this.renderItem(item)}
            keyExtractor={item => item.id}
            />
            </View>
        </Container>
    );
  }
  renderItem=(item)=>{
      return(
          <TouchableOpacity style={[styles.item,{backgroundColor:(this.state.instructor && (this.state.instructor.name==item.item.name))?colors.primary:null}]} onPress={()=>this.state.editable?this.props.navigation.navigate('instructor_detail',{"instructor":item.item}):alert("Please select a subscription plan")}>
              <Text style={[CommonStyles.normalText,styles.text]}>{item.item?item.item.name:""}</Text>
          </TouchableOpacity>
      )
  }
}
