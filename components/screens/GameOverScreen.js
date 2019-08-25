import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/Colors';
import BodyText from '../BodyText';
import MainButton from '../MainButton';
const GameOverScreen = props => {
    return (
        <ScrollView>
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
                        Your Phone Needed{' '} 
                        <Text style={ styles.highlight }>
                            { props.guessRounds }  
                        </Text> rounds to Guess the Number{' '}
                        <Text style={ styles.highlight }>
                            { props.userNumber }
                        </Text>
                    </BodyText> 
                </View>
                <MainButton onPress={ props.onRestart } >
                    New Game 
                </MainButton>
            </View>
        </ScrollView>
    );
}
const styles= StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.5,
        borderWidth: 3,
        borderColor: '#444',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },  
    resultContainer: {
        width: '80%',
        marginHorizontal: 30,
        marginVertical:  Dimensions.get('window').height / 60,
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});
export default GameOverScreen;