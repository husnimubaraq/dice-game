import { Dialog, DialogPanel } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Button } from './Components/Button'
import { XMarkIcon } from '@heroicons/react/24/solid'

import "./winner.css"

export const Winner = ({ isOpen, data, onCancel = () => { } }) => {

    if (!isOpen) return null

    console.log('data: ', data)

    return (
        <Dialog open={isOpen} as="div" className="relative z-[99] focus:outline-none"  onClose={onCancel}>
            <div className="fixed inset-0 z-[99] w-screen overflow-y-auto">
                <div
                    className="flex min-h-full items-center justify-center p-4"
                >
                    <DialogPanel
                        transition
                        className="w-full max-w-lg h-[300px] rounded-xl bg-yellow-50 relative duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        {/* <Button title="Home" /> */}
                        <div className='flex items-center justify-between'>
                            <div className='w-[10%]'></div>
                            <div className='h-[60px] px-5 bg-red-400 rounded-xl flex flex-col justify-center -mt-5 w-[50%]'>
                                <p className='font-arista text-3xl text-white text-center'>Selamat</p>
                            </div>
                            <div className='w-[10%]'></div>
                        </div>
                        <div className="confetti">
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                            <div className="confetti-piece"></div>
                        </div>
                        <div className='relative flex flex-col items-center justify-center h-[250px] gap-10'>
                            <div className='text-2xl text-center text-yellow-400 flex flex-col gap-3'>
                                <p>Pemenangnya adalah</p>
                                <p className='text-5xl'>{data.player.name}</p>
                                <p className='text-3xl'>Skor: {data.score.score}</p>
                            </div>
                            <div>
                                <Button title="Home" className="w-[100px]" />
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
