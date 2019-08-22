import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/Colors';
import BodyText from '../BodyText';
import MainButton from '../MainButton';
const GameOverScreen = props => {
    return (
        <View style={ styles.screen }>
            <Text style={ DefaultStyles.bodyText }>The Game is Over ! </Text>
            <View style={ styles.imageContainer }>
            <Image 
                style={ styles.image } 
                source={ require('../../assets/images/success.png') }
                resizeMode='cover'
            />
            </View>
           <View style={ styles.resultContainer } >
                <BodyText style={ styles.resultText }>
                    Your Phone Needed round  
                    <Text style={ styles.highlight }>
                        { props.guessRounds }  
                    </Text> 
                    to Guess the Number 
                    <Text style={ styles.highlight }>
                        { props.userNumber }
                    </Text>
                </BodyText> 
            </View>
            <MainButton onPress={ props.onRestart } >
                 New Game 
            </MainButton>
        </View>
    );
}
const styles= StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#444',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        width: '80%',
        marginHorizontal: 30,
        marginVertical: 15,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});
export default GameOverScreen;