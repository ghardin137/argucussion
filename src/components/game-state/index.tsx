type GameStateProps = {
    gameState: "win" | "lose" | undefined;
    time: string;
}
import './game-state.css';

export function GameState({ gameState, time} : GameStateProps) {
    return (
        <div className="app__container__game-state">
            <div className="app__container__game-state__time">{time}</div>
            <div className="app__container__game-state__state">{gameState ? gameState.toUpperCase() : 'Fight'}</div>
        </div>
    );
}
