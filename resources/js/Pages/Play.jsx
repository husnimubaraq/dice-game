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
import axios from 'axios';
import { useIsMobile } from '@/Hooks/useMediaQuery';
import { twMerge } from 'tailwind-merge';

const POINT = 0.03

const zoomPlayer = (playerId) => {
    const box = document.getElementById(`div-${playerId}`);
    const map = document.getElementById("map");

    const boxRect = box.getBoundingClientRect();
    const mapRect = map.getBoundingClientRect();

    const offsetX = boxRect.left - mapRect.left;
    const offsetY = boxRect.top - mapRect.top;

    const scale = 1.5;

    gsap.to(map, {
        duration: 3,
        scale: scale,
        x: -offsetX * scale + mapRect.width / 2 - (boxRect.width / 2) * scale,
        y: -offsetY * scale + mapRect.height / 2 - (boxRect.height / 2) * scale,
        transformOrigin: "top left",
        ease: "power2.out",
        onComplete: () => {
            gsap.to(map, {
                duration: 1,
                scale: 1,
                x: 0,
                y: 0,
                transformOrigin: "top left",
                ease: "power2.out",
            });

        }
    });
}

export default function Welcome({ }) {

    const isMobile = useIsMobile()

    const [isLandscape, setIsLandscape] = useState(false)

    const [turn, setTurn] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenWinner, setIsOpenWinner] = useState(false)
    const [isInit, setIsInit] = useState(true)
    const [winner, setWinner] = useState(null)
    const [logs, setLogs] = useState([])

    const [scores, setScores] = useState([])
    const [historyQuestion, setHistoryQuestion] = useState([])

    const [players, setPlayers] = useState([])

    const onTimeout = () => {
        let newData = [...players]

        newData[turn] = {
            ...newData[turn],
            prevPoint: newData[turn].currentPoint,
            currentPoint: POINT * (newData[turn].currentIndex - 1),
            currentIndex: newData[turn].currentIndex - 1
        }

        zoomPlayer(newData[turn].id)

        setPlayers(newData)
    }

    const onResult = async (value) => {

        setIsOpen(false)

        let newData = [...players]
        let newScores = [...scores]
        let newHistoryQuestions = [...historyQuestion]

        if (value.status) {
            const dataHistoryQuestion = [
                ...newHistoryQuestions,
                {
                    ...value.question,
                    player: {
                        id: newData[turn].id,
                        name: newData[turn].name,
                    }
                }
            ]

            setHistoryQuestion(dataHistoryQuestion)

            const nextIndex = (newData[turn].currentIndex + value.step)

            if (newData[turn].currentIndex === dataCross.length) {
                const point = value.point

                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + point
                }

                const dataLogs = [
                    `${newData[turn].name} mendapatkan ${point} score`,
                    `${newData[turn].name} total score : ${(newScores[turn].score)}`
                ]

                const dataLog = [
                    ...logs,
                    ...dataLogs
                ]

                setLogs(dataLog)

                const newDatas = dataHistoryQuestion.filter(x => x.player.id === newData[turn].id)
                const countFirst = newDatas.filter(x => x.no <= 5)
                const countSecond = newDatas.filter(x => x.no >= 6 && x.no <= 10)
                const countThird = newDatas.filter(x => x.no >= 11 && x.no <= 15)

                const finalScore = [
                    countFirst.length > 0 ? countFirst[0].point * countFirst.length : 0,
                    countSecond.length > 0 ? countSecond[0].point * countSecond.length : 0,
                    countThird.length > 0 ? countThird[0].point * countThird.length : 0,
                ].reduce((a, b) => a + b)

                newScores[turn] = {
                    ...newScores[turn],
                    score: finalScore
                }

                setScores(newScores)

                const dataFinal = {
                    player: newData[turn],
                    score: newScores[turn],
                }

                setWinner(dataFinal)

                const { data } = await axios.post(route('histories.store'), {
                    data: newScores
                });

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
                    `${newData[turn].name} mendapatkan ${point} score`,
                    `${newData[turn].name} total score : ${(newScores[turn].score)}`
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

                zoomPlayer(newData[turn].id)
            } else {
                const point = value.point

                newScores[turn] = {
                    ...newScores[turn],
                    score: newScores[turn].score + point
                }

                const dataLogs = [
                    `${newData[turn].name} mendapatkan ${point} score`,
                    `${newData[turn].name} total score : ${(newScores[turn].score)}`
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

                zoomPlayer(newData[turn].id)
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
                `${newData[turn].name} berkurang ${point} score`,
                `${newData[turn].name} total score : ${(newScores[turn].score)}`
            ]

            setLogs([
                ...logs,
                ...dataLogs
            ])

            setScores(newScores)

            const current = (newData[turn].currentIndex - value.step)

            if (current < 1) {
                newData[turn] = {
                    ...newData[turn],
                    prevPoint: newData[turn].currentPoint,
                    currentPoint: 0,
                    currentIndex: newData[turn].currentIndex - value.step
                }
            } else {
                newData[turn] = {
                    ...newData[turn],
                    prevPoint: newData[turn].currentPoint,
                    currentPoint: POINT * (newData[turn].currentIndex - value.step),
                    currentIndex: newData[turn].currentIndex - value.step
                }
            }

            zoomPlayer(newData[turn].id)

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
        if (isMobile) {
            screen.orientation.addEventListener("change", () => {
                setIsLandscape(screen.orientation.type === "landscape-primary")
            });
        }
    }, [isMobile, isLandscape])

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

    console.log(players)

    useEffect(() => {
        gsap.to(`#div-cross--1`, {
            motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 0,
            },
            transformOrigin: "50% 50%",
            duration: 0,
            ease: "power1.inOut",
        });
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
    }, [dataCross, isLandscape])

    useEffect(() => {
        const player = players.find(x => x.id === turn)

        if (player && !isInit) {
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
        } else {
            for (let item of players) {
                gsap.to(`#div-${item.id}`, {
                    motionPath: {
                        path: "#path",
                        align: "#path",
                        alignOrigin: [0.5, 0.5],
                        autoRotate: false,
                        start: item.prevPoint,
                        end: item.currentPoint,
                    },
                    transformOrigin: "50% 50%",
                    duration: 3,
                    ease: "power1.inOut",
                });
            }
        }
    }, [players, isInit, isLandscape])

    useEffect(() => {
        if (players.length > 0) {
            const cross = dataCross.find((_, i) => i === players[turn].currentIndex - 1)

            if (cross) {

                let newData = [...players]
                let newScores = [...scores]

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
            <main className={twMerge(
                'flex flex-col h-screen w-screen relative overflow-hidden',
                isLandscape && "h-fit w-fit "
            )} id="map">
                <img
                    src='/assets/images/bg-4.png'
                    className={twMerge(
                        'w-full h-full object-contain',
                        isLandscape && "object-cover"
                    )}
                />
                <div className='absolute bottom-[10%] left-[5%]'>

                    <CrossPath
                        id="path"
                        className={twMerge(
                            "w-[983px] h-[775px]",
                            isLandscape && "w-fit h-[435px]"
                        )}
                    />
                    {players.map((player) => (
                        <div key={player.id} id={`div-${player.id}`} className='z-30 absolute top-[5%] left-[30%] h-[50px] w-[50px]'>
                            <img
                                src={player.image}
                                className={twMerge(
                                    'w-[50px] h-[50px] object-contain',
                                    isLandscape && "w-[30px] h-[30px]"
                                )}
                            />
                        </div>
                    ))}
                    <div id={`div-cross--1`} className='absolute top-[25%] left-[60%]'>
                        <div className={twMerge(
                            'w-[80px] h-[80px] bg-blue-200 rounded-full flex flex-col- items-center justify-center',
                            isLandscape && "w-[40px] h-[40px]"
                        )}>
                            <p className={twMerge('text-xl font-bounce', isLandscape && "text-[8px]")}>START</p>
                        </div>
                    </div>
                    {dataCross.map((item, index) => (
                        <Fragment key={index}>
                            {dataCross.length - 1 === index ? (
                                <div id={`div-cross-${index}`} className='absolute top-[25%] left-[60%]'>
                                    {item.icon ? (
                                        <div className={twMerge(
                                            'w-[80px] h-[80px] bg-green-200 rounded-full flex flex-col items-center justify-center',
                                            isLandscape && "w-[40px] h-[40px]"
                                        )}>
                                            <img
                                                src={item.icon}
                                                className={twMerge(
                                                    'w-[40px] h-[40px] object-contain',
                                                    isLandscape && "w-[20px] h-[20px]"
                                                )}
                                            />
                                            <p className={twMerge('text-xs font-bounce', isLandscape && "text-[8px]")}>FINISH</p>
                                        </div>
                                    ) : (
                                        <div className={twMerge(
                                            'w-[40px] h-[40px] bg-yellow-100 rounded-full',
                                            isLandscape && "w-[20px] h-[20px]"
                                        )} />
                                    )}
                                </div>
                            ) : (
                                <div id={`div-cross-${index}`} className='absolute top-[25%] left-[60%]'>
                                    {item.icon ? (
                                        <img
                                            src={item.icon}
                                            className={twMerge(
                                                'w-[40px] h-[40px] object-contain',
                                                isLandscape && "w-[20px] h-[20px]"
                                            )}
                                        />
                                    ) : (
                                        <div className={twMerge(
                                            'w-[40px] h-[40px] bg-yellow-100 rounded-full',
                                            isLandscape && "w-[20px] h-[20px]"
                                        )} />
                                    )}
                                </div>
                            )}
                        </Fragment>
                    ))}
                    <div className={twMerge(
                        'absolute left-0 z-[30]',
                        isLandscape ? "-top-[1%] left-[15%]" : "-top-[22%]"
                    )}>
                        <div className={twMerge(
                            "w-[358px] h-[261px] relative",
                            isLandscape && "w-[98px] h-[101px]"
                        )}>
                            <img
                                src='/assets/images/bg-info-2.png'
                                className={
                                    twMerge(
                                        'w-full h-full object-cover',
                                    )
                                }
                            />
                            <div className='absolute inset-0 z-50'>
                                <div className={twMerge(
                                    'flex flex-col-reverse gap-3 relative overflow-hidden px-12 h-[200px] mt-3',
                                    isLandscape && "px-2 h-[80px] gap-1"
                                )}>
                                    {logsFilterred.map((item, index) => (
                                        <Fragment key={index}>
                                            <p className={twMerge(isLandscape && "text-[10px]")}>{item}</p>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {players.length > 0 && (
                        <div className={twMerge(
                            'absolute ',
                            isLandscape ? "-top-[1%] -left-[5%]" : "-left-[20%] -top-[20%]"
                        )}>
                            <div
                                className={twMerge(
                                    "w-[150px] h-[150px] relative",
                                    isLandscape && "w-[100px] h-[100px]"
                                )}
                            >
                                <img
                                    src='/assets/images/bg-character.png'
                                    className='w-full h-full object-contain'
                                />
                                <div className="absolute -top-3 left-0 right-0 flex flex-col items-center">
                                    <div className="flex flex-col items-center bg-[#dbbe9d] rounded-md w-[60px] py-1 relative overflow-hidden">
                                        <h1 className="font-bounce">{players[turn].name}</h1>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <img
                                        src={players[turn].image}
                                        className={twMerge(
                                            'w-[100px] h-[100px] object-contain',
                                            isLandscape && "w-[50px] h-[50px]"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={twMerge(
                        'absolute ',
                        isLandscape ? "top-[30%] -left-[5%]" : "-top-[20%] right-0"
                    )}>
                        <Dice
                            // cheatValue={2}
                            onRoll={(value) => {
                                let newData = [...players]

                                setIsInit(false)

                                const nextIndex = (newData[turn].currentIndex + value)

                                if (nextIndex > dataCross.length) {
                                    let newIndex = nextIndex
                                    if (nextIndex === 34 && value === 5) {
                                        newIndex = nextIndex + 3
                                    } else if (nextIndex === 34 && value === 4) {
                                        newIndex = nextIndex + 2
                                    } else if (nextIndex === 35 && value === 5) {
                                        newIndex = nextIndex + 1
                                    } else if (nextIndex === 35 && value === 4) {
                                        newIndex = nextIndex + 2
                                    }
                                    const diff = Math.abs(newIndex - dataCross.length)

                                    console.log('diff: ', diff)

                                    newData[turn] = {
                                        ...newData[turn],
                                        prevPoint: newData[turn].currentPoint,
                                        currentPoint: POINT * (newData[turn].currentIndex + diff),
                                        currentIndex: newData[turn].currentIndex + diff
                                    }
                                    zoomPlayer(newData[turn].id)
                                } else {
                                    newData[turn] = {
                                        ...newData[turn],
                                        prevPoint: newData[turn].currentPoint,
                                        currentPoint: POINT * nextIndex,
                                        currentIndex: newData[turn].currentIndex + value
                                    }
                                    zoomPlayer(newData[turn].id)
                                }
                                setPlayers(newData)
                            }}
                            size={isLandscape ? 70 : 100}
                        />
                    </div>
                </div>
            </main>

            {players.length > 0 && (
                <Question
                    isLandscape={isLandscape}
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
