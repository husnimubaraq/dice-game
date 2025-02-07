import dayjs from "dayjs"
import { Fragment } from "react"
import { Button } from "./Components/Button"
import { router } from "@inertiajs/react"

export const RiwayatMobile = ({ data }) => {

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom px-5 py-10"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <h1 className="text-5xl font-bounce text-white text-center z-50 mb-20">RIWAYAT PERMAINAN</h1>
            <div className="relative overflow-y-auto">
                <div className="flex flex-col gap-5">
                    {data.map((item, index) => (
                        <Fragment key={index}>
                            <div className="w-full pt-3 pb-5 px-5 rounded-xl bg-white">
                                <p className="font-medium capitalize">{dayjs(item.created_at).format('DD MMMM YYYY, hh:mm')}</p>
                                <div className="flex items-center justify-between">
                                    <p className="">Jumlah</p>
                                    <p className="">{item.leaderboards.length}</p>
                                </div>
                                <div className="flex items-center gap-5 mt-5">
                                    <Button title="Papan Peringkat" className="w-[70%] text-xs" onClick={() => router.visit(route('leaderboard', {
                                        id: item.id
                                    }))} />
                                    <Button title="Hapus" className="w-[30%" onClick={() => {
                                        router.post(route('histories.destroy', {
                                            id: item.id
                                        }), {}, {
                                            onSuccess: (res) => {
                                                window.location.reload()
                                            }
                                        })
                                    }} />
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center gap-10 mt-10 z-50">
                <Button title="HOME" onClick={() => router.visit(route('home'))} />
            </div>
            <div className="absolute inset-0 h-[200px] w-full bg-gradient-to-b from-black/50 to-nuetral-300 z-[40]" />
        </div>
    )
}
