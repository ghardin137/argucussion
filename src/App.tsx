import { useState, useEffect, useRef } from 'react'
import { CharacterDisplay } from './components/character-display';
import { CharacterImage } from './components/character-image';
import { MessageList } from './components/message-list';
import { GameState } from './components/game-state';
import { GameOver } from './components/game-over';
import { Player, NPC, messages, Stats, conversation } from './data';
import { Character, Message, ResponseMessage } from './types';
import './App.css'
import playerImage from './assets/main_player_demo.png';
import npcImage from './assets/goblin-banker.png';

function App() {
  const [selectedMessage, setSelectedMessage] = useState('');
  const [player, setPlayer] = useState<Character>(Player);
  const [npc, setNPC] = useState<Character>(NPC);
  const [playerQuestions, setPlayerQuestions] = useState<Message[]>(conversation.questions.map((id) => messages[id] as Message));
  const [npcResponse, setNPCResponse] = useState<ResponseMessage>();
  const [gameState, setGameState] = useState<"win" | "lose" | undefined>();
  const [moveTaken, setMoveTaken] = useState(false);
  const [time, setTime] = useState(99);

  const countdownRef = useRef<number>();

  const determineHit = (message: Message) => {
    const { primaryStat } = message;
    const counterStat = Stats[primaryStat].counter;
    const playerStat = player[primaryStat];
    const npcStat = npc[counterStat];
    const playerRoll = Math.ceil(Math.random() * 20) + playerStat;
    const npcRoll = Math.ceil(Math.random() *20) + npcStat;

    return playerRoll > npcRoll;
  }

  const statModifier = (stat: number) => {
    return Math.floor(Math.pow((stat / 3), 2));
  }

  const determineHitStrength = (hit: boolean, message: Message) => {
    const { primaryStat } = message;
    const counterStat = Stats[primaryStat].counter;
    const playerStat = player[primaryStat];
    const npcStat = npc[counterStat];
    
    let strength = Math.round(Math.random() * npcStat) + statModifier(npcStat);

    if(hit) {
      strength = Math.round(Math.random() * playerStat) + statModifier(playerStat);
    }

    return strength;
  }

  const handleChooseMessage = (id:string) => {
    if(moveTaken || !!gameState) return;
    setMoveTaken(true);
    const message = messages[id] as Message;
    let order = conversation.questions;

    if(message) {
      order = message.children;
    }

    if(!id) {
      setPlayerQuestions(order.map((id) => messages[id] as Message));
      return;
    }

    const hit = determineHit(message);
    const strength = determineHitStrength(hit, message);
    
    let response;
    if(hit) {
      response = messages[message.response.success[Math.floor(Math.random() * message.response.success.length)]] as ResponseMessage;
      setSelectedMessage(id);
      setNPC(npc => ({
        ...npc,
        health: npc.health - strength,
      }))
      if(order.length > 0) {
        setPlayerQuestions(order.map(child => messages[child] as Message));
      } else {
        setPlayerQuestions(conversation.questions.map(child => messages[child] as Message)); 
      }
      setTimeout(() => {
        setMoveTaken(false);
      }, 500);
    } else {
      response = messages[message.response.failure[Math.floor(Math.random() * message.response.failure.length)]] as ResponseMessage;
      setPlayer(player => ({
        ...player,
        health: player.health - strength,
      }))
      setTimeout(() => {
        setMoveTaken(false);
        setSelectedMessage('');
      }, 500);
    }
    setNPCResponse(response);
  }

  const handleReset = () => {
    setPlayer(Player);
    setNPC(NPC);
    setTime(99);
    setPlayerQuestions(conversation.questions.map((id) => messages[id] as Message));
    setNPCResponse(undefined);
    setGameState(undefined);
    setSelectedMessage('');
    setMoveTaken(false);
    countdownRef.current = setInterval(() => setTime(prev => prev - 1), 1000);
  }

  useEffect(() => {
    countdownRef.current = setInterval(() => setTime(prev => prev - 1), 1000);
    return () => clearInterval(countdownRef.current);
  }, []);


  useEffect(() => {
    const win = () => {
      setGameState("win");
      setNPCResponse(conversation.successMessage);
      clearInterval(countdownRef.current);   
    }

    const lose = () => {
      setGameState("lose");
      setNPCResponse(conversation.failMessage);
      clearInterval(countdownRef.current);   
    }

    if(time === 0) {
      if(player.health <= npc.health) {
        lose();
      } else {
        win();
      }
    } else if(player.health <= 0) {
      lose();
    } else if(npc.health <= 0) {
       win();
    }
  }, [player, npc, time])

  return (
    <div className="app__container">
      <GameState time={time} />
      <CharacterDisplay character={player} className="app__container__character-left"/>
      <CharacterImage image={playerImage} className="character-image__left"/>
      <CharacterDisplay character={npc} className="app__container__character-right"/>
      <CharacterImage image={npcImage} className="character-image__right"/>
      <MessageList messages={playerQuestions} selectedMessage={selectedMessage} chooseMessage={handleChooseMessage} className="app__container__messages-left"/>
      {npcResponse && <MessageList messages={[npcResponse as Message]} selectedMessage={npcResponse.id} chooseMessage={() => {}} className="app__container__messages-right" showBack={false}/>}
      {gameState && <GameOver gameState={gameState} handleReset={handleReset} />}
    </div>
  )
}

export default App
