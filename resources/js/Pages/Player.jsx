import { Fragment, useState } from "react";
import { Button } from "./Components/Button";
import { router } from "@inertiajs/react";

export default function Player({ }) {

    const [players, setPlayers] = useState([
        {
            id: 0,
            name: "",
            image: ""
        },
        {
            id: 1,
            name: "",
            image: ""
        },
    ])

    const onSelectTotal = (number) => {
        const newPlayers = []

        for(let i = 0; i < number; i++){
            newPlayers.push({
                id: i,
                name: "",
                image: ""
            })
        }

        setPlayers(newPlayers)
    }

    const onNext = () => {
        localStorage.setItem('players', JSON.stringify(players))
        router.visit(route('character'))
    }

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-top"
            style={{
                backgroundImage: "url('/assets/images/bg-home-2.jpeg')"
            }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="flex flex-col justify-between z-50 h-full p-[5%]">
                <h1 className="text-5xl font-bounce text-white text-center">Tentukan berapa banyak player</h1>
                <div className="flex flex-col items-center gap-10">
                    <h1 className="text-5xl font-bounce text-white text-center">Total Player</h1>
                    <div className="flex items-center gap-10">
                        <Button
                            className="w-[70px] h-[70px] !rounded-full"
                            textClassName="text-3xl"
                            title="2"
                            onClick={() => onSelectTotal(2)}
                            active={players.length === 2}
                        />
                        <Button
                            className="w-[70px] h-[70px] !rounded-full"
                            textClassName="text-3xl"
                            title="3"
                            onClick={() => onSelectTotal(3)}
                            active={players.length === 3}
                        />
                        <Button
                            className="w-[70px] h-[70px] !rounded-full"
                            textClassName="text-3xl"
                            title="4"
                            onClick={() => onSelectTotal(4)}
                            active={players.length === 4}
                        />
                        <Button
                            className="w-[70px] h-[70px] !rounded-full"
                            textClassName="text-3xl"
                            title="5"
                            onClick={() => onSelectTotal(5)}
                            active={players.length === 5}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-10">
                    <Button title="HOME" onClick={() => router.visit(route('home'))} />
                    <Button title="LANJUT" onClick={onNext} />
                </div>
            </div>
        </div>
    )
}
