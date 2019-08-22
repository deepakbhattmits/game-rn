import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        <View style={ {...styles.card, ...props.style} }>
            { props.children }
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        shadowColor: '#444',
        shadowOffset:{ height:2, width: 0,},
        shadowRadius: 2,
        shadowOpacity:0.80,
        backgroundColor: '#fff',
        elevation: 5,
        padding: 10,
      },
});
export default Card;