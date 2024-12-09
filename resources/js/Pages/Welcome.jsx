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
import dayjs from 'dayjs';

const POINT = 0.03

export default function Welcome({ }) {

    const [turn, setTurn] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenWinner, setIsOpenWinner] = useState(false)
    const [winner, setWinner] = useState(null)
    const [logs, setLogs] = useState([])

    const [scores, setScores] = useState([])

    const [players, setPlayers] = useState([])

    const onTimeout = () => {
        let newData = [...players]

        newData[turn] = {
            ...newData[turn],
            prevPoint: newData[turn].currentPoint,
            currentPoint: POINT * (newData[turn].currentIndex - 1),
            currentIndex: newData[turn].currentIndex - 1
        }

        setPlayers(newData)
    }

    const onResult = (value) => {
        setIsOpen(false)

        let newData = [...players]
        let newScores = [...scores]

        if (value.status) {
            const nextIndex = (newData[turn].currentIndex + value.step)

            if (newData[turn].currentIndex === dataCross.length) {
                const point = value.point

                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + point
                }

                const dataLogs = [
                    `${newData[turn].name} mendapatkan ${point} nilai`
                    `${newData[turn].name} total nilai : ${(newScores[turn].score)}`
                ]

                const dataLog = [
                    ...logs,
                    ...dataLogs
                ]

                setLogs(dataLog)

                setScores(newScores)
                const dataFinal = {
                    player: newData[turn],
                    score: newScores[turn]
                }
                setWinner(dataFinal)

                let dataHistories = localStorage.getItem('histories')

                if(dataHistories){
                    dataHistories = JSON.parse(dataHistories)
                    dataHistories.push({
                        winner: dataFinal,
                        logs: dataLog,
                        data: newScores,
                        id: new Date().getTime(),
                        date: dayjs().format("DD MMMM YYYY h:mm")
                    })
                    localStorage.setItem('histories', JSON.stringify(dataHistories))
                }else{
                    localStorage.setItem('histories', JSON.stringify([
                        {
                            winner: dataFinal,
                            logs: dataLog,
                            data: newScores,
                            id: new Date().getTime(),
                            date: dayjs().format("DD MMMM YYYY h:mm")
                        }
                    ]))
                }
                setIsOpenWinner(true)
                return
            } else if (nextIndex > dataCross.length) {
                const diff = Math.abs(nextIndex - dataCross.length)

                const point = value.point

                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + point
                }

                const dataLogs = [
                    `${newData[turn].name} mendapatkan ${point} nilai`
                    `${newData[turn].name} total nilai : ${(newScores[turn].score)}`
                ]

                setLogs([
                    ...logs,
                    ...dataLogs
                ])

                newData[turn] = {
                    ...newData[turn],
                    prevPoint: newData[turn].currentPoint,
                    currentPoint: POINT * (newData[turn].currentIndex + diff),
                    currentIndex: newData[turn].currentIndex + diff
                }
            } else {
                const point = value.point

                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + point
                }

                const dataLogs = [
                    `${newData[turn].name} mendapatkan ${point} nilai`,
                    `${newData[turn].name} total nilai : ${(newScores[turn].score)}`
                ]

                setLogs([
                    ...logs,
                    ...dataLogs
                ])

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
            const point = value.point

            const score = newScores[turn].score < 0 ? 0 : newScores[turn].score - point

            newScores[turn] = {
                ...newScores[turn],
                score: score
            }

            const dataLogs = [
                `${newData[turn].name} berkurang ${point} nilai`,
                `${newData[turn].name} total nilai : ${(newScores[turn].score)}`
            ]

            setLogs([
                ...logs,
                ...dataLogs
            ])

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
        let dataPlayers = localStorage.getItem('players')

        if (dataPlayers) {
            dataPlayers = JSON.parse(dataPlayers)
            const dataScores = []
            for (let item of dataPlayers) {
                dataScores.push({
                    id: item.id,
                    name: item.name,
                    score: 0,
                    image: item.image
                })
            }
            setScores(dataScores)
            setPlayers(dataPlayers)
        }
    }, [])

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
        if (players.length > 0) {
            const cross = dataCross.find((_, i) => i === players[turn].currentIndex - 1)

            if (cross) {

                let newData = [...players]
                let newScores = [...scores]

                if (cross.type === "previous") {
                    setTimeout(() => {
                        // newScores[turn] = {
                        //     ...newScores[turn],
                        //     score: newScores[turn].score - 3
                        // }

                        // setLogs([
                        //     ...logs,
                        //     `Player ${newData[turn].name} nilai berkurang : ${(newScores[turn].score)}`
                        // ])

                        // setScores(newScores)

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
                        // newScores[turn] = {
                        //     ...newScores[turn],
                        //     score: newScores[turn].score + 3
                        // }

                        // setLogs([
                        //     ...logs,
                        //     `Player ${newData[turn].name} nilai bertambah : ${(newScores[turn].score)}`
                        // ])

                        // setScores(newScores)

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
        }
    }, [players])

    const logsFilterred = logs.slice(logs.length > 5 ? logs.length - 5 : 0, logs.length > 5 ? logs.length : 5).reverse()

    return (
        <>
            <Head title="Welcome" />
            <main className='flex flex-col h-screen w-screen relative overflow-hidden'>
                <img
                    src='/assets/images/bg-4.png'
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
                    <div className='absolute left-0 -top-[22%] z-[30]'>
                        <div className="w-[358px] h-[261px] relative">
                            <img
                                src='/assets/images/bg-info-2.png'
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 z-50'>
                                <div className='flex flex-col-reverse gap-3 relative overflow-hidden px-12 h-[200px] mt-3'>
                                    {logsFilterred.map((item, index) => (
                                        <Fragment key={index}>
                                            <p>{item}</p>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {players.length > 0 && (
                        <div className='absolute -left-[20%] -top-[20%]'>
                            <div
                                className="w-[150px] h-[150px] relative"
                            >
                                <img
                                    src='/assets/images/bg-character.png'
                                    className='w-full h-full object-contain'
                                />
                                <div className="absolute -top-3 left-0 right-0 flex flex-col items-center">
                                    <div className="flex flex-col items-center bg-[#dbbe9d] rounded-md w-[90px] py-1 relative overflow-hidden">
                                        <h1 className="font-bounce">{players[turn].name}</h1>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <img
                                        src={players[turn].image}
                                        className='w-[100px] h-[100px] object-contain'
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='absolute -top-[20%] right-0'>
                        <Dice
                            cheatValue={5}
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

            {players.length > 0 && (
                <Question
                    isOpen={isOpen}
                    onCancel={() => setIsOpen(false)}
                    onResult={onResult}
                    data={dataCross.find((_, i) => i === players[turn].currentIndex - 1)}
                    onTimeout={onTimeout}
                />
            )}

            <Winner
                isOpen={isOpenWinner}
                onCancel={() => setIsOpenWinner(false)}
                data={winner}
            />
        </>
    );
}
