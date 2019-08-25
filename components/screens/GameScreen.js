import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Alert, ScrollView, Dimensions, StyleSheet } from 'react-native';
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
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    const initialGuess = generateRandomNumber(1, 100, props.userChoice );
    const [ currentGuess, setCurrentGuess ] = useState( initialGuess );
    const [ pastGuesses, setPastGuesses ] = useState([ initialGuess ]);
    const [ avoidableDeviceWidth, setAvoidableDeviceWidth ] = useState( 
        Dimensions.get('window').width
    );
    const [ avoidableDeviceHeight, setAvoidableDeviceHeight ] = useState( 
        Dimensions.get('window').height
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    // const [ rounds, setRounds ] = useState(0);
    const { userChoice, onGameOver } = props;
    useEffect( ()=> {
        const updateLayout = () => {
            setAvoidableDeviceWidth( Dimensions.get('window').width );
            setAvoidableDeviceHeight( Dimensions.get('window').height );
        }
        Dimensions.addEventListener('change', updateLayout );
        return ()=> {
                Dimensions.removeEventListener('change', updateLayout );
        }
    })
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
    let listContainerStyle = styles.listContainer;
    if( avoidableDeviceWidth < 350 ) {
        listContainerStyle = styles.listContainerBig;
    }
    if( avoidableDeviceHeight < 500 ) {
        return (
            <View style={ styles.screen }>
                <Text style={ DefaultStyles.bodyText }>Opponent Guess </Text>
                <View style={ styles.controls }>
                    <MainButton onPress={ nextGuessHandler.bind(this, 'lower') }>
                        <Ionicons name='md-remove' size={ 24 } color='white' />
                    </MainButton>
                    <Number> { currentGuess }</Number>
                    <MainButton onPress={ nextGuessHandler.bind(this, 'greater') } >
                        <Ionicons name='md-add' size={ 24 } color='white' />
                    </MainButton>
                </View>
                <View style={ listContainerStyle }> 
                    <ScrollView contentContainerStyle={ styles.list }>
                        { pastGuesses.map( (guess, i) => renderListItem( guess, pastGuesses.length - i ) )}
                    </ScrollView> 
                </View>
            </View>
        )
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
                <View style={ listContainerStyle }> 
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
    controls:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '85%',
        marginTop: Dimensions.get('window').height > 600 ? 20: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      },
      listContainer:{
          flex: 1,
          width: '90%',
          height: '100%',
      },
      listContainerBig: {
          flex: 1,
          width: '100%',
          height: '100%',
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