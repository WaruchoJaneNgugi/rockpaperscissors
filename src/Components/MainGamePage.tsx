import {useEffect, useState, useCallback} from 'react';
import '../assets/MainGame.css';
import {useWs} from "../Socket/socket";
import {GameData, getImageFile, initialState, ResultData, State} from '../utils/types';
import shuffleImgUser from "../assets/img/rock2.png";
import shuffleImgComp from "../assets/img/ROCK.png";
import {RPSControl} from "./RPSControls.tsx";
import {SelectionResults} from "./SelectionResults.tsx";
import {useRPSSound} from "../Hooks/useRPSound.ts";
import gameSettings from "../assets/img/settings.png";
import closeSettings from "../assets/img/close.png";
import RpsLogo from "../assets/img/tittle2.png";
import {HowToPlay} from "./HowToPlay.tsx";
import {RpsSettingsDialog} from "./RpsSettingDialog.tsx";

export const MainGamePage = () => {
    const [state, setState] = useState<State>(initialState);
    const {sendData, getSocket, connectSocket, isConnected} = useWs();
    const [uiState, setUIState] = useState({
        showDropdown: false,
        showHelpOverlay: false,
        isSelected: false,
        isShuffling: false,
        easeInOut: false,
        boltAppear: false,
        isModalOpen: false
    });
    const [betAmount, setBetAmount] = useState(20);
    const [userChoice, setUserChoice] = useState<string>(shuffleImgUser);
    const [compChoice, setCompChoice] = useState<string>(shuffleImgComp);
    const [userResult, setUserResult] = useState<string>("");
    const [compResult, setCompResult] = useState<string>("");
    const gapStyle = uiState.isShuffling ? '25px' : (uiState.isSelected ? '0px' : '25px');
    const [result, setResult] = useState<ResultData | null>(null);
    const [timer, setTimer] = useState(3);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const [rpsBalance, setRpsBalance] = useState<string>("---");
    const {playRpsSound, playShuffleLoop} = useRPSSound(isMuted, true)
    const updateUIState = useCallback((updates: Partial<typeof uiState>) => {
        setUIState(prevState => ({...prevState, ...updates}));
    }, []);

    useEffect(() => {
        connectSocket();
    }, [connectSocket]);
    const handleBetAmount = (amount: number) => setBetAmount(amount);
    const resetGap = useCallback(() => {
        updateUIState({
            isSelected: true,
            isShuffling: false,
        });
    }, [updateUIState]);

    const handleClick = useCallback(async (choice: string) => {
        if (!isConnected) return;
        if (uiState.isShuffling) return;
        playRpsSound("clickAudio");
        const userImageFileSelect = getImageFile(choice);
        if (!userImageFileSelect) {
            console.error("Invalid user choice:", choice);
            return;
        }

        updateUIState({isSelected: true, isShuffling: true, easeInOut: false});
        setUserChoice(shuffleImgUser);
        setUserResult('');
        setCompResult('');
        setCompChoice(shuffleImgComp);
        updateUIState({boltAppear: true});
        playShuffleLoop();

        setTimeout(() => {
            updateUIState({
                easeInOut: true,
                isShuffling: false,
                boltAppear: false
            });
            resetGap();
            const queryParams = new URLSearchParams(window.location.search);
            const sess = queryParams.get("sess") || " ";
            const gameData: GameData = {
                msisdn: sess,
                amount: betAmount,
                selection: userImageFileSelect.name,
            };
            sendData(gameData);
        }, 4000);
    }, [isConnected, uiState.isShuffling, playRpsSound, updateUIState, playShuffleLoop, resetGap, betAmount, sendData]);


    useEffect(() => {
        const socket = getSocket();
        if (socket) {
            socket.onmessage = async (event: { data: string }) => {
                try {
                    if (!event.data.trim().startsWith('{')) return;
                    const receivedData: ResultData = JSON.parse(event.data);
                    setResult(receivedData);
                    setRpsBalance(receivedData.Balance);
                    // console.log("WebSocket received:", event.data);
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            };
        }
        return () => {
            if (socket) socket.onmessage = null;
        };
    }, [getSocket]);

    useEffect(() => {
        if (result) {
            if (!result?.computer || !result?.selection) {
                return;
            }
            const userImageFile = getImageFile(result.selection);
            const compImageFile = getImageFile(result.computer);

            if (userImageFile) {
                setUserChoice(userImageFile.img);
                setUserResult(result.selection);
            }
            if (compImageFile) {
                setCompChoice(compImageFile.img);
                setCompResult(result.computer);
            }
        }

        if (result?.computer && result?.selection) {
            const userImageFile = getImageFile(result.selection);
            const compImageFile = getImageFile(result.computer);

            if (userImageFile && compImageFile) {
                setUserChoice(userImageFile.img);
                setUserResult(result.selection);
                setCompChoice(compImageFile.img);
                setCompResult(result.computer);
            }

            switch (result.message) {
                case 'You Won':
                    setState(prev => ({
                        ...prev,
                        wins: prev.wins + 1,
                    }));
                    playRpsSound("winAudio");
                    break;
                case 'You Lost':
                    setState(prevState => ({
                        ...prevState,
                        losses: prevState.losses + 1,
                    }));
                    playRpsSound("loseAudio");
                    break;
                case "It's a Draw":
                    setState(prevState => ({
                        ...prevState,
                        ties: prevState.ties + 1,
                    }));
                    playRpsSound("drawAudio");
                    break;
                default:
                    console.warn("Unexpected result message:", result.message);
                    break;
            }

            setTimeout(() => {
                updateUIState({isModalOpen: true});
            }, 1000);

        }
    }, [playRpsSound, result, updateUIState]);

    useEffect(() => {
        if (uiState.isModalOpen) {
            setTimer(3);

            const id = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setResult(null);
                        updateUIState({isModalOpen: false});
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(id);
        }
    }, [uiState.isModalOpen, updateUIState]);

    return (
        <div className="Main-Game-layout" style={{gap: gapStyle}}>
            <div className="rps-main-game-container">
                <div className="game-info-snd">
                    <div className="game-info-left">
                        {isSettingsOpen ? (
                            <img
                                className="game-info-snd-icon"
                                src={closeSettings}
                                alt="game-info-close-settings"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSettingsOpen(false);
                                }}
                            />
                        ) : (
                            <img className="game-info-snd-icon" src={gameSettings} alt="game-info-settings"
                                 onClick={() => setIsSettingsOpen(true)
                                 }/>
                        )}
                    </div>
                    <img className="rps-logo" src={RpsLogo} alt="rps-logo"/>

                    <div className="game-info-right">
                        <span className="bal">Balance</span>
                        <span className="bal-int">{rpsBalance || '---'}</span>
                    </div>

                </div>
                {isSettingsOpen && (
                    <RpsSettingsDialog
                        OnHelpOpen={setIsHelpOpen}
                        isMuted={isMuted}
                        onMuteToggle={setIsMuted}
                        OnSettingsOpen={setIsSettingsOpen}/>
                )}

                <SelectionResults
                    Wins={state.wins}
                    Ties={state.ties}
                    Losses={state.losses}
                    isSelected={uiState.isSelected}
                    boltAppear={uiState.boltAppear}
                    isShuffling={uiState.isShuffling}
                    easeInOut={uiState.easeInOut}
                    userResult={userResult}
                    userChoice={userChoice}
                    compResult={compResult}
                    compChoice={compChoice}
                    handleClick={handleClick}
                />
                <RPSControl
                    handleBetAmount={handleBetAmount}
                    onSetBetAmount={setBetAmount}
                    betAmount={betAmount}
                />
            </div>

            {isHelpOpen && (
                <div className="rps-overlay">
                    <div className="rps-overlay-content">
                        <HowToPlay onClose={() => setIsHelpOpen(false)}/>
                    </div>
                </div>
            )}

            {uiState.isModalOpen && (
                <div className="rps-frm-overlay">
                    <div className="rps-frm-content">
                        <div className="timer-rps">{timer}</div>
                        <div className='modal-header'>
                            <h1 className={`${result?.message === "You Lost" ? "Lost-color" :
                                (result?.message === "You Won" ? "Win-color" :
                                    (result?.message === "It's a Draw" ? "Draw-color" : ""))
                            }`}>
                                {result?.message}</h1>
                            <div className='rps-modal-text-content'>
                                {result?.message === 'You Won' ? (
                                    <>
                                        <span>You won: </span>
                                        <span>{result.winnings|| 0}</span>
                                    </>
                                    ) : (
                                    <span>Try again !!</span>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

