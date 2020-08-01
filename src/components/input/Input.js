import React from 'react';
import { Image, TextInput, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import colors from '../../theme/colors';
import Helpers from '../../utils/Helper';
import Logger from '../../utils/Logger';
import CommonStyles from '../../styles/CommonStyles';
import styles from './styles';

class Input extends React.Component {
    constructor(props) {
        super(props)
        //Logger.log("propes value=> " + props.value)
        this.state = {
            value: String(props.value),
            secureTextEntry:props.secureTextEntry
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.value != nextProps.value) {
            this.setState({
                value: nextProps.value
            })
        }
        if(this.state.secureTextEntry!=nextProps.secureTextEntry)
        this.setState({
            secureTextEntry:nextProps.secureTextEntry
        })
    }

    onChangeText(text) {
        this.setState({
            value: text
        })
        this.props.onChangeText(text)
    }
    onBlur() {
        if (this.props.onBlur) {
            this.props.onBlur()
        }
    }
    onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus()
        }
    }
    onSubmitEditing() {
        if (this.props.onSubmitEditing)
            this.props.onSubmitEditing()
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }
    setRef = (ref) => {
        if (this.props.setRef)
            this.props.setRef(ref)
    }
    render() {
        const {
            image, placeholderTextColor, placeholder, keyboardType, style, editable,capitalize,
            returnKeyType, secureTextEntry, maxLength, multiline, errorText, inputStyle, rightImage, rightImagePress,doubleRightImage,doubleImagePress
        } = this.props;

        return (
            <View style={styles.viewWidth}>
                {image ?
                    <Image
                        source={image}
                        style={styles.imageFlex}
                    />
                    : null
                }
                
                <View style={[style]}>
                {errorText ?
                    <View style={styles.viewError}>
                        <Text style={[CommonStyles.normalText,styles.textError]}>
                            {errorText}
                        </Text>
                    </View> : null}
                    <View style={[styles.inputViewStyle]}>
                        <TextInput
                            onFocus={() => this.onFocus()}
                            onBlur={() => this.onBlur()}
                            ref={this.setRef}
                            onSubmitEditing={() => this.onSubmitEditing()}
                            keyboardType={keyboardType}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.white}
                            placeholder={placeholder}
                            secureTextEntry={this.state.secureTextEntry ? this.state.secureTextEntry : null}
                            style={[inputStyle, styles.input]}
                            editable={editable ? true : false}
                            blurOnSubmit={false}
                            maxLength={maxLength}
                            returnKeyType={returnKeyType ? returnKeyType : 'done'}
                            value={this.state.value}
                            onChangeText={(text) => {
                                this.onChangeText(text)
                            }}
                            multiline={multiline ? true : false}
                            textAlignVertical={multiline ? 'top' : 'center'}
                            autoCapitalize={ this.props.capitalize ? 'characters' : this.props.keyboardType==='email-address'?'none':'sentences'}
                          
                        />
                        {
                            (doubleRightImage && rightImage) ? 
                            <View style = {{ flexDirection : 'row' }} >
                                <TouchableOpacity 
                                style = {{ justifyContent : 'center' ,}} 
                                onPress={rightImagePress}>
                                <Image
                                    source={rightImage}
                                    style={styles.doubleImage}
                                />
                                </TouchableOpacity> 
                                <TouchableOpacity  
                                style = {{ justifyContent : 'center' ,height: Helpers.getDynamicSize(38), }} 
                                onPress={doubleImagePress}>
                                <Image
                                    source={doubleRightImage}
                                    style={styles.doubleImage}
                                />
                                </TouchableOpacity> 
                            </View>
                            
                            : rightImage ? 
                            <TouchableOpacity onPress={rightImagePress}>
                                <Image
                                    source={rightImage}
                                    style={styles.rightImage}
                                />
                            </TouchableOpacity> : null
                        }
                        {/* {rightImage ?
                            <TouchableOpacity onPress={rightImagePress}>
                                <Image
                                    source={rightImage}
                                    style={styles.rightImage}
                                />
                            </TouchableOpacity>
                            : null} */}
                    </View>
                </View>

            </View>
        );
    }
};

export default Input;



