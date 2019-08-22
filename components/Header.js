import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from './constants/Colors';

const Header = props => {
    return (
        <View style={ styles.header }>
            <Text style={ styles.title }> { props.title } </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    header:{
        backgroundColor: Colors.primary,
        paddingTop: 40,
        width: '100%',
        height: 90,
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        color: '#444',
        fontSize: 20,
    },
});
export default Header;