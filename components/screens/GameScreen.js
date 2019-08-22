import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Number from '../reuse/Number';
import Card from '../reuse/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton  from '../MainButton';

const generateRamdomNumber = ( min, max, exclude ) => {
    min = Math.ceil( min );
    max = Math.floor( max );
    const rndNum = Math.floor( Math.random() * ( max - min ) ) + min;
    if ( rndNum === exclude ) {
        return generateRamdomNumber( min, max, exclude )
    } else {
        return rndNum;
    }
}
const GameScreen = props => {
    const [ currentGuess, setCurrentGuess ] = useState( generateRamdomNumber(1, 100, props.userChoice ) )
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [ rounds, setRounds ] = useState(0);
    const { userChoice, onGameOver } = props;
    useEffect( ()=> { 
        if(currentGuess === userChoice) {
            onGameOver( rounds );
        }
    }, [ currentGuess, userChoice, onGameOver ] );
    const nextGuessHandler = direction => {
        if ( ( direction === 'lower' && currentGuess < props.userChoice ) || ( direction === 'greater' && currentGuess > props.userChoice) ) {
            Alert.alert(
                        'Don\'t Lie !',
                        'You know that this is wrong...',
                        [{text:'Sorry !', style:'cancle'}]
                        )
                        return;
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }        
        const nextNumber = generateRamdomNumber(currentLow.current,currentHigh.current,currentGuess)
        setCurrentGuess( nextNumber );
        setRounds( curRounds => curRounds + 1 );
    }
    return (
        <View style={ styles.screen }>
            <Text style={ DefaultStyles.bodyText }>Opponent Guess </Text>
            <Number> { currentGuess }</Number>
            <Card style={ styles.buttonContainer }>
                <MainButton onPress={ nextGuessHandler.bind(this, 'lower') }>
                   <Ionicons name='md-remove' size={ 24 } color='white' />
                </MainButton>
                <MainButton onPress={ nextGuessHandler.bind(this, 'greater') } >
                    <Ionicons name='md-add' size={ 24 } color='white' />
                </MainButton>
            </Card>
        </View>
        );
};
const styles= StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
      },
});
export default GameScreen;