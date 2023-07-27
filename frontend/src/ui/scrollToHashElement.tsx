import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import formatHash from "../helpers/formatHash";

//react-router-dom package does not provide a hash link

const ScrollToHashElement: React.FC = () => {
    let location = useLocation();
    const [hashElement, setHashElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let hash = location.hash;

        if (hash) {
            let element = document.getElementById(formatHash(hash));

            setHashElement(element)
        } else {
            setHashElement(null);
        }

    }, [location]);

    useLayoutEffect(() => {
        hashElement?.scrollIntoView({
            behavior: "smooth",
            // block: "end",
            inline: "nearest",
        });
    }, [hashElement]);

    return <></>;
};

export default ScrollToHashElement;