import React, { useRef } from "react";
import { Button } from "./Components/Button";
import { router } from "@inertiajs/react";
import HTMLFlipBook from 'react-pageflip';

export default function Info({ }) {
    const book = useRef();

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom items-center justify-center px-5"
            style={{
                backgroundImage: "url('/assets/images/bg-1.jpg')"
            }}
        >
            <h1 className="text-5xl font-bounce text-white text-center z-50 mb-20">Informasi Permainan</h1>
            <HTMLFlipBook
                ref={book}
                width={850}
                height={650}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                className="demo-book"
            >
                <div className="bg-[#f2b480] p-5 flex flex-col rounded-l-3xl">
                    <p className="text-3xl font-bold mt-5 mb-2 text-center">Fitur Game</p>
                    <ul className="list-disc text-xl/10 mt-5">
                        <ul>•	Materi: Menyediakan informasi mengenai sejarah perjuangan Pangeran Diponegoro.</ul>
                        <ul>•	Info: Memuat panduan tentang aturan dan cara bermain game.</ul>
                        <ul>•	Riwayat Permainan: Menampilkan catatan perjalanan pemain dalam permainan.</ul>
                        <ul>•	Papan Peringkat: Memuat daftar peringkat berdasarkan skor permainan.</ul>
                        <ul>•	Home: Mengarahkan pemain kembali ke tampilan utama.</ul>
                        <ul>•	Kembali: Mengembalikan pemain ke tampilan sebelumnya.</ul>
                        <ul>•	Lanjut: Melanjutkan ke tampilan berikutnya.</ul>
                    </ul>
                </div>
                <div className="bg-[#f2b480] p-5 flex flex-col rounded-r-3xl">
                    <p className="text-3xl font-bold mt-5 mb-2 text-center">Skor Game</p>
                    <ul className="list-disc text-xl/10 mt-5">
                        <ul>•	Pertanyaan 1-5: Setiap soal bernilai 4 poin.</ul>
                        <ul>•	Pertanyaan 6-10: Setiap soal bernilai 7 poin.</ul>
                        <ul>•	Pertanyaan 11-15: Setiap soal bernilai 9 poin.</ul>
                        <ul>•	Papan Peringkat: Memuat daftar peringkat berdasarkan skor permainan.</ul>
                        <ul>•	Home: Mengarahkan pemain kembali ke tampilan utama.</ul>
                        <ul>•	Kembali: Mengembalikan pemain ke tampilan sebelumnya.</ul>
                        <ul>•	Lanjut: Melanjutkan ke tampilan berikutnya.</ul>
                    </ul>
                </div>
                <div className="bg-[#f2b480] p-5 flex flex-col rounded-l-3xl">
                    <p className="text-3xl font-bold mt-5 mb-2 text-center">Tanda dalam Game</p>
                    <ul className="list-disc text-xl/10 mt-5">
                        <ul>•	Panah Biru: Menunjukkan pemain maju.</ul>
                        <ul>•	Panah Merah: Menunjukkan pemain mundur.</ul>
                        <ul>•	Tanda Tanya: Menandakan munculnya soal.</ul>
                        <ul>•	Jawaban Berwarna Hijau: Pemain akan maju dan mendapat kesempatan memutar dadu.</ul>
                        <ul>•	Jawaban Berwarna Merah: Pemain harus mundur dan tidak dapat memutar dadu.</ul>
                        <ul>•	Waktu Menjawab: Jika pemain tidak menjawab pertanyaan dalam waktu 75 detik, maka permain tidak diberi kesempatan memutar dadu.</ul>
                    </ul>
                </div>
            </HTMLFlipBook>
            <div className="flex items-center justify-center gap-10 mt-10 z-50">
                <Button title="HOME" onClick={() => router.visit(route('home'))} />
                <Button title="LANJUT" onClick={() => book.current?.pageFlip().flipNext()} />
            </div>
        </div>
    )
}
