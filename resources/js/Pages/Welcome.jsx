import { Head, Link } from '@inertiajs/react';

import { Fragment, useEffect, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

import "./index.css"
// import { Map } from './Map'
import { CrossPath } from './CrossPath';

const POINT = 0.02

export default function Welcome({ }) {

    const dataCross = [
        {
            icon: '/assets/icons/question.png',
            type: 'question'
        },
        {
            icon: '/assets/icons/question.png',
            type: 'question'
        },
        {
            icon: '/assets/icons/arrow-plus.png',
            type: 'next'
        },
        {
            icon: null,
            type: 'stale'
        },
        {
            icon: '/assets/icons/question.png',
            type: 'question'
        },
        {
            icon: '/assets/icons/arrow-minus.png',
            type: 'previous'
        },
    ]

    const [currentPoint, setCurrentPoint] = useState(POINT)

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
                duration: 5,
                ease: "power1.inOut",
            });
        }
    }, [])

    useEffect(() => {
        gsap.to("#div", {
            motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0.0,
                end: currentPoint,
            },
            transformOrigin: "50% 50%",
            duration: 5,
            ease: "power1.inOut",
        });
    }, [currentPoint])

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
                <div className='absolute -bottom-5 left-[30%]'>

                    <CrossPath
                        id="path"
                        className="w-[983px] h-[775px] !text-[#FF6F00]"
                    />
                    <div id="div" className='z-50 absolute top-[25%] left-[60%] bg-yellow-500 rounded-full h-[30px] w-[30px]'>

                    </div>
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
                </div>
            </main>
        </>
    );
}
