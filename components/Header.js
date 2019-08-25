import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import Colors from './constants/Colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={ { ...styles.headerBase,...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid}) } }>
            <TitleText> { props.title } </TitleText>
        </View>
    );
}
const styles = StyleSheet.create({
    headerBase:{
        paddingTop: 40,
        width: '100%',
        height: 90,
        justifyContent:'center',
        alignItems:'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#444',
        borderBottomWidth: 2,
    },
    headerAndroid: {
        color: 'black',
        backgroundColor: Colors.primary ,
    },
});
export default Header;