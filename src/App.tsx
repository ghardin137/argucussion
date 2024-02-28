import { useState, useReducer, useEffect, useRef } from 'react'
import { CharacterDisplay } from './components/character-display';
import { CharacterImage } from './components/character-image';
import { MessageList } from './components/message-list';
import { GameState } from './components/game-state';
import { GameOver } from './components/game-over';
import { ResetGameAction, QuestionChosenAction, ChangeTimeAction, coreReducer, initialState } from './logic';
import { Message } from './types';
import './App.css'

function App() {
  const [moveTaken, setMoveTaken] = useState(false);

  const [state, dispatch] = useReducer<typeof coreReducer>(coreReducer, initialState);

  const countdownRef = useRef<number>();

  const handleChooseMessage = (id: string) => {
    if (moveTaken || !!state.gameState) return;
    setMoveTaken(true);

    dispatch(QuestionChosenAction(id));

    setTimeout(() => {
      setMoveTaken(false);
    }, 500);
  }

  const handleReset = () => {
    dispatch(ResetGameAction());
    countdownRef.current = setInterval(() => dispatch(ChangeTimeAction()), 1000);
  }

  useEffect(() => {
    countdownRef.current = setInterval(() => dispatch(ChangeTimeAction()), 1000);
    return () => clearInterval(countdownRef.current);
  }, []);


  useEffect(() => {
    if (state.time === 0 || !!state.gameState) {
      clearInterval(countdownRef.current);
    }
  }, [state])

  return (
    <div className="app__container">
      <GameState time={state.time} />
      <CharacterDisplay character={state.player} className="app__container__character-left" />
      <CharacterImage image={state.player.image} className="character-image__left" />
      <CharacterDisplay character={state.npc} className="app__container__character-right" />
      <CharacterImage image={state.npc.image} className="character-image__right" />
      <MessageList messages={state.playerQuestions} selectedMessage={state.selectedMessage} chooseMessage={handleChooseMessage} className="app__container__messages-left" />
      {state.npcResponse && <MessageList messages={[state.npcResponse as Message]} selectedMessage={state.npcResponse.id} chooseMessage={() => { }} className="app__container__messages-right" showBack={false} />}
      {state.gameState && <GameOver gameState={state.gameState} handleReset={handleReset} />}
    </div>
  )
}

export default App
