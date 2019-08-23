import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Number from '../reuse/Number';
import Card from '../reuse/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton  from '../MainButton';
import BodyText from '../BodyText';

const generateRandomNumber = ( min, max, exclude ) => {
    min = Math.ceil( min );
    max = Math.floor( max );
    const rndNum = Math.floor( Math.random() * ( max - min ) ) + min;
    if ( rndNum === exclude ) {
        return generateRandomNumber( min, max, exclude )
    } else {
        return rndNum;
    }
}
const GameScreen = props => {
    const initialGuess = generateRandomNumber(1, 100, props.userChoice );
    const [ currentGuess, setCurrentGuess ] = useState( initialGuess )
    const [ pastGuesses, setPastGuesses ] = useState([ initialGuess ])
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    // const [ rounds, setRounds ] = useState(0);
    const { userChoice, onGameOver } = props;
    useEffect( ()=> { 
        if(currentGuess === userChoice) {
            onGameOver( pastGuesses.length );
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
        const nextNumber = generateRandomNumber(currentLow.current,currentHigh.current,currentGuess)
        setCurrentGuess( nextNumber );
        // setRounds( curRounds => curRounds + 1 );
        setPastGuesses( curPastGuesses => [nextNumber, ...curPastGuesses])
    }
    const renderListItem =  ( value, i ) => {
        return ( 
            <View key={ i } style={ styles.listItem }>
                <BodyText>Round  # : { i }</BodyText>
                <BodyText>Guess : { value }</BodyText>
            </View>
        );
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
            <View style={ styles.listContainer }> 
                <ScrollView contentContainerStyle={ styles.list }>
                    { pastGuesses.map( (guess, i) => renderListItem( guess, pastGuesses.length - i ) )}
                </ScrollView> 
            </View>
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
        paddingHorizontal: 15,
      },
      listContainer:{
          flex: 1,
          width: '90%',
      },
      list:{
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexGrow: 1,
      },
      listItem: {
          borderColor: '#444',
          borderRadius: 5,
          borderWidth: 1,
          padding: 15,
          marginVertical: 10,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',

      },
});
export default GameScreen;