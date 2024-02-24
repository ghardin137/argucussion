import './game-over.css';

type gameOverProps = {
    gameState?: 'win' | 'lose';
    handleReset: () => void;
}

export function GameOver({ gameState, handleReset }: gameOverProps) {
    return <div className="app__game-over">
        <h3>Game Over</h3>
        <h1>{gameState === 'win' ? "You Won!" : "You Lost!"}</h1>
        <button className="app__game-over_reset" onClick={handleReset}>Play Again</button>
    </div>
}