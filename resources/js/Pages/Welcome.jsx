import { Head, Link } from '@inertiajs/react';

import { Fragment, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Dice from "react-dice-roll";

gsap.registerPlugin(MotionPathPlugin);

import "./index.css"
// import { Map } from './Map'
import { CrossPath } from './CrossPath';
import { dataCross } from './Data';
import { Question } from './Question';

const POINT = 0.02

export default function Welcome({ }) {

    const [turn, setTurn] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const [players, setPlayers] = useState([
        {
            id: 0,
            prevPoint: 0.0,
            currentPoint: 0.0,
            currentIndex: 0,
            image: "/assets/images/character-1.png"
        },
        {
            id: 1,
            prevPoint: 0.0,
            currentPoint: 0.0,
            currentIndex: 0,
            image: "/assets/images/character-2.png"
        },
        {
            id: 2,
            prevPoint: 0.0,
            currentPoint: 0.0,
            currentIndex: 0,
            image: "/assets/images/character-3.png"
        },
        {
            id: 3,
            prevPoint: 0.0,
            currentPoint: 0.0,
            currentIndex: 0,
            image: "/assets/images/character-4.png"
        }
    ])

    const onResult = (value) => {
        setIsOpen(false)
        if(value.status){
            let newData = [...players]

            newData[turn] = {
                ...newData[turn],
                prevPoint: newData[turn].currentPoint,
                currentPoint: POINT * (newData[turn].currentIndex + value.point),
                currentIndex: newData[turn].currentIndex + value.point
            }

            setPlayers(newData)

        }else{
            let newData = [...players]

            const current = (newData[turn].currentIndex - value.point)

            if(current < 0){
                newData[turn] = {
                    ...newData[turn],
                    prevPoint: 0.0,
                    currentPoint: 0.0,
                    currentIndex: 0.0
                }

                setPlayers(newData)

                setTurn(previousVal => {
                    if (previousVal < newData.length - 1) {
                        return previousVal + 1;
                    }
                    return 0;
                });
            }else{
                newData[turn] = {
                    ...newData[turn],
                    prevPoint: newData[turn].currentPoint,
                    currentPoint: POINT * (newData[turn].currentIndex - value.point),
                    currentIndex: newData[turn].currentIndex - value.point
                }

                setPlayers(newData)
            }


        }
    }

    useEffect(() => {
        for (let i = 0; i < dataCross.length; i++) {
            gsap.to(`#div-cross-${i}`, {
                motionPath: {
                    path: "#path",
                    align: "#path",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                    start: POINT * (i + 1),
                    end: POINT * (i + 1),
                },
                transformOrigin: "50% 50%",
                duration: 0,
                ease: "power1.inOut",
            });
        }
    }, [dataCross])

    useEffect(() => {
        const player = players.find(x => x.id === turn)

        console.log('player: ', player)

        if (player) {
            gsap.to(`#div-${player.id}`, {
                motionPath: {
                    path: "#path",
                    align: "#path",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                    start: player.prevPoint,
                    end: player.currentPoint,
                },
                transformOrigin: "50% 50%",
                duration: 3,
                ease: "power1.inOut",
            });
        }
    }, [players])

    useEffect(() => {
        const cross = dataCross.find((_, i) => i === players[turn].currentIndex - 1)

        console.log('cross: ', cross)

        if (cross) {

            let newData = [...players]

            if (cross.type === "previous") {
                setTimeout(() => {
                    newData[turn] = {
                        ...newData[turn],
                        prevPoint: newData[turn].currentPoint,
                        currentPoint: POINT * (newData[turn].currentIndex - 1),
                        currentIndex: newData[turn].currentIndex - 1
                    }

                    setPlayers(newData)
                }, 3000)
            } else if (cross.type === "next") {
                setTimeout(() => {
                    newData[turn] = {
                        ...newData[turn],
                        prevPoint: newData[turn].currentPoint,
                        currentPoint: POINT * (newData[turn].currentIndex + 1),
                        currentIndex: newData[turn].currentIndex + 1
                    }

                    setPlayers(newData)
                }, 3000)
            } else if(cross.type === "question") {
                setTimeout(() => {
                    setIsOpen(true)
                }, 3000)
            } else {
                setTurn(previousVal => {
                    if (previousVal < players.length - 1) {
                        return previousVal + 1;
                    }
                    return 0;
                });
            }
        }
    }, [players])


    return (
        <>
            <Head title="Welcome" />
            <main className='flex flex-col h-screen w-screen relative overflow-hidden'>
                <img
                    src='/assets/images/bg-3.png'
                    className='w-full h-full object-contain'
                />
                {/* <Map
                    className="w-[2288px] h-[1668px]"
                /> */}
                {/* <div className='absolute -bottom-5 left-[30%]'>
                    <CrossPath
                        id="cross-0"
                        className="w-[983px] h-[775px] !text-[#FF6F00]"
                    />
                    <div id="div-cross">
                        <img
                            src='/assets/icons/question.png'
                            className='w-[100px] h-[100px] object-contain'
                        />
                    </div>
                </div> */}
                <div className='absolute -bottom-2 left-[30%]'>

                    <CrossPath
                        id="path"
                        className="w-[983px] h-[775px]"
                    />
                    {players.map((player) => (
                        <div key={player.id} id={`div-${player.id}`} className='z-30 absolute top-[5%] left-[30%] h-[50px] w-[50px]'>
                            <img
                                src={player.image}
                                className='w-[50px] h-[50px] object-contain'
                            />
                        </div>
                    ))}
                    {dataCross.map((item, index) => (
                        <Fragment key={index}>
                            <div id={`div-cross-${index}`} className='absolute top-[25%] left-[60%]'>
                                {item.icon ? (
                                    <img
                                        src={item.icon}
                                        className='w-[40px] h-[40px] object-contain'
                                    />
                                ) : (
                                    <div className='w-[40px] h-[40px] bg-yellow-100 rounded-full' />
                                )}
                            </div>
                        </Fragment>
                    ))}
                    <div className='absolute -top-[20%] right-0'>
                        <Dice
                            cheatValue={2}
                            onRoll={(value) => {
                                let newData = [...players]

                                const currentTurn = turn

                                newData[currentTurn] = {
                                    ...newData[currentTurn],
                                    prevPoint: newData[currentTurn].currentPoint,
                                    currentPoint: POINT * (newData[currentTurn].currentIndex + value),
                                    currentIndex: newData[currentTurn].currentIndex + value
                                }
                                setPlayers(newData)
                            }}
                            size={100}
                        />
                    </div>
                </div>
            </main>

            <Question
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onResult={onResult}
            />
        </>
    );
}
