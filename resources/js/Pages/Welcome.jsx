import { Head, Link } from '@inertiajs/react';

import { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

import "./index.css"

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    useEffect(() => {
        gsap.to("#div", {
            motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
            },
            transformOrigin: "50% 50%",
            duration: 5,
            ease: "power1.inOut",
        });
    }, [])

    return (
        <>
            <Head title="Welcome" />
            <main className='flex flex-col h-screen w-screen relative overflow-hidden'>
                <img
                    src='/assets/images/bg-2.jpg'
                    className='w-full h-full object-cover object-left-center'
                />
                <div className='absolute inset-0'>
                    <h1>MotionPathPlugin (new in GSAP 3)</h1>

                    <svg width="100%" height="100%" viewBox="-20 0 557 190" id="svg">
                        <path id="path" d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37" />

                    </svg>

                    <div id="div">#div</div>
                </div>
            </main>
        </>
    );
}
