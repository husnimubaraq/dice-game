import { Head } from '@inertiajs/react';

import { Fragment, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Dice from "react-dice-roll";
import { CrossPath } from './CrossPath';
import { dataCross } from './Data';
import { Question } from './Question';

gsap.registerPlugin(MotionPathPlugin);

import "./index.css"
import { Winner } from './Winner';

const POINT = 0.03

export default function Welcome({ }) {

    const [turn, setTurn] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenWinner, setIsOpenWinner] = useState(false)
    const [winner, setWinner] = useState(null)

    const [scores, setScores] = useState([
        {
            id: 0,
            score: 0
        },
        {
            id: 1,
            score: 0
        },
        {
            id: 2,
            score: 0
        },
        {
            id: 3,
            score: 0
        }
    ])

    const [players, setPlayers] = useState([
        {
            id: 0,
            prevPoint: 0.0,
            name: "Player 1",
            currentPoint: 0.0,
            currentIndex: 0,
            image: "/assets/images/character-1.png"
        },
        {
            id: 1,
            prevPoint: 0.0,
            name: "Player 2",
            currentPoint: 0.0,
            currentIndex: 0,
            image: "/assets/images/character-2.png"
        },
        // {
        //     id: 2,
        //     prevPoint: 0.0,
        //     name: "Player 3",
        //     currentPoint: 0.0,
        //     currentIndex: 0,
        //     image: "/assets/images/character-3.png"
        // },
        // {
        //     id: 3,
        //     prevPoint: 0.0,
        //     name: "Player 4",
        //     currentPoint: 0.0,
        //     currentIndex: 0,
        //     image: "/assets/images/character-4.png"
        // }
    ])

    const onResult = (value) => {
        setIsOpen(false)

        let newData = [...players]
        let newScores = [...scores]

        if (value.status) {
            const nextIndex = (newData[turn].currentIndex + value.step)

            if (newData[turn].currentIndex === dataCross.length) {
                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + 100
                }

                setScores(newScores)
                setWinner({
                    player: newData[turn],
                    score: newScores[turn]
                })
                setIsOpenWinner(true)
                return
            } else if (nextIndex > dataCross.length) {
                const diff = Math.abs(nextIndex - dataCross.length)

                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + value.point
                }

                newData[turn] = {
                    ...newData[turn],
                    prevPoint: newData[turn].currentPoint,
                    currentPoint: POINT * (newData[turn].currentIndex + diff),
                    currentIndex: newData[turn].currentIndex + diff
                }
            } else {
                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + value.point
                }

                newData[turn] = {
                    ...newData[turn],
                    prevPoint: newData[turn].currentPoint,
                    currentPoint: POINT * nextIndex,
                    currentIndex: nextIndex
                }
            }

            setScores(newScores)
            setPlayers(newData)

        } else {
            newScores[turn] = {
                ...newScores[turn],
                score: newScores[turn].score < 0 ? 0 : newScores[turn].score - value.point
            }

            setScores(newScores)

            const current = (newData[turn].currentIndex - value.step)

            newData[turn] = {
                ...newData[turn],
                prevPoint: newData[turn].currentPoint,
                currentPoint: POINT * (newData[turn].currentIndex - value.step),
                currentIndex: newData[turn].currentIndex - value.step
            }

            setPlayers(newData)

            if (current < 1) {
                setTimeout(() => {
                    setTurn(previousVal => {
                        if (previousVal < newData.length - 1) {
                            return previousVal + 1;
                        }
                        return 0;
                    });
                }, 3000);
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

        if (cross) {

            let newData = [...players]
            let newScores = [...scores]

            if (cross.type === "previous") {
                setTimeout(() => {
                    newScores[turn] = {
                        ...newScores[turn],
                        score: newScores[turn].score - 3
                    }

                    setScores(newScores)

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
                    newScores[turn] = {
                        ...newScores[turn],
                        score: newScores[turn].score + 3
                    }

                    setScores(newScores)

                    newData[turn] = {
                        ...newData[turn],
                        prevPoint: newData[turn].currentPoint,
                        currentPoint: POINT * (newData[turn].currentIndex + 1),
                        currentIndex: newData[turn].currentIndex + 1
                    }

                    setPlayers(newData)
                }, 3000)
            } else if (cross.type === "question") {
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

    console.log('scores: ', scores)

    return (
        <>
            <Head title="Welcome" />
            <main className='flex flex-col h-screen w-screen relative overflow-hidden'>
                <img
                    src='/assets/images/bg-3.png'
                    className='w-full h-full object-contain'
                />
                <div className='absolute -bottom-2 left-[30%]'>

                    <CrossPath
                        id="path"
                        className="w-[983px] h-[775px] "
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
                            // cheatValue={5}
                            onRoll={(value) => {
                                let newData = [...players]

                                const nextIndex = (newData[turn].currentIndex + value)

                                if (nextIndex > dataCross.length) {
                                    const diff = Math.abs(nextIndex - (dataCross.length - 1))


                                    newData[turn] = {
                                        ...newData[turn],
                                        prevPoint: newData[turn].currentPoint,
                                        currentPoint: POINT * (newData[turn].currentIndex + diff),
                                        currentIndex: newData[turn].currentIndex + diff
                                    }
                                } else {
                                    newData[turn] = {
                                        ...newData[turn],
                                        prevPoint: newData[turn].currentPoint,
                                        currentPoint: POINT * nextIndex,
                                        currentIndex: newData[turn].currentIndex + value
                                    }
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
                data={dataCross.find((_, i) => i === players[turn].currentIndex - 1)}
            />

            <Winner
                isOpen={isOpenWinner}
                onCancel={() => setIsOpenWinner(false)}
                data={winner}
            />
        </>
    );
}
