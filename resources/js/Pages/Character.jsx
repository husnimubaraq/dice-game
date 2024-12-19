import { Fragment, useEffect, useState } from "react";
import { Button } from "./Components/Button";

import "./index.css"
import { router } from "@inertiajs/react";
import { twMerge } from "tailwind-merge";

export default function Character({ }) {

    const [players, setPlayers] = useState([])

    const [currentPlayer, setCurrentPlayer] = useState(0)

    const charactes = [
        "/assets/images/diponegoro2.png",
        "/assets/images/kyai-mojo.png",
        "/assets/images/sentot.png",
        "/assets/images/de-kock.png",
        "/assets/images/hendrik2.png",
    ]

    const onSelectCharacter = (value) => {
        const newPlayers = [...players]

        newPlayers[currentPlayer] = {
            ...newPlayers[currentPlayer],
            image: value
        }

        setPlayers(newPlayers)
    }

    const onChangeName = (value) => {
        const newPlayers = [...players]

        newPlayers[currentPlayer] = {
            ...newPlayers[currentPlayer],
            name: value
        }

        setPlayers(newPlayers)
    }

    useEffect(() => {
        let dataPlayers = localStorage.getItem('players')

        if(dataPlayers){
            dataPlayers = JSON.parse(dataPlayers)
            setPlayers(dataPlayers)
        }
    }, [])

    if(players.length === 0){
        return null
    }

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <div className="flex flex-col justify-between z-50 h-full p-[5%]">
                <h1 className="text-5xl text-white text-center font-bounce z-50">Player {currentPlayer + 1}</h1>
                <div className="flex flex-col items-center gap-[100px] z-50">
                    <div className="flex items-center justify-between gap-10">
                        <div
                            className="bg-cover h-[79px] w-[237px] flex flex-col justify-center px-3"
                            style={{
                                backgroundImage: "url('/assets/images/bg-input.png')"
                            }}
                        >
                            <input
                                type="text"
                                className="bg-transparent font-bounce border-none text-3xl text-white focus:border-transparent focus:ring-0"
                                value={players[currentPlayer].name}
                                onChange={(e) => onChangeName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-[50px]">
                        {charactes.map((item, index) => {
                            const characteActive = players.find(x => x.image === item)

                            return (
                                <Fragment key={index}>
                                    <div
                                        className="w-[150px] h-[150px] relative cursor-pointer"
                                        onClick={() => onSelectCharacter(item)}
                                    >
                                        <img
                                            src='/assets/images/bg-character.png'
                                            className='w-full h-full object-contain'
                                        />
                                        {characteActive?.name && (
                                            <div className="absolute -top-3 left-0 right-0 flex flex-col items-center">
                                                <div className="flex flex-col items-center bg-[#dbbe9d] rounded-md w-[90px] py-1 relative overflow-hidden">
                                                    <h1 className="font-bounce">{characteActive.name}</h1>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <img
                                                src={item}
                                                className={twMerge(
                                                    'w-[100px] h-[100px] object-contain',
                                                    characteActive && "opacity-50"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-10 z-50">
                    {currentPlayer > 0 ? (
                        <Button title="KEMBALI" onClick={() => setCurrentPlayer(currentPlayer - 1)}/>
                    ) : (
                        <Button title="KEMBALI" onClick={() => router.visit(route('player'))}/>
                    )}
                    <Button title="LANJUT" onClick={() => {
                        if(players.length - 1 === currentPlayer){
                            if(players[currentPlayer].name !== '' && players[currentPlayer].image !== ''){
                                const newPlayers = [...players]

                                const data = newPlayers.map((item) => ({
                                    ...item,
                                    prevPoint: 0.0,
                                    currentPoint: 0.0,
                                    currentIndex: 0,
                                }))

                                localStorage.setItem('players', JSON.stringify(data))

                                router.visit(route('play'))
                            }
                        }else{
                            if(players[currentPlayer].name !== '' && players[currentPlayer].image !== ''){
                                setCurrentPlayer(currentPlayer + 1)
                            }else{
                                console.log('ERROR')
                            }
                        }
                    }} />
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
