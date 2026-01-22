import {FC} from "react";
import CloseRpsImage from "../assets/img/close.png";

interface RPSHowToPlayProp {
    onClose: () => void;
}

export const HowToPlay:FC<RPSHowToPlayProp> = ({onClose}) => {
    return (
        <div className="how-to-play-rps">
            <div className="how-to-play-rps-container">
            <div className="how-to-play-header">
                <span className="how-to-play-header-title">How to Play Rock Paper Scissors</span>
                <img
                    className="cancel-help-how-to-play-btn"
                    src={CloseRpsImage}
                    onClick={onClose}
                    alt="Close"
                />
            </div>


            <div className="how-to-play-content">
                <ol>
                    <li>
                        <strong>Ensure Sufficient Funds:</strong> Before selecting any option, make sure you have enough
                        money in your account.
                    </li>
                    <li>
                        <strong>Bet Amount:</strong> Use the '+' to increase bet amount and '−' to decrease bet amount.
                        The minimum bet is 10 KSH.
                    </li>
                    <li>
                        <strong>Make A Selection:</strong> After placing your bet, choose between Rock, Paper, or
                        Scissors.
                    </li>
                    <li>
                        <strong>Results:</strong> After making a selection, the winner will be determined based on the
                        rules:
                        <ul>
                            <li>Rock beats Scissors</li>
                            <li>Scissors beats Paper</li>
                            <li>Paper beats Rock</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Collect Winnings:</strong> If you win, your winnings will be added to your account
                        balance. If you lose, your bet amount will be deducted.
                    </li>
                    <li>
                        <strong>Wins and Losses:</strong> at the top you will see updates on the number of wins,ties and
                        losses.
                    </li>
                    <li>
                        <strong>Keep playing to win:</strong> the more you play the higher your chances of winning..
                    </li>
                </ol>
                <p>If you have any other questions, please contact support.</p>
            </div>
            </div>
        </div>
    );
};
