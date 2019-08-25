import React from 'react';
import { 
        View, 
        Text,
        TouchableOpacity,
        TouchableNativeFeedback,
        Platform,
        StyleSheet } from 'react-native';
import Colors from './constants/Colors'; 
const MainButton = props => {
    let ButtonComponent = TouchableOpacity;
    if( Platform.Version >= 21 ) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <ButtonComponent onPress={ props.onPress }>
            <View style={ styles.button } >
                <Text style={ styles.buttonText }>
                    { props.children }
                </Text>
            </View>
        </ButtonComponent>
        
    );
};
const styles= StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
});
export default MainButton;