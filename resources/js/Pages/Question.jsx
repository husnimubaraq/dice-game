
import { Dialog, DialogPanel } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

export const Question = ({ isOpen, onCancel = () => { }, onResult }) => {

    const [question, setQuestion] = useState(null)

    const init = async () => {
        if(isOpen){
            const { data } = await axios.get(route('question'))

            setQuestion(data)
        }
    }

    useEffect(() => {
        init()
    }, [isOpen])

    if(!question) return null

    const onCheck = async (answer) => {

        const body = {
            answer
        }

        const { data } = await axios.post(route('question.check'), body)

        onResult && onResult(data)
    }

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
                            <p className="mt-2 text-4xl text-white text-center">
                                {question.question}
                            </p>
                            <div className='flex flex-col gap-7 mt-10'>
                                {question.answers.map((item, index) => (
                                    <Fragment key={index}>
                                        <button
                                            onClick={() => onCheck(item)}
                                            className='py-5 rounded-full w-full bg-yellow-500 hover:bg-yellow-500/80 text-xl'
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
