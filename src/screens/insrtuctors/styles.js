import {StyleSheet} from 'react-native'
import Helpers from '../../utils/Helper'
import colors from '../../theme/colors'
const styles = StyleSheet.create({
container:{
    flex:1
},
margin:{
    margin:Helpers.getDynamicSize(20),
},
item:{
    padding:Helpers.getDynamicSize(10),
    borderWidth:1,
    borderColor:colors.gray
},
text:{
    color:'black'
},
avatar_view:{
    borderRadius:Helpers.getDynamicSize(50),
    borderColor:colors.black,
    borderWidth:1,
    alignSelf:'center',
    overflow:"hidden",
    marginBottom:Helpers.getDynamicSize(10)
},
avatar:{
    height:Helpers.getDynamicSize(100),
    width:Helpers.getDynamicSize(100),
    resizeMode:'contain',  
},
div_row:{flexDirection:'row'}
})
export default styles