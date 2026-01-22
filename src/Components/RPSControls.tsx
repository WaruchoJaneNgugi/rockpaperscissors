import {Dispatch, FC, SetStateAction} from "react";
// import {RPSHistory} from "./RPSHistory.tsx";

interface rpsControlProps {
    handleBetAmount:(amount:number) =>void;
    onSetBetAmount:Dispatch<SetStateAction<number>>;
    betAmount:number;
}

export const RPSControl:FC<rpsControlProps> =({handleBetAmount,onSetBetAmount,betAmount})=>{

    return (
        <div className="rps-content-left">
            <div className="rps-position-bottom">
                <span className="text-rps-amount">Bet Amount</span>
                <div className="rps-controls">
                    <div className="rps-controls-shortbet">
                        {[20, 50, 100, 500, 1000].map((amount) => (
                            <div
                                key={amount}
                                className={`rps-control-btn ${amount===betAmount ? "rps-control-btn-selected":""} `}
                                onClick={() => handleBetAmount(amount)}
                            >
                                {amount}
                            </div>
                        ))}
                    </div>
                    <div className="rps-bet-controls">
                        <div className="rps-control-btn-plus-minus" aria-label="Decrease"
                             onClick={() => onSetBetAmount(prev => Math.max(prev - 10, 20))}>
                            -
                        </div>
                        <input
                            className="rps-input-box"
                            value={betAmount}
                            min={20}
                            max={1000}
                            step={10}
                            onChange={(e)=>
                                onSetBetAmount(
                                    Math.min(
                                        Math.max(Math.round(Number(e.target.value) / 10) * 10, 20),
                                        1000
                                    )
                                )
                        }
                        />
                        <div className="rps-control-btn-plus-minus" aria-label="Increase"
                             onClick={() => onSetBetAmount(prev => Math.min(prev + 10, 1000))}>
                            +
                        </div>
                    </div>
                </div>
            </div>
                {/*<div className="mines-bet-history-overlay">*/}
                {/*    <RPSHistory />*/}
                {/*</div>*/}


        </div>
    );}