import { useEffect, useState } from "react";

export const useTypingEffect = (text: string | null, speed = 30, noAnimation = false) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!text) {
            setDisplayed("");
            return;
        }

        if (noAnimation) {
            setDisplayed(text);
            return;
        }

        let i = 0;
        setDisplayed("");

        const interval = setInterval(() => {
            const nextChar = text[i];
            setDisplayed((prev) => {
                return prev + nextChar;
            });

            if (i >= text.length - 1) {
                clearInterval(interval);
            }
            i++;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, noAnimation]);

    return displayed;
};
