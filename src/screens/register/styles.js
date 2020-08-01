import {StyleSheet} from 'react-native'
import dimens from '../../theme/dimens'
import Helpers from '../../utils/Helper'
const styles = StyleSheet.create({
    gradient:{
        flex: 1,
    },
    login:{
        textAlign:'center',
        fontSize:dimens.fontSize_25,
        marginTop:Helpers.getDynamicSize(50)

    },
    div1:{
        flexDirection:'row',
         flex:1,
        marginHorizontal:dimens.marginHorizontal,
        marginTop:Helpers.getDynamicSize(20)
      
    },
    styleMobileCode:{
        width:Helpers.getDynamicSize(80)
    },
    alignCenter:{
        textAlign:'center',
        alignItems:'center'
    },
    stylePhone:{
        flex:1,
        marginLeft:Helpers.getDynamicSize(10)
    },
    stylePassword:{
        marginHorizontal:dimens.marginHorizontal,
        marginTop:Helpers.getDynamicSize(20),
    },
    button:{
        marginTop:Helpers.getDynamicSize(10),
        marginHorizontal:dimens.marginHorizontal
    },
    verify_otp:{
        marginTop:Helpers.getDynamicSize(10),
        width:Helpers.getDynamicSize(100),
        alignSelf:'center'
    },
    image:{
        height:Helpers.getDynamicSize(40),
        width:Helpers.getDynamicSize(40),
        resizeMode:'contain'
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
        textDecorationLine:'underline'
    },
    marginLeft:{
        marginLeft:Helpers.getDynamicSize(20)
    },
    styleOTP:{
        width:Helpers.getDynamicSize(200),
        alignSelf:'center',
        marginTop:Helpers.getDynamicSize(10)
    },
    styleEmail:{
        marginTop:Helpers.getDynamicSize(10),
        marginHorizontal:dimens.marginHorizontal,
    },
    marginTop:{
        marginTop:Helpers.getDynamicSize(80),
        marginHorizontal:dimens.marginHorizontal
    }
})
export default styles