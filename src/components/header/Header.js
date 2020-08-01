import React from 'react';
import { Text, TouchableWithoutFeedback, Dimensions, TouchableOpacity, View, Image, ActivityIndicator, Platform } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import colors from '../../theme/colors';
import Helpers from '../../utils/Helper';
import Logger from '../../utils/Logger';
import { connect } from 'react-redux';
import styles from './styles';

const { width, height } = Dimensions.get('window');
class Header extends React.Component {


    constructor(props) {
        super(props)
        this.isPoint = this.props.isPoint === undefined ? false : this.props.isPoint
        this.leftIcon = this.props.leftIcon
        this.hideDrawer = this.props.hideDrawer === undefined ? false : this.props.hideDrawer
        this.state = {
            aspectRatio: undefined
        }
        

    }
    getLeftMenuIcon() {
        var imageId;
        if (this.props.isBackEvent) {
            return require('../../assets/ic_back_arrow.png')  // Add back icon here
        }
        return imageId;
    }


    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.isPropsChange)
        //     return true;
        // else
        //     return false; // equals() is your implementation
        return this.equals(nextProps, this.props, nextState, this.state); // equals() is your implementation
    }




    equals(nextProps, currentProps, nextState, currentstate) {
        // Logger.log('Navigation shouldComponentUpdate');
        if (!(nextProps.navigation.state.key === currentProps.navigation.state.key)) {
            Logger.log('shouldComponentUpdate navigation');
            return true;
        } else if (!(nextProps.isbadge === currentProps.isbadge)) {
            Logger.log('shouldComponentUpdate isbadge');
            return true;
        } else if (!(nextProps.isPoint === currentProps.isPoint)) {
            Logger.log('shouldComponentUpdate isPoint');
            return true;
        } else if (!(nextProps.title === currentProps.title)) {
            Logger.log('shouldComponentUpdate title');
            return true;
        } else if (!(nextProps.isBackEvent === currentProps.isBackEvent)) {
            Logger.log('shouldComponentUpdate isBackEvent');
            return true;
        } else if (!(nextProps.leftMenu === currentProps.leftMenu)) {
            Logger.log('shouldComponentUpdate leftMenu');
            return true;
        } else if (!(nextProps.leftIcon === currentProps.leftIcon)) {
            Logger.log('shouldComponentUpdate leftMenu');
            return true;
        }
        else if (!(nextProps.rightMenu === currentProps.rightMenu)) {
            Logger.log('shouldComponentUpdate rightMenu');
            return true;
        } else if (!(nextProps.rightIcon === currentProps.rightIcon)) {
            Logger.log('shouldComponentUpdate rightIcon');
            return true;
            // } else if (nextProps.bounce) {
            //     Logger.log('shouldComponentUpdate bounce=>' + nextProps.bounce);
            //     this.view.bounce(400).then(endState => Logger.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
            //     return true;
        } else if (!(nextProps.language === currentProps.language)) {
            Logger.log('shouldComponentUpdate rightIcon');
            return true;
        }
        else if (!(nextProps.hideLanguage === currentProps.hideLanguage)) {
            Logger.log('shouldComponentUpdate rightIcon');
            return true;

        }
        else if (!(nextProps.user_type === currentProps.user_type)) {
            Logger.log('shouldComponentUpdate rightIcon');
            return true;

        }
        else if (!(nextState.aspectRatio === currentstate.aspectRatio)) {
            Logger.log('shouldComponentUpdate aspect ratio');
            return true;

        }
        else {
            return false;
        }
    }

    popToPreviousView(props) {
        if (props.onBackPressed) {
            props.onBackPressed()
        } else {
            this.isBackEvent ? props.navigation.pop() : props.navigation.toggleDrawer();
        }
    }
    componentDidMount() {
        //  alert(JSON.stringify(this.leftIcon))
        let uri = (this.props.leftIcon && this.props.leftIcon.uri) ? this.props.leftIcon.uri : undefined
        if (uri) {
            Image.getSize(uri, (width, height) => {
                // Logger.log(`The image dimensions are ${width}x${height}`);
                Logger.log("The image height " + height + "width " + width + "aspect ratio " + height / width);
                let aspectRatio = width / height
                this.setState({ aspectRatio: aspectRatio })
            }, (error) => {
                Logger.error(`Couldn't get the image size: ${error.message}`);
            });
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (this.props.leftIcon) {
            if(nextProps.leftIcon!=this.props.leftIcon){
                await this.setState({
                    aspectRatio:undefined
                })
            }
            let uri = (this.props.leftIcon && this.props.leftIcon.uri) ? this.props.leftIcon.uri : undefined
            if (uri) {
                Image.getSize(uri, (width, height) => {
                    // Logger.log(`The image dimensions are ${width}x${height}`);
                    Logger.log("The image height " + height + "width " + width + "aspect ratio " + height / width);
                    let aspectRatio = width / height
                    this.setState({ aspectRatio: aspectRatio })
                }, (error) => {
                    Logger.error(`Couldn't get the image size: ${error.message}`);
                });
            }
        }

    }
    render() {
        Logger.log("Hide drawer" + this.hideDrawer)
        
        
        this.isBackEvent = this.props.isBackEvent;

        const LeftMenu = () => {
            const left = this.props.leftMenu;

            Logger.log("Image" + this.leftIcon)
            return (
                this.isBackEvent ?
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'transparent',
                            tintColor: "transparent",
                            width: Helpers.getDynamicSize(42),
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}
                        activeOpacity={1}
                        onPress={() => {
                            this.popToPreviousView(this.props)
                        }}>
                        <Image style={{
                            height: Helpers.getDynamicSize(18),
                            width: Helpers.getDynamicSize(18),
                            marginLeft: Helpers.getDynamicSize(5)
                        }} resizeMode='contain'
                            source={this.getLeftMenuIcon()} />
                    </TouchableOpacity>
                    :this.props.leftMenu?
                    <TouchableOpacity
                        style={{ padding: Helpers.getDynamicSize(4), alignItems: 'center' }}
                        activeOpacity={1}
                        onPress={() => {
                            this.props.navigation.toggleDrawer()
                        }}>
                        <Image style={styles.menu} resizeMode='contain'
                            source={require('../../assets/ic_menu.png')} />
                    </TouchableOpacity>
                    :null
                    
            )
        };
        

        return (

          
                <View style={[CommonStyles.navigationContainer]}>
                    <LeftMenu />
                    <View style={{ flex: 1 }} >
                        {this.props.title ?
                            <Text style={[CommonStyles.normalText, styles.title]}>{this.props.title}</Text> : null
                        }
                    </View>
                    
                   
                </View>
           
        );
    }

}
const mapStateToProps = state => {
    return {
        language: state.component.language,
        leftIcon: state.component.leftIcon
    }
}
export default connect(mapStateToProps)(Header)