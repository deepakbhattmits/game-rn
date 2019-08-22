import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from './constants/Colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={ styles.header }>
            <TitleText> { props.title } </TitleText>
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
});
export default Header;