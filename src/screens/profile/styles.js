import {StyleSheet} from 'react-native'
import Helpers from '../../utils/Helper'
import colors from '../../theme/colors'
import dimens from '../../theme/dimens'
const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
        marginVertical:Helpers.getDynamicSize(10),
        marginHorizontal:Helpers.getDynamicSize(10)
    },
    input:{
        width:"50%"
    },
    label:{
        width:'50%',
        color:colors.black
    },
    dropdown:{
       // marginHorizontal:Helpers.getDynamicSize(20)
    },
    button:{
        marginHorizontal:Helpers.getDynamicSize(20)
    },
    errorText:{
        color:colors.red,
        marginTop:Helpers.getDynamicSize(5)
    },
    div1:{
        marginHorizontal:Helpers.getDynamicSize(10)
    },
    inputQuantity:{
        width:Helpers.getDynamicSize(80)
    },
    inputName:{
        width:Helpers.getDynamicSize(150)
    },
    
    center:{
        alignItems:'center',textAlign:'center'
    },
    text:{
        color:'black',
    },
})
export default styles