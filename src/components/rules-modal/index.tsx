import './rules-modal.css';
import stats from '../../assets/stat-chart.png';

type RulesModalProps = {
    onStartGame: () => void;
}

export function RulesModal({ onStartGame }: RulesModalProps) {
    return (
        <div className="modal__overlay">
            <div className="modal__container">
                <h2>Welcome to the test</h2>
                <p>You are playing as a newspaper reporter out searching for stories.</p>
                <p>Each question is associated with a Stat and each Stat is countered by a different Stat.</p>
                <div className="modal__container__stats">
                    <ul>
                        <li>Charm</li>
                        <li>Imagery</li>
                        <li>Insight</li>
                        <li>Intuition</li>
                        <li>Observation</li>
                        <li>Wit</li>
                    </ul>
                    <div>
                        <img src={stats} height={250}/>
                    </div>
                </div>

                <button onClick={onStartGame}>Start Game</button>
            </div>
        </div>
    )
}