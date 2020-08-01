import React, { Component } from 'react'
import { Text, View,StyleSheet,Alert } from 'react-native'
import MapView, { Marker,PROVIDER_GOOGLE,Callout } from 'react-native-maps';
import {connect} from 'react-redux'
import database from '@react-native-firebase/database';

import constant from '../../config/constant'
import Container from '../../components/container/Container'
import CommonStyles from '../../styles/CommonStyles';
import colors from '../../theme/colors';
import Helpers from '../../utils/Helper';
import { setInstructor } from '../../redux/actions/Actions';




class MapScreen extends Component {
  constructor(props){
    super(props)
    this.marker = props.navigation.getParam("marker",{})
  }
  componentDidMount(){
   
  }
  
    render() {
      
        return (
          <Container
            hidden={false}
            navigation={this.props.navigation}
            title="Select Instructor"
            isHeader
            leftMenu
            isBackEvent
        >
            <View style={styles.container}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: parseFloat(this.marker.latitude),
                longitude: parseFloat(this.marker.longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}

            >
            {this.marker &&
          <Marker
            coordinate={{ latitude: parseFloat(this.marker.latitude), longitude: parseFloat(this.marker.longitude) }}
            title={this.marker.name}
            description={this.marker.address}
           
          >
            <Callout tooltip>
                                 
                                          <View style={styles.calloutText}>
                                              <Text style={[CommonStyles.normalText,styles.text]}>{this.marker.name}{"\n"}{this.marker.address}</Text>
                                          </View>
                                   
            </Callout>
          </Marker>
            }
            </MapView>
          </View>
          </Container>
        )
    }
    markerClick(marker){
      console.log(marker)
      Alert.alert('Alert!','Are you sure you want to select '+marker.name+'?',[
         
        { text: "Yes", onPress: () => 
        {
          this.props.setInstructor(marker)
          this.props.navigation.goBack()
        }
      },
        { text: "No"}
      ],)
    }
}
const set = dispatch => {
  return {
    setInstructor: (data) => {
          dispatch(setInstructor(data))
      },
      
  }
}
export default connect(null, set)(MapScreen) 
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    calloutText:{
      backgroundColor:colors.white,
      padding:Helpers.getDynamicSize(10)
    },
    text:{
      color:colors.black
    }
   });
  