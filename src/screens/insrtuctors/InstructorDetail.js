import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import database from '@react-native-firebase/database';
import Container from '../../components/container/Container';
import Indicator from '../../components/indicator/Indicator';
import styles from './styles';
import CommonStyles from '../../styles/CommonStyles';
import Logger from '../../utils/Logger';
import Helpers from '../../utils/Helper';
import Button from '../../components/button/Button';
import constant from '../../config/constant';

export default class InstructorDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      uid:"",
      isLoading:false
    }
    this.instructor = props.navigation.getParam('instructor',{})
  }
  async componentDidMount(){
    let uid = await Helpers.getFromPref(constant.PREF_USER_ID,"Not Found")
    Logger.log(uid)
    await this.setState({
        uid
    })
}
  saveToDatabase(){
    this.setState({
        isLoading:true
    })
   

    database()
    .ref('/userData/'+this.state.uid)
    .update({
        instructor:this.instructor
    })
    .then(async () => {
      
        await this.setState({
          isLoading:false
        })
        alert("Instructor is selected")
        this.props.navigation.navigate("home")
    })
    .catch(error=>{
        alert(error)
    });
  }

  render() {
    return (
        <Container
        hidden={false}
        navigation={this.props.navigation}
        title={"Instructor Detail"}
        isHeader
        isBackEvent
        >
        <Indicator isVisible={this.state.isLoading}/> 
            <View style={styles.margin}>
            <View style={styles.avatar_view}>
              <Image
              style={styles.avatar}
              source = {this.instructor.avatar?{"uri":this.instructor.avatar}:require('../../assets/image_placeholder.png')}

              />
              </View>
              <View style={styles.div_row}>
                 <Text style={[CommonStyles.boldText,styles.text,{flex:1}]}>Name</Text>
                <Text style={[CommonStyles.normalText,styles.text,{flex:1}]}>{this.instructor.name}</Text>
              </View>
             
              <View style={styles.div_row}>
                 <Text style={[CommonStyles.boldText,styles.text,{flex:1}]}>Address</Text>
                <Text style={[CommonStyles.normalText,styles.text,{flex:1}]}>{this.instructor.address}</Text>
              </View>
              <View style={styles.div_row}>
                 <Text style={[CommonStyles.boldText,styles.text,{flex:1}]}>Availability</Text>
                <Text style={[CommonStyles.normalText,styles.text,{flex:1}]}>{this.instructor.from_time +" to "+this.instructor.to_time}</Text>
              </View>
              <View style={styles.div_row}>
                 <Text style={[CommonStyles.boldText,styles.text,{flex:1}]}>Contact Number</Text>
                <Text style={[CommonStyles.normalText,styles.text,{flex:1}]}>{this.instructor.phone?this.instructor.phone:"Not available"}</Text>
              </View>
              <Button
                title="Show on Map"
                autoCapitalize={false}
                style={[CommonStyles.normalText,styles.text]}
                 onButtonClick={() =>
                            this.props.navigation.navigate("map",{"marker":this.instructor})
                }
              />
              <Button
                title="Select this instructor"
                autoCapitalize={false}
                style={[CommonStyles.normalText,styles.text]}
                 onButtonClick={() =>
                          this.saveToDatabase()
                }
              />
           
            </View>
      </Container>
    );
  }
}
