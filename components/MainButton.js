import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from './constants/Colors'; 
const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={ 0.6 } onPress={ props.onPress }>
            <View style={ styles.button } >
                <Text style={ styles.buttonText }>
                    { props.children }
                </Text>
            </View>
        </TouchableOpacity>
        
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
        fontFamily: 'open-sans',
        fontSize: 18,
    },
});
export default MainButton;