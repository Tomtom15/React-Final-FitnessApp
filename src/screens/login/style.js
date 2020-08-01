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
        marginTop:Helpers.getDynamicSize(120),
      
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
    image:{
        height:Helpers.getDynamicSize(40),
        width:Helpers.getDynamicSize(40),
        resizeMode:'contain'
    },
    div2:{
        flexDirection:"row",     
        justifyContent:'space-between',
        marginHorizontal:dimens.marginHorizontal,
        marginTop:Helpers.getDynamicSize(20)
    },
    text:{
        fontSize:dimens.fontSize_15,
        textDecorationLine: 'underline'
    },
    marginLeft:{
        marginLeft:Helpers.getDynamicSize(20)
    }
})
export default styles