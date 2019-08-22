import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Number from '../reuse/Number';
import Card from '../reuse/Card';

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
            <Text>Opponent Guess </Text>
            <Number> { currentGuess }</Number>
            <Card style={ styles.buttonContainer }>
                <Button title='Lower' onPress={ nextGuessHandler.bind(this, 'lower') }/>
                <Button title='Greater' onPress={ nextGuessHandler.bind(this, 'greater') } />
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