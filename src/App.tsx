import RPSPoster from "./assets/img/rps banner.png";
import GTLogo from "./assets/img/greatech_logo.png";
import {useEffect, useState} from "react";
import {MainGamePage} from "./Components/MainGamePage.tsx";

function App() {
    const [rpsProgress, setRpsProgress] = useState<number>(0);
    const [rpsLoading, setRpsLoading] = useState<boolean>(true);

    useEffect(() => {
        const rpsImageModules = import.meta.glob('./assets/img/*.png', {eager: true, import: 'default'});

        const rpsAssets = Object.values(rpsImageModules) as string[];
        let loadedRpsAssets = 0;

        const loadRpsAssets = (src: string) => {
            return new Promise<void>((resolve) => {
                const RpsImage = new Image();
                RpsImage.src = src;
                RpsImage.onload = () => {
                    loadedRpsAssets++;
                    setRpsProgress(Math.floor((loadedRpsAssets / rpsAssets.length) * 100));
                    resolve();
                };
            })
        };

        Promise.all(rpsAssets.map(loadRpsAssets)).then(() => {
            setTimeout(() => {
                setRpsLoading(false);
            }, 2000);
        });
    }, []);
    return (
        <>
            {rpsLoading ? (
                <div className="loading-screen">
                    <img src={RPSPoster} alt="rps-poster" className="rps-poster"/>
                    <div className="loading-container">
                        <img src={GTLogo} alt="Logo" className="gt-logo"/>
                        <div className="progress-bar">
                            <div className="progress-content" style={{width: `${rpsProgress}%`}}></div>
                        </div>
                        <p>Loading... {Math.round(rpsProgress)}</p>
                    </div>
                </div>
            ) : (
            <MainGamePage/>
            )}
        </>
    );
}

export default App;
