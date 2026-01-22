import {useCallback, useEffect, useMemo, useState} from "react";
import winSnd from "../RPS-Sound/win.mp3";
import lossSnd from "../RPS-Sound/lost.mp3";
import drawSnd from "../RPS-Sound/tie.wav";
import clickSnd from "../RPS-Sound/select.mp3";
import shuffleSnd from "../RPS-Sound/shuffling.mp3";

export const useAudioControl = () => {
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const audioInstances = useMemo(() => {
        const winAudio = new Audio(winSnd);
        const loseAudio = new Audio(lossSnd);
        const drawAudio = new Audio(drawSnd);
        const clickAudio = new Audio(clickSnd);
        const shuffleAudio = new Audio(shuffleSnd);
        shuffleAudio.loop = true;

        return {winAudio, loseAudio, drawAudio, clickAudio, shuffleAudio};
    }, []);

    const playSound = useCallback(
        (sound: HTMLAudioElement) => {
            if (!isMuted) {
                Object.values(audioInstances).forEach(audio => {
                    audio.pause();
                    audio.currentTime = 0;
                });
                sound.play().catch(error => {
                    if (error.name === 'NotAllowedError') {
                        // console.warn('User interaction required for audio playback.');
                    } else {
                        // console.error('Error playing sound:', error);
                    }
                });
            }
        },
        [isMuted, audioInstances]
    );

    useEffect(() => {
        return () => {
            audioInstances.shuffleAudio.pause();
            audioInstances.shuffleAudio.currentTime = 0;
        };
    }, [audioInstances.shuffleAudio]);

    return {
        isMuted,
        setIsMuted,
        audioInstances,
        playSound
    };
};
