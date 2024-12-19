import { Fragment, useEffect, useState } from "react"
import "./riwayat.css"
import { router } from "@inertiajs/react"
import { Button } from "./Components/Button"

export default function Riwayat({ }) {

    const [data, setData] = useState([])

    useEffect(() => {
        let dataHistories = localStorage.getItem('histories')

        if(dataHistories){
            dataHistories = JSON.parse(dataHistories)
            setData(dataHistories)
        }
    }, [])

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom items-center justify-center px-5"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <h1 className="text-5xl font-bounce text-white text-center z-50 mb-20">RIWAYAT PERMAINAN</h1>
            <table class="table text-gray-400 border-separate space-y-6 text-2xl">
                <thead class="bg-blue-500 text-white">
                    <tr>
                        <th class="p-3">No</th>
                        <th class="p-3 w-[400px] text-left">Tanggal</th>
                        <th class="p-3">Jumlah Pemain</th>
                        <th class="p-3 w-[300px]">Papan Peringkat</th>
                    </tr>
                </thead>
                <tbody>
                    {data.reverse().map((item, index) => (
                        <Fragment key={index}>
                            <tr class="bg-blue-200 lg:text-black">
                                <td class="p-3 capitalize text-center">{index + 1}</td>
                                <td class="p-3 font-medium capitalize w-[400px]">{item.date}</td>
                                <td class="p-3 text-center">{item.data.length}</td>
                                <td class="p-3 pb-5 w-[300px]">
                                    <div className="flex flex-col items-center">
                                        <Button title="Lihat" className="w-[100px]" onClick={() => router.visit(route('leaderboard', {
                                            id: item.id
                                        }))} />
                                    </div>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-center gap-10 mt-10 z-50">
                <Button title="HOME" onClick={() => router.visit(route('home'))} />
            </div>
        </div>
    )
}
