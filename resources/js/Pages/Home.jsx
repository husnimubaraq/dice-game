import { router } from "@inertiajs/react";
import { Button } from "./Components/Button";
import useSound from "use-sound";
import { useEffect } from "react";
import { useIsMobile } from "@/Hooks/useMediaQuery";
import { twMerge } from "tailwind-merge";

export default function Home({ }) {

    const [play, exposedData] = useSound('/assets/sounds/background.mp3')

    const isMobile = useIsMobile()

    useEffect(() => {
        play()
    }, [play])

    return (
        <div
            className={twMerge(
                "flex flex-col h-screen w-screen bg-cover bg-bottom",
                isMobile && ""
            )}
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <div className="flex flex-col justify-between z-50 h-full p-[5%]">
                <h1 className="text-5xl font-bounce text-white text-center z-50">QUIZ SEJARAH DIPONEGORO</h1>
                <div className="flex flex-col items-center z-50">
                    <Button
                        className="w-[100px] h-[100px] !rounded-full"
                        textClassName="text-3xl"
                        title="PLAY"
                        onClick={() => router.visit(route('player'))}
                    />
                </div>
                {isMobile ? (
                    <div className="grid grid-cols-2 gap-10 z-50">
                        <Button title="MATERI" onClick={() => router.visit(route('materi'))}/>
                        <Button title="INFO" onClick={() => router.visit(route('info'))}/>
                        <Button title="RIWAYAT PERMAINAN" textClassName="text-sm text-center" onClick={() => router.visit(route('riwayat'))} />
                        <Button title="PAPAN PERINGKAT" textClassName="text-sm" onClick={() => router.visit(route('leaderboard'))} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-10 z-50">
                        <Button title="MATERI" onClick={() => router.visit(route('materi'))}/>
                        <Button title="INFO" onClick={() => router.visit(route('info'))}/>
                        <Button title="RIWAYAT PERMAINAN" textClassName="" onClick={() => router.visit(route('riwayat'))}/>
                        <Button title="PAPAN PERINGKAT" textClassName="" onClick={() => router.visit(route('leaderboard'))}/>
                    </div>
                )}
                <div className="absolute bottom-0 -right-[20%] ">
                    <img
                        src="/assets/images/bg-diponegoro.png"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
            {isMobile && <div className="absolute inset-0 h-[200px] w-full bg-gradient-to-b from-black/50 to-nuetral-300 z-[40]" />}
        </div>
    )
}
