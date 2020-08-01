import React, { PureComponent } from 'react';
import { SafeAreaView, StatusBar, View, Dimensions, Keyboard } from 'react-native';
import colors from '../../theme/colors';
import CommonStyles from '../../styles/CommonStyles';
import Header from '../header/Header';
const { width, height } = Dimensions.get('window');


// Added hideDrawer prop to hide menu icon when not needed
// Added leftIcon to pass company logo to header
// Added isFooter to hide and show footer in screens
// hideLanguage to hide language component
class Container extends PureComponent {

    constructor(props) {
        super(props)
        

    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => { this.setState({ isFooterShow: false }); }

    _keyboardDidHide = () => { this.setState({ isFooterShow: true }); }


    checkValidation() {
        var isError = true
    }

    render() {
        // Logger.log(this.props.backgroundColor)
        return (

            <View style={[CommonStyles.pageContainerStyle]}>
                <StatusBar hidden
                
                backgroundColor={colors.primary}
                    barStyle="dark-content" />
                    
                <SafeAreaView style={{ flex: 1,backgroundColor:colors.primary }}>
                    {this.props.isHeader ?

                        <Header
                            onBackPressed={this.props.onBackPressed}
                            navigation={this.props.navigation}
                            title={this.props.title}
                            isPoint={this.props.isPoint}
                            bounce={this.props.bounce}
                            isbadge={this.props.isbadge}
                            isBackEvent={this.props.isBackEvent}
                            leftMenu={this.props.leftMenu}
                            leftIcon={this.props.leftIcon}
                            rightMenu={this.props.rightMenu}
                            rightIcon={this.props.rightIcon}
                            backgroundColor={colors.primaryBtn}
                            rightClick={this.props.rightClick}
                            isHideHeaderShadow={this.props.isHideHeaderShadow}
                            hideDrawer={this.props.hideDrawer}
                            hideLanguage={this.props.hideLanguage}
                            user_type={this.props.user_type}
                        /> : <View />

                    }

                    <View style={CommonStyles.pageContainerStyle}>
                        {this.props.children}
                    </View>
                   
                </SafeAreaView>
            </View>

        );
    }
}

export default Container;
