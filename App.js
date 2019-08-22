import React,{ useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';
import GameOverScreen from './components/screens/GameOverScreen';
 
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


const App = () => {
  const [ userNumber, setUserNumber ] = useState();
  const [ guessRounds, setGuessRounds ] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  const configureNewGame = () => {
    setGuessRounds( 0 );
    setUserNumber( null );
  }
  const startGameHandler = selectedNumber => {
    setUserNumber( selectedNumber );
  }
  const gameOverHandler = numOfRounds => {
    setGuessRounds( numOfRounds );
  }
  let content = <StartGameScreen onStartGame={ startGameHandler } />;
  if( userNumber && guessRounds <= 0 ) {
    content =   <GameScreen userChoice={ userNumber } onGameOver= { gameOverHandler } />;  
  } else if( guessRounds > 0 ) {
    content =   <GameOverScreen userNumber={ userNumber } guessRounds={ guessRounds } onRestart={ configureNewGame }/>;  
  } 
 
  return (
    <View style={ styles.screen }>
      <Header 
        title='Guess a Number'
      />
      { content }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  } 
});
export default App;