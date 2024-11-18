import { router } from "@inertiajs/react";
import { Button } from "./Components/Button";

export default function Home({ }) {

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-top"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="flex flex-col justify-between z-50 h-full p-[5%]">
                <h1 className="text-5xl font-bounce text-white text-center">QUIZ SEJARAH DIPONEGORO</h1>
                <div className="flex flex-col items-center">
                    <Button
                        className="w-[100px] h-[100px] !rounded-full"
                        textClassName="text-3xl"
                        title="PLAY"
                        onClick={() => router.visit(route('player'))}
                    />
                </div>
                <div className="flex items-center justify-center gap-10">
                    <Button title="MATERI"/>
                    <Button title="RIWAYAT PERMAINAN" />
                    <Button title="INFO" />
                </div>
            </div>
        </div>
    )
}
