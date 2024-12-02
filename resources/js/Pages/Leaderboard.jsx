import { router, usePage } from "@inertiajs/react"
import { Fragment, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Button } from "./Components/Button"
import useDeepCompareEffect from "use-deep-compare-effect"

function arrMove(arr, oldIndex, newIndex) {
    let [temp] = arr.splice(oldIndex, 1)
    arr.splice(newIndex, 0, temp)
}

export default function Leaderboard({ }) {

    const [data, setData] = useState([])
    const [topPlayer, setTopPlayer] = useState([])

    useDeepCompareEffect(() => {
        let dataHistories = localStorage.getItem('histories')

        if (dataHistories) {
            dataHistories = JSON.parse(dataHistories)

            if (route().params?.id) {
                const history = dataHistories.find(x => x.id === Number(route().params.id))

                if (history) {
                    setData(history.data)

                    let sortedData = history.data.sort((a, b) => b.score - a.score);
                    let newData = sortedData.slice(0, 3)
                    const swipedData = [newData[1], newData[0], ...newData.slice(2)];
                    setTopPlayer(swipedData)
                }
            }else{
                const histories = dataHistories.map(x => ({
                    ...x.winner.score,
                    image: x.winner.player.image
                }))

                setData(histories)

                let sortedData = histories.sort((a, b) => b.score - a.score);
                let newData = sortedData.slice(0, 3)
                const swipedData = [newData[1], newData[0], ...newData.slice(2)];
                setTopPlayer(swipedData)
            }
        }
    }, [route().params])

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom items-center justify-center px-5"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <h1 className="text-5xl font-bounce text-white text-center z-50 mb-20">PAPAN PERINGKAT</h1>
            <div className="flex items-end relative gap-5">
                {topPlayer.length > 0 && topPlayer.map((item, index) => {
                    const crown = {
                        0: {
                            image: "/assets/images/crown-silver.png",
                            top: -57,
                        },
                        1: {
                            image: "/assets/images/crown.png",
                            top: -67,
                        },
                        2: {
                            image: "/assets/images/crown-bronze.png",
                            top: -43,
                        },
                    }[index]

                    return (
                        <Fragment key={index}>
                            <div className={twMerge(
                                "rounded-lg bg-white shadow-xl p-5 flex flex-col items-center justify-center h-[200px]",
                                index === 1 && "h-[250px]",
                                index === 0 && "h-[230px]"
                            )}>
                                <div className="relative w-[100px] h-[100px] pt-5">
                                    <img
                                        src={item.image}
                                        className="w-[100px] h-[100px] object-contain"
                                    />
                                    <div className="absolute left-0 right-0 flex flex-col items-center" style={{top: crown.top}}>
                                        <img
                                            src={crown.image}
                                            className="w-[50px] h-[50px] object-contain"
                                        />
                                    </div>
                                </div>
                                <p className="text-lg font-bounce mt-5">{item.name}</p>
                                <p className="text-2xl font-bounce text-[#eab308]">{item.score}</p>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
            <div className="h-10" />
            <div className="relative flex flex-col gap-5">
                {data.map((item, index) => (
                    <Fragment key={index}>
                        <div className="px-5 py-3 bg-blue-100 rounded-xl flex items-center gap-5">
                            <img
                                src={item.image}
                                className="w-[50px] h-[50px] object-contain"
                            />
                            <div className="flex items-center justify-between w-[500px]">
                                <p className="text-lg font-bounce">{item.name}</p>
                                <p className="text-lg font-bounce">{item.score}</p>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
            <div className="flex items-center justify-center gap-10 mt-10 z-50">
                <Button title="KEMBALI" onClick={() => {
                    if(route().params?.id){
                        router.visit(route('riwayat'))
                    }else{
                        router.visit(route('home'))
                    }
                }} />
            </div>
        </div>
    )
}
