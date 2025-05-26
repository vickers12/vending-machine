import { useEffect, useState } from "react";

export const useContainerHeight = (
    ref: React.RefObject<HTMLElement | null>,
    debounceDelay = 300
) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!ref?.current) return;

        let timeoutId: ReturnType<typeof setTimeout>;

        const updateHeight = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (ref.current) {
                    setHeight(ref.current.offsetHeight);
                }
            }, debounceDelay);
        };

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(ref.current);
        updateHeight();

        return () => {
            clearTimeout(timeoutId);
            resizeObserver.disconnect();
        };
    }, [ref, debounceDelay]);

    return height;
};
