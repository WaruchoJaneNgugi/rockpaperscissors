import ROCK from "../assets/img/ROCK.png";
import PAPER from "../assets/img/PAPER.png";
import SCISSORS from "../assets/img/SCISSORS.png";

export type GameData = {
    msisdn: string;
    amount: number;
    selection: string;
};

export type ResultData = {
    msisdn: string;
    winnings: string;
    selection: string;
    computer: string;
    message: string;
    Balance:string;
};

type ResultStateType = 'win' | 'lose' | 'draw' | 'insufficient';

export interface State {
    wins: number;
    losses: number;
    ties: number;
    resultState: ResultStateType;
    winnings: string;
}

type ImageFile= {
    id: number;
    name: string;
    img: string;
}

export const imageFiles: ImageFile[] = [
    { id: 0, name: 'ROCK', img: ROCK },
    { id: 1, name: 'PAPER', img: PAPER },
    { id: 2, name: 'SCISSORS', img: SCISSORS },
];

export const getImageFile = (value: number | string) => {
    if (!value) return undefined;
    return imageFiles.find(file =>
        file.id === value ||
        file.name === value ||
        file.img === value
    );
};

export const initialState: State = {
    wins: 0,
    losses: 0,
    ties: 0,
    resultState: 'insufficient',
    winnings: '0',
};