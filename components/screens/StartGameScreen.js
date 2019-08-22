import React,{ useState } from 'react';
import { 
          View, 
          Text, 
          StyleSheet, 
          Button, 
          TouchableWithoutFeedback, 
          Keyboard,
          Alert,
           } from 'react-native';
import Card from '../reuse/Card';
import Input from '../reuse/Input';
import Number from '../reuse/Number';
import Colors from '../constants/Colors';

const StartGameScreen = props => {
  const [ enteredValue, setEnteredValue ] = useState('');
  const [ confirmed, setConfirmed ] = useState(false);
  const [ selectedNumber, setSelectedNumber ] = useState('');
  const changeHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g,''));
  }
  const restInputHandler = ( ) => {
    setEnteredValue('');
    setConfirmed(false);
  }
  const confirmIputHandler = ( ) => {
    const choosenNumber = parseInt( enteredValue );
    if( isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99 ) {
      Alert.alert(
                'Invalid Number ! ',
                'Number has to a number between 1 to 99 ',
                [ {text: 'Okay', style:'destructive', onPress: restInputHandler } ]
                )
      return;
    }
    setSelectedNumber(choosenNumber)
    setConfirmed(true);
    setEnteredValue(''); 
  }
  let confirmedOutput;
  if( confirmed ) {
    confirmedOutput=  <Card style={ styles.summaryContainer }>
                          <Text style={ styles.summaryText }>You Selected </Text>
                          <Number>{ selectedNumber } </Number>
                          <Button title='Start Game' onPress={ () => props.onStartGame( selectedNumber ) } />                         
                      </Card>
  }
  return (
    <TouchableWithoutFeedback onPress={()=> { Keyboard.dismiss(); } }>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={ styles.inputContainer }>
          <Text>Select a Number</Text>
          <Input 
            style={ styles.input } 
            blurOnSubmit 
            autoCapitalization='none' 
            autoCorrect={ false } 
            keyboardType='number-pad'
            maxLength={ 2 }  
            onChangeText={ changeHandler }
            value={ enteredValue }
          />
          <View style={styles.buttonContainer}>
              <View style={ styles.button }>
                  <Button title='Reset' color={ Colors.primary } onPress={ restInputHandler } />
              </View>
              <View style={ styles.button }>
                  <Button title='Confirm' color={ Colors.accent } onPress={ confirmIputHandler } />
              </View>
          
          </View>
        </Card>
        { confirmedOutput }
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button:{
      width: '40%',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;