import boundary from "../assets/img/lightening.png";
import {FC} from "react";
import {getImageFile, imageFiles} from "../utils/types.ts";

interface SelectionProps {
    Wins: number;
    Ties: number;
    Losses: number;
    isSelected: boolean;
    boltAppear: boolean;
    isShuffling: boolean;
    easeInOut: boolean;
    userResult: string ;
    userChoice: string;
    compResult: string;
    compChoice: string;
    handleClick: (choice: string) => void;
}

export const SelectionResults: FC<SelectionProps> = ({
                                                         isSelected,
                                                         Wins,
                                                         Ties,
                                                         Losses,
                                                         easeInOut,
                                                         boltAppear,
                                                         isShuffling,
                                                         userResult,
                                                         userChoice,
                                                         compResult,
                                                         compChoice,
                                                         handleClick
                                                     }) => {
    return (
        <div className="rps-content-right">
            <div className="titleContents">
                <div className="title-main">
                    <div>WIN</div>
                    <div>TIE</div>
                    <div>LOSS</div>
                </div>

                <div className="outcomes">
                    <div style={{color:`${Wins ? "#adff2f": "white"}`}}>{Wins}</div>
                    <div style={{color:`${Ties ? "#1e90ff": "white"}`}}>{Ties}</div>
                    <div style={{color:`${Losses ? "#b22222": "white"}`}}>{Losses}</div>
                </div>
            </div>

            <div className={`results ${isSelected ? 'userSelected' : ''}`}>
                <div className="user-prediction">
                    {userResult}
                    <img
                        className={`img-choice ${isShuffling ? 'rotate' : ''} ${easeInOut ? 'easeInOutAnimation' : ''}`}
                        src={userChoice} alt="your choice"/>
                </div>
                <div className="thunder">
                    <img
                        className={`thunder-bolt ${boltAppear ? 'thunder-appear' : ''}`}
                        src={boundary} alt="thunder bolt"/>
                </div>
                <div className="user-prediction">
                    {compResult}
                        <img
                        className={`img-choice ${isShuffling ? 'neg-rotate' : ''} ${easeInOut ? 'easeInOutAnimation' : ''}`}
                        src={compChoice} alt="computer choice"/>
                </div>
            </div>

            <div className="selection">
                {imageFiles.map((file) => (
                    <img
                        key={file.id}
                        className="selection-btn"
                        src={getImageFile(file.name)?.img || ''}
                        alt={file.name}
                        onClick={() => handleClick(file.name)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: file.id === 0 ? '#ed0000' :
                                file.id === 1 ? '#ffc400' :
                                    file.id === 2 ? '#0B63DCFF' : 'transparent'
                        }}
                    />
                ))}
            </div>
            <div className='select-to-play-text'>Select To Play</div>
        </div>
    );
}