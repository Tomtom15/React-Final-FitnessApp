import { Dimensions } from 'react-native';

import colors from '../theme/colors';
import dimens from '../theme/dimens';
import Helpers from '../utils/Helper';

let DEVICE_WIDTH = Dimensions.get('window').width;
let DEVICE_HEIGHT = Dimensions.get('window').height;
const aspectRatio = DEVICE_HEIGHT / DEVICE_WIDTH;

export default {
    pageContainerStyle: {
        flex: 1,
        backgroundColor: colors.white,
    },
    buttonContainerStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderColor: 'transperent'
    },
    buttonTextStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color: colors.white,
        fontSize: dimens.margin_15,
        fontWeight: 'normal',
        paddingTop: 12,
        paddingBottom: 12
    },
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: Helpers.getDynamicSize(2),
            height: Helpers.getDynamicSize(2),
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 6,
    },
    headerShadowStyle: {
        shadowColor: colors.gray,
        shadowOffset: {
            width: Helpers.getDynamicSize(2),
            height: Helpers.getDynamicSize(3),
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 6,
    },

    fullImageStyle: {
        height: dimens.percent_100,
        width: dimens.percent_100,
    },
    navigationContainer: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        height: Helpers.getDynamicSize(55),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Helpers.getDynamicSize(6),
        paddingRight: Helpers.getDynamicSize(6),
    },
    navigationTextStyle: {
        fontSize: Helpers.getDynamicSize(15),
        textAlign: 'center',
        color: colors.black
    },
    normalText: {
        
        color: '#ffffff',
        fontSize: Helpers.getDynamicSize(14)
    },
    boldText: {
        // fontFamily: "PTSans-Bold",
        fontWeight:'bold',
        color: '#ffffff',
        fontSize: Helpers.getDynamicSize(14)
    },
    blackText: {

    },
    italic: {
        fontStyle: "italic"
    },
    bold: {
        fontWeight: '600'
    },
   


};
