import {useCallback, useEffect, useMemo} from "react";
import winSnd from "../RPS-Sound/win.mp3";
import lossSnd from "../RPS-Sound/lost.mp3";
import drawSnd from "../RPS-Sound/tie.wav";
import clickSnd from "../RPS-Sound/select.mp3";
import backgrounSnd from "../RPS-Sound/rpsbackground.mp3";
import shuffleSnd from "../RPS-Sound/shuffling.mp3";

export const useRPSSound = (isMuted: boolean, loop: boolean) => {
    const audioRPSInstances = useMemo(() => {
        return {
            winAudio: new Audio(winSnd),
            loseAudio: new Audio(lossSnd),
            drawAudio: new Audio(drawSnd),
            clickAudio: new Audio(clickSnd),
            shuffleAudio: (() => {
                const audio = new Audio(shuffleSnd);
                audio.loop = true;
                return audio;
            })(),
        };
    }, []);

    const RPSbackgroundSound = useMemo(() => {
        const bgSound = new Audio(backgrounSnd);
        bgSound.loop = loop;
        return bgSound;
    }, [loop]);

    useEffect(() => {
        if (!isMuted) {
            RPSbackgroundSound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    // console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        }

        return () => {
            RPSbackgroundSound.pause();
            RPSbackgroundSound.currentTime = 0;
        };
    }, [RPSbackgroundSound, isMuted]);

    const playShuffleLoop = useCallback(() => {
        if (isMuted) return;
        const shuffleSound = audioRPSInstances.shuffleAudio;
        shuffleSound.currentTime = 0;
        shuffleSound.play();

        const interval = setInterval(() => {
            shuffleSound.currentTime = 0;
            shuffleSound.play();
        }, shuffleSound.duration * 1000);

        setTimeout(() => {
            clearInterval(interval);
            shuffleSound.pause();
            shuffleSound.currentTime = 0;
        }, 4000);
    }, [audioRPSInstances, isMuted]);

    const playRpsSound = useCallback(
        (soundKey: keyof typeof audioRPSInstances) => {
            if (isMuted) return;

            const sound = audioRPSInstances[soundKey];
            sound.currentTime = 0;
            sound.play().catch((err) => {
                if (err.name === "NotAllowedError") {
                    console.warn("User interaction required for audio playback.");
                }
            });

        },
        [audioRPSInstances, isMuted]
    );
    return {playRpsSound,playShuffleLoop};
};