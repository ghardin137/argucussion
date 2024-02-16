import { useState, useEffect } from 'react'
import { CharacterDisplay } from './components/character-display';
import { MessageList } from './components/message-list';
import { GameState } from './components/game-state';
import { Player, NPC, messages, messageOrder, Stats } from './data';
import { Character, Message, ResponseMessage } from './types';
import './App.css'

function App() {
  const [selectedMessage, setSelectedMessage] = useState('');
  const [player, setPlayer] = useState<Character>(Player);
  const [npc, setNPC] = useState<Character>(NPC);
  const [playerQuestions, setPlayerQuestions] = useState<Message[]>(messageOrder.map((id) => messages[id] as Message));
  const [npcResponse, setNPCResponse] = useState<ResponseMessage>();
  const [gameState, setGameState] = useState<"win" | "lose" | undefined>();
  const [moveTaken, setMoveTaken] = useState(false);

  const determineHit = (message: Message) => {
    const { primaryStat } = message;
    const counterStat = Stats[primaryStat].counter;
    const playerStat = player[primaryStat];
    const npcStat = npc[counterStat];
    const playerRoll = Math.ceil(Math.random() * 20) + (playerStat - 5);
    const npcRoll = Math.ceil(Math.random() *20) + (npcStat - 5);

    if(playerRoll > npcRoll) {
      return true
    }
    return false;
  }

  const determineHitStrength = (hit: boolean) => {
    return 3;
  }

  const handleChooseMessage = (id:string) => {
    if(moveTaken) return;
    setMoveTaken(true);
    const message = messages[id] as Message;
    let order = messageOrder;

    if(message) {
      order = message.children;
    }

    if(!id) {
      setPlayerQuestions(order.map((id) => messages[id] as Message));
      return;
    }

    const hit = determineHit(message);
    const strength = determineHitStrength(hit);
    
    let response;
    if(hit) {
      response = message.response.success.map(id => messages[id] as ResponseMessage).find(item => item.strength === strength);
      setTimeout(() => {
        setSelectedMessage(id);
        if(order.length > 0) {
          setPlayerQuestions(order.map(child => messages[child] as Message));
        } else {
          setPlayerQuestions(messageOrder.map(child => messages[child] as Message)); 
        }
        setNPCResponse(undefined);
        setMoveTaken(false);
      }, 2000);
    } else {
      response = message.response.failure.map(id => messages[id] as ResponseMessage).find(item => item.strength <= strength && item.strength >= strength);
      setTimeout(() => {
        setNPCResponse(undefined);
        setMoveTaken(false);
      }, 2000);
    }
    setNPCResponse(response);
  }

  useEffect(() => {
    if(player.health < 0) {
      setGameState("lose");
    }
    if(npc.health < 0) {
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
