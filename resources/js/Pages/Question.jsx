
import { Dialog, DialogPanel } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { twMerge } from 'tailwind-merge'

export const Question = ({ isOpen, data: selectedQuestion, onCancel = () => { }, onResult, onTimeout }) => {

    const [time, setTime] = useState(10);
    const [isRunning, setIsRunning] = useState(false);

    const [question, setQuestion] = useState(null)
    const [activeColor, setActiveColor] = useState(null)
    const [activeAnswer, setActiveAnswer] = useState(null)

    const init = async () => {
        if(isOpen){
            const { data } = await axios.get(route('question', {
                number: selectedQuestion.number
            }))

            setIsRunning(true)

            setQuestion(data)
        }
    }

    useEffect(() => {
        init()
    }, [isOpen])

    useEffect(() => {
        let timer;

        if (isRunning && isOpen) {
          timer = setInterval(() => {
            setTime((prevTime) => {
              if (prevTime <= 1) {
                clearInterval(timer);
                setIsRunning(false);
                onTimeout && onTimeout()
                onCancel && onCancel()
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
        }

        // Cleanup the interval on component unmount or when isRunning changes
        return () => clearInterval(timer);
      }, [isRunning, isOpen]);

    if(!question) return null

    const onCheck = async (answer) => {

        const body = {
            answer,
        }

        const { data } = await axios.post(route('question.check'), body)

        setActiveAnswer(answer)

        if(data.status){
            setActiveColor('bg-green-500')
        }else{
            setActiveColor('bg-red-500')
        }

        setTimeout(() => {
            setIsRunning(false)
            setTime(60)
            setActiveColor(null)
            setActiveAnswer(null)
            onResult && onResult(data)
        }, 1000)

    }

    if(!isOpen) return null

    console.log(time)

    return (
        <Dialog open={isOpen} as="div" className="relative z-[999] focus:outline-none" onClose={onCancel}>
            <div className="fixed inset-0 z-[999] w-screen overflow-y-auto">
                <div
                    className="flex min-h-full items-center justify-center p-4"
                >
                    <DialogPanel
                        transition
                        className="w-full max-w-[100vh] rounded-xl relative duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className='absolute inset-0'>
                            <img
                                src='/assets/images/bg-2.jpg'
                                className='w-full h-full object-cover rounded-[50px]'
                            />
                        </div>
                        <div className='relative flex flex-col p-[30px] bg-black/30  rounded-[50px]'>
                            <p className="mt-2 text-2xl text-white text-center">
                                {question.question}
                            </p>
                            <div className='flex flex-col gap-7 mt-10'>
                                {question.answers.map((item, index) => (
                                    <Fragment key={index}>
                                        <button
                                            onClick={() => onCheck(item)}
                                            className={twMerge(
                                                'py-5 rounded-full w-full bg-yellow-400 backdrop-filter backdrop-blur-sm bg-opacity-40 hover:border-white border-2 border-transparent text-sm text-white hover:text-white',
                                                activeAnswer === item ? `${activeColor} bg-opacity-80` : 'bg-yellow-400'
                                            )}
                                        >
                                            {item}
                                        </button>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
