import React from 'react';
import { Button } from 'react-native-elements';

import colors from '../../theme/colors';
import Helpers from '../../utils/Helper';
import CommonStyles from '../../styles/CommonStyles';
import styles from './styles'
const CustomButton = ({ style, title, onButtonClick, size, backgroundColor, marginTop, enable, autoCapitalize }) => {

    setRef = (ref) => {
        if (this.props.setRef)
            this.props.setRef(ref)
    }

    const {
        containerStyle,

    } = styles;
    const bgColor = backgroundColor ? backgroundColor : colors.primary;
    return (
        <Button
            title={title}
            onPress={onButtonClick}
            disabled={enable}
            disabledStyle={{
                backgroundColor: colors.gray
            }}
            disabledTitleStyle={{
                color: colors.white,
            }}
            buttonStyle={[CommonStyles.shadowStyle, style, containerStyle, {
                backgroundColor: bgColor,
                borderRadius: Helpers.getDynamicSize(5),
                marginTop: marginTop ? marginTop : Helpers.getDynamicSize(25),
            
            }]}
            titleStyle={{
                alignSelf: 'center',
                textAlign: 'center',
                color: colors.white,
                textTransform: autoCapitalize ? 'uppercase' : 'none',
                fontSize: size ? Helpers.getDynamicSize(size) : Helpers.getDynamicSize(14),
                fontWeight:'bold'
            }} />
    );
};



export default CustomButton;