import React from 'react';

import { Text, StyleSheet } from 'react-native';
import Colors from './constants/Colors';

const BodyText = props => {
    return (
        <Text style={ {...styles.body, ...props.style} }>
            { props.children }
        </Text>
    )
};
const styles = StyleSheet.create({
    body: {
        fontSize: 20,
        color: Colors.accent,
    },
});

export default BodyText;

