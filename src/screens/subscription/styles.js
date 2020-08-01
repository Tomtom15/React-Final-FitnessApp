import {StyleSheet} from 'react-native'
import Helpers from '../../utils/Helper'
import dimens from '../../theme/dimens'
import colors from '../../theme/colors'

const styles = StyleSheet.create({
    button:{
        marginHorizontal:Helpers.getDynamicSize(20)
    },
    divRow:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        marginHorizontal:dimens.marginHorizontal,
        marginVertical:Helpers.getDynamicSize(20)
    },
    divItem:{
         backgroundColor:colors.light_primary,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:Helpers.getDynamicSize(5),
        padding:Helpers.getDynamicSize(20),
        borderColor:colors.primary,
        borderWidth:Helpers.getDynamicSize(2)
    },
    txtItem:{
        padding:Helpers.getDynamicSize(10),
    },
    txtHeading:{
        color:colors.black,
        marginLeft:Helpers.getDynamicSize(20),
        marginVertical:Helpers.getDynamicSize(10)
    
    }
})
export default styles