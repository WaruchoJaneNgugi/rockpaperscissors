import {useCallback, useRef, useState} from 'react';
import { GameData } from "../utils/types.ts";

type UseWsReturnType = {
    connectSocket: () => void;
    isSocketOpen: () => boolean;
    sendData: (data: GameData) => void;
    getSocket: () => WebSocket | null;
    isConnected:boolean;
};

export const useWs = (): UseWsReturnType => {
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const connectSocket = useCallback(() => {
        if (ws.current && ws.current.readyState !== WebSocket.CLOSED) return;

        ws.current = new WebSocket('wss://lottomotto.co.ke/ws3');

        // You can still handle connection open and error events here if needed
        ws.current.onopen = () => {
            // console.log('Connection opened');
            setIsConnected(true)
        }
        ws.current.onerror = (e) => {
            console.log(e);
        }

        return () => {
            ws.current?.close();
        };
    }, []);

    const sendData = (data: GameData) => {
        const message = JSON.stringify(data);

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
            // console.log('Message sent:', message);
        } else {
            console.error('WebSocket is not open');
        }
    };

    const isSocketOpen = (): boolean => {
        return ws.current ? ws.current.readyState === WebSocket.OPEN : false;
    };

    const getSocket = () => ws.current;


    return {
        connectSocket,
        isSocketOpen,
        sendData,
        getSocket,
        isConnected
    };
};
