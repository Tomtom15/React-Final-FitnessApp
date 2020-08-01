import colors from '../../theme/colors';
import Helpers from '../../utils/Helper';

const styles = {
    input: {
        backgroundColor: 'transparent',
        padding: Helpers.getDynamicSize(10),
        flex: 1
    },
    inputViewStyle: {
        height: Helpers.getDynamicSize(40),
        backgroundColor: 'transparent',
        borderRadius: Helpers.getDynamicSize(5),
        borderWidth: Helpers.getDynamicSize(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: colors.primary,
    },
    rightImage: {
        height: Helpers.getNewDynamicSize(15),
        width: Helpers.getNewDynamicSize(15),
        resizeMode: "contain",
        marginHorizontal: Helpers.getNewDynamicSize(10)
    },
    doubleImage: {
        height: Helpers.getNewDynamicSize(15),
        width: Helpers.getNewDynamicSize(15),
        resizeMode: "contain",
        tintColor : colors.grey_line,
        marginHorizontal: Helpers.getNewDynamicSize(5)
    },
    viewWidth: {
        width: '100%'
    },
    imageFlex: {
        flex: 1
    },
    viewError: {
        flex: 1,
        marginLeft: Helpers.getDynamicSize(12),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: Helpers.getNewDynamicSize(5)
    },
    textError: {
        paddingRight: 10,
        color: colors.red,
        fontSize: Helpers.getDynamicSize(12),
    }

};
export default styles