import { Head, Link } from '@inertiajs/react';

import { Fragment, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Dice from "react-dice-roll";
import useDeepCompareEffect from 'use-deep-compare-effect'

gsap.registerPlugin(MotionPathPlugin);

import "./index.css"
// import { Map } from './Map'
import { CrossPath } from './CrossPath';
import { dataCross } from './Data';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

const POINT = 0.02

export default function Welcome({ }) {

    const [prevPoint, setPrevPoint] = useState(0.0)
    const [currentPoint, setCurrentPoint] = useState(0.0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [turn, setTurn] = useState(0)

    const [players, setPlayers] = useState([
        {
            id: 0,
            prevPoint: 0.0,
            currentPoint: 0.0,
            currentIndex: 0
        },
        {
            id: 1,
            prevPoint: 0.0,
            currentPoint: 0.0,
            currentIndex: 0
        }
    ])

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
                duration: 5,
                ease: "power1.inOut",
            });
        }
    }, [players])

    // useDeepCompareEffect(() => {

    // }, [players, turn])

    // useEffect(() => {
    //     setTurn(previousVal => {
    //         if (previousVal < players.length - 1) {
    //             return previousVal + 1;
    //         }
    //         return 0;
    //     });
    // }, [players])


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
                    {players.map((player, index) => (
                        <div key={player.id} id={`div-${player.id}`} className='z-50 absolute top-[5%] left-[30%] h-[50px] w-[50px]'>
                            <img
                                src="/assets/images/character-1.png"
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

                                setTimeout(() => {
                                    const cross = dataCross.find((_, i) => i === newData[currentTurn].currentIndex - 1)

                                    console.log('cross: ', cross)

                                    if (cross) {

                                        if (cross.type === "previous") {
                                            console.log('previous')
                                            newData[currentTurn] = {
                                                ...newData[currentTurn],
                                                prevPoint: newData[currentTurn].currentPoint,
                                                currentPoint: POINT * (newData[currentTurn].currentIndex - 1),
                                                currentIndex: newData[currentTurn].currentIndex - 1
                                            }
                                            setPlayers(newData)
                                        } else if (cross.type === "next") {
                                            console.log('next')
                                            newData[currentTurn] = {
                                                ...newData[currentTurn],
                                                prevPoint: newData[currentTurn].currentPoint,
                                                currentPoint: POINT * (newData[currentTurn].currentIndex + 1),
                                                currentIndex: newData[currentTurn].currentIndex + 1
                                            }
                                            setPlayers(newData)
                                        }
                                    }

                                    setTurn(previousVal => {
                                        if (previousVal < players.length - 1) {
                                            return previousVal + 1;
                                        }
                                        return 0;
                                    });
                                }, 5000);

                                // setPrevPoint(currentPoint)
                                // setCurrentPoint(POINT * (currentIndex + value))
                                // setCurrentIndex(currentIndex + value)
                            }}
                            size={100}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
