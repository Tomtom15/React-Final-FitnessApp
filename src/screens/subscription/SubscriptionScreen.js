import React, { Component } from 'react'
import { Text, View,TouchableOpacity,ScrollView,Alert } from 'react-native'
import database from '@react-native-firebase/database';

import Button from '../../components/button/Button'
import string from '../../config/string'
import styles from './styles'
import CommonStyles from '../../styles/CommonStyles'
import constant from '../../config/constant'
import Container from '../../components/container/Container'
import Indicator from '../../components/indicator/Indicator';
import colors from '../../theme/colors'
import Helpers from '../../utils/Helper'
import Logger from '../../utils/Logger'


export default class SubscriptionScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading:false,
            selected:0,
            uid:''
        }
    }
    async componentDidMount(){
        let uid = await Helpers.getFromPref(constant.PREF_USER_ID,"Not Found")
        Logger.log(uid)
        await this.setState({
            uid
        })
    }
    render() {
        return (
        <Container
            hidden={false}
            navigation={this.props.navigation}
            title="Subscription Plan"
            isHeader
            leftMenu
            isBackEvent
        >
        <ScrollView>
            <Indicator isVisible={this.state.isLoading}/> 
            <Text style={[CommonStyles.normalText,styles.txtHeading]}>{string.select_subscription_plan}</Text>
            <View style={styles.divRow}>
                <TouchableOpacity style={[styles.divItem,{backgroundColor:this.state.selected==1?colors.primary:colors.light_primary}]} onPress={()=>this.onSelect(1,"$ 10.00","1 Month")}>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       $ 10.00  
                    </Text>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       1 Month 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.divItem,{backgroundColor:this.state.selected==2?colors.primary:colors.light_primary}]} onPress={()=>this.onSelect(2,"$ 20.00","3 Month")}>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       $ 20.00  
                    </Text>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       3 Month 
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.divRow}>
                <TouchableOpacity style={[styles.divItem,{backgroundColor:this.state.selected==3?colors.primary:colors.light_primary}]} onPress={()=>this.onSelect(3,"$ 50.00","6 Month")}>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       $ 50.00  
                    </Text>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       6 Month 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.divItem,{backgroundColor:this.state.selected==4?colors.primary:colors.light_primary}]}  onPress={()=>this.onSelect(4,"$ 100.00","1 Year")}>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       $ 100.00  
                    </Text>
                    <Text style={[CommonStyles.boldText,styles.txtItem]}>
                       1 Year 
                    </Text>
                </TouchableOpacity>

            </View>
            <Button
                setRef={(ref) => { this.button = ref }}
                title={string.buy_now}
                autoCapitalize={false}
                style={[CommonStyles.normalText,styles.button]}
                 onButtonClick={() =>
                            this.buyNow()
                }
                /> 
        </ScrollView>
        </Container>
        )
    }
    onSelect(index,price,time){
        this.setState({
            selected:index,
            price:price,
            time:time
        })
    }
    buyNow(){
      
        if(this.state.selected<1 || this.state.price=="" || this.state.time==""){
            alert("Please select a subscription plan")
        }else if(this.state.uid==""){
            alert("UID is empty")
        }
        else{
            Alert.alert('Alert!','Are you sure you want to proceed with the payment of '+this.state.price+' ?',[
         
                { text: "Yes", onPress: () => 
                {
                    this.setState({
                        isLoading:true
                    })
                    let subscription ={
                        price:this.state.price,
                        time:this.state.time
                    }
        
                    database()
                    .ref('/userData/'+this.state.uid)
                    .update({
                        subscription:subscription
                    })
                    .then(async () => {
                      
                        await this.setState({
                          isLoading:false
                        })
                        alert("Your payment is successful")
                        this.props.navigation.navigate('home')
                    })
                    .catch(error=>{
                        alert(error)
                    });
                }
              },
                { text: "No"}
              ],)
           
        }
    }
}
