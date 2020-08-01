import Helpers from '../../utils/Helper';
import { Platform } from 'react-native';
import colors from '../../theme/colors';

const styles = {
    parent: {
        borderBottomLeftRadius: Helpers.getDynamicSize(8),
        borderBottomRightRadius: Helpers.getDynamicSize(8),
        //  marginBottom:Platform.OS=="ios"?Helpers.getDynamicSize(3):0,

        overflow: Platform.OS == "ios" ? '' : 'hidden',

    },
    language: {
        marginLeft: Helpers.getDynamicSize(4)
    },
    langView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginHorizontal: Helpers.getDynamicSize(10)
    },
    trade: { height: Helpers.getDynamicSize(12), width: Helpers.getDynamicSize(12) },
    dropdown: { height: Helpers.getDynamicSize(9), width: Helpers.getDynamicSize(9), marginLeft: Helpers.getDynamicSize(5) },
    lefticon: {

        // height: Helpers.getDynamicSize(47),
        // width: Helpers.getDynamicSizeHeight(150),
        // resizeMode: 'contain',
        // alignSelf: 'flex-start'
        height: Helpers.getDynamicSize(43),
        width: Helpers.getDynamicSizeHeight(100),
        resizeMode: 'cover'

    },
    lefticon_user_type_1: {



        height: Helpers.getDynamicSize(35),
        width: null, flex: 1,
        // resizeMode: 'contain',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start'

    },
    menu: {
        height: Helpers.getDynamicSize(22),
        width: Helpers.getDynamicSize(22),

    },
    title: {
        fontSize: Helpers.getDynamicSize(16),
    }
};

export default styles