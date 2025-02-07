import React, { useRef } from "react";
import { Button } from "./Components/Button";
import { router } from "@inertiajs/react";
import HTMLFlipBook from 'react-pageflip';
import { useIsMobile } from "@/Hooks/useMediaQuery";
import { twMerge } from "tailwind-merge";
import { InfoMobile } from "./InfoMobile";
import { InfoDesktop } from "./InfoDekstop";

export default function Info({ }) {
    const book = useRef();

    const isMobile = useIsMobile()

    return (
        <div
            className={twMerge(
                "flex flex-col h-screen w-screen bg-cover bg-bottom items-center justify-center px-5",
                isMobile && "h-auto"
            )}
            style={{
                backgroundImage: "url('/assets/images/bg-1.jpg')"
            }}
        >
            <h1 className="text-5xl font-bounce text-white text-center z-50 mb-20">Informasi Permainan</h1>
            {isMobile ? (
                <InfoMobile/>
            ) : (
                <InfoDesktop/>
            )}
        </div>
    )
}
