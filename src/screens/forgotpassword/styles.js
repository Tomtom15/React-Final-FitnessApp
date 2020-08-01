import {StyleSheet} from 'react-native'
import dimens from '../../theme/dimens'
import Helpers from '../../utils/Helper'
const styles = StyleSheet.create({
    gradient:{
        flex: 1,
    },
      forgot_password:{
        textAlign:'left',
        fontSize:dimens.fontSize_25,
        marginTop:Helpers.getDynamicSize(50)
    },
    div1:{
         flex:1,
        marginHorizontal:dimens.marginHorizontal,
        marginTop:Helpers.getDynamicSize(120),
      
    },
    styleEmail:{
        marginTop:Helpers.getDynamicSize(20)
    },
    div2:{
        flexDirection:"row",
        justifyContent:'center',
        marginHorizontal:dimens.marginHorizontal,
        marginTop:Helpers.getDynamicSize(20),
        alignItems:'center'
    },
    text:{
        fontSize:dimens.fontSize_15,
        textDecorationLine:"underline"
    },
})
export default styles