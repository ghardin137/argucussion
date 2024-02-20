import { useState, useEffect } from 'react'
import { CharacterDisplay } from './components/character-display';
import { MessageList } from './components/message-list';
import { GameState } from './components/game-state';
import { Player, NPC, messages, Stats, conversation } from './data';
import { Character, Message, ResponseMessage } from './types';
import './App.css'

function App() {
  const [selectedMessage, setSelectedMessage] = useState('');
  const [player, setPlayer] = useState<Character>(Player);
  const [npc, setNPC] = useState<Character>(NPC);
  const [playerQuestions, setPlayerQuestions] = useState<Message[]>(conversation.questions.map((id) => messages[id] as Message));
  const [npcResponse, setNPCResponse] = useState<ResponseMessage>();
  const [gameState, setGameState] = useState<"win" | "lose" | undefined>();
  const [moveTaken, setMoveTaken] = useState(false);

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
    return Math.floor((stat / 3) * (stat / 3));
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
    if(moveTaken) return;
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
        recentHit: - strength,
      }))
      setTimeout(() => {
        if(order.length > 0) {
          setPlayerQuestions(order.map(child => messages[child] as Message));
        } else {
          setPlayerQuestions(conversation.questions.map(child => messages[child] as Message)); 
        }
        setNPCResponse(undefined);
        setMoveTaken(false);
        setSelectedMessage('');
      }, 2000);
    } else {
      response = messages[message.response.failure[Math.floor(Math.random() * message.response.failure.length)]] as ResponseMessage;
      setPlayer(player => ({
        ...player,
        health: player.health - strength,
        recentHit: - strength,
      }))
      setTimeout(() => {
        setNPCResponse(undefined);
        setMoveTaken(false);
        setSelectedMessage('');
      }, 2000);
    }
    setNPCResponse(response);
  }

  useEffect(() => {
    if(player.health <= 0) {
      setGameState("lose");
    }
    if(npc.health <= 0) {
      setGameState("win");
    }
  }, [player, npc])

  return (
    <div className="app__container">
      <CharacterDisplay player={player} className="app__container__character-left"/>
      <GameState gameState={gameState} time="99" />
      <CharacterDisplay player={npc} className="app__container__character-right"/>
      <MessageList messages={playerQuestions} selectedMessage={selectedMessage} chooseMessage={handleChooseMessage} className="app__container__messages-left"/>
      {npcResponse && <MessageList messages={[npcResponse as Message]} selectedMessage={npcResponse.id} chooseMessage={() => {}} className="app__container__messages-right" showBack={false}/>}
    </div>
  )
}

export default App
