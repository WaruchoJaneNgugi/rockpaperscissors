import { useEffect, useState } from 'react';

const usePreloadImages = (imageUrls: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        imageUrls.map((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === imageUrls.length) {
                    setLoaded(true);
                }
            };
            img.onerror = () => {
                // Even on error, count it to prevent blocking
                loadedCount++;
                if (loadedCount === imageUrls.length) {
                    setLoaded(true);
                }
            };
            return img;
        });
    }, [imageUrls]);

    return loaded;
};

export default usePreloadImages;
