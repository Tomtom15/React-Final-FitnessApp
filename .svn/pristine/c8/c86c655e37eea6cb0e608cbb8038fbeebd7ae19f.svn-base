/* eslint-disable no-const-assign */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import colors from '../../theme/colors';

const { width, height } = Dimensions.get('window');

class Indicator extends React.PureComponent {

    constructor(props) {
        super(props)
        this.ballIndicator = props.renderBallIndicator
    }

    render() {
        const isVisible = this.props.isVisible;
        if (this.props.isVisible == null) { isVisible = false; }

        return (

            <Overlay
                overlayStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'rgba(255, 255, 255, .2)',
                    width:width
                }}
                isVisible={isVisible}
                windowBackgroundColor="rgba(255, 255, 255, .2)"
                overlayBackgroundColor="#00000000"
                width={width}
                height={height}
            >
                <SkypeIndicator animationDuration={800} color={colors.primary} />
             </Overlay>

        )
    }
}

export default Indicator;
