import React, { useRef } from "react";
import { Button } from "./Components/Button";
import { router } from "@inertiajs/react";
import HTMLFlipBook from 'react-pageflip';
import { useIsMobile } from "@/Hooks/useMediaQuery";
import { MateriMobile } from "./MateriMobile";
import { MateriDesktop } from "./MateriDesktop";

export default function Materi({ }) {
    const book = useRef();

    const isMobile = useIsMobile()

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom items-center justify-center px-5"
            style={{
                backgroundImage: "url('/assets/images/bg-1.jpg')"
            }}
        >
            <h1 className="text-5xl font-bounce text-white text-center z-50 mb-20">Materi</h1>
            {isMobile ? (
                <MateriMobile />
            ) : (
                <MateriDesktop />
            )}

        </div>
    )
}
