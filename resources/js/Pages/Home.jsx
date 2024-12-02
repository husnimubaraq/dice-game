import { router } from "@inertiajs/react";
import { Button } from "./Components/Button";

export default function Home({ }) {

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            {/* <div className="absolute inset-0 bg-black/50" /> */}
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
                <div className="flex items-center justify-center gap-10 z-50">
                    <Button title="MATERI" onClick={() => router.visit(route('materi'))}/>
                    <Button title="INFO" />
                    <Button title="RIWAYAT PERMAINAN" onClick={() => router.visit(route('riwayat'))}/>
                    <Button title="PAPAN PERINGKAT" onClick={() => router.visit(route('leaderboard'))}/>
                </div>
                <div className="absolute bottom-0 -right-[20%] ">
                    <img
                        src="/assets/images/bg-diponegoro.png"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    )
}
