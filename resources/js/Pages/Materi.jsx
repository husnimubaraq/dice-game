import React, { useRef } from "react";
import { Button } from "./Components/Button";
import { router } from "@inertiajs/react";
import HTMLFlipBook from 'react-pageflip';


export default function Materi({ }) {
    const book = useRef();

    return (
        <div
            className="flex flex-col h-screen w-screen bg-cover bg-bottom items-center justify-center px-5"
            style={{
                backgroundImage: "url('/assets/images/bg-2.jpg')"
            }}
        >
            <HTMLFlipBook
                ref={book}
                width={850}
                height={650}
                // size="stretch"
                // minWidth={315}
                // maxWidth={1000}
                // minHeight={400}
                // maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                className="demo-book"
            >
                <div className="bg-white p-5 flex flex-col">
                    <h1 className="text-2xl font-bold text-center">Materi Sejarah Perjuangan Pangeran Diponegoro</h1>
                    <p className="text-lg font-bold mt-5 mb-2">Latar Belakang Perang Jawa (1825-1830)</p>
                    <p className="indent-8 leading-8">Perang Jawa terjadi sejak tahun 1825-1830 merupakan suatu garis pemisah dalam sejarah Pulau Jawa dan bahkan seluruh Indonesia. Untuk pertama kalinya pemerintah Belanda menghadapi usaha pemberontakan sosial, yang mencakup suatu bagian yang besar dipulau tersebut. Sebenarnya kedatangan Belanda diterima oleh penguasa-penguasa Jawa, karena keberadaan Belanda dapat memperkuat kekuasaan mereka. Hal ini terjadi karena Belanda menjamin kekuasaan yang dimiliki oleh para penguasa Jawa. Akan tetapi, semakin lama dan semakin erat hubungan di antara keduanya, Belanda semakin bertindak semena-mena.</p>
                    <p className="indent-8 leading-8">Kehadiran Bangsa Belanda ke Jawa khususnya Yogyakarta menimbulkan beberapa polemik permasalahan sosial dan politik. Strategi-strategi yang diterapkan pemerintah Belanda mampu membius pemerintahan Keraton Yogyakarta, sehingga timbul kemerosotan moral di dalam keraton (Dewi et al., 2020). Serta semakin kuatnya kekuasaan Belanda di dalam keraton yang menambah berbagai permasalahan dan terdapat permasalahan di luar keraton atas kebijakan Belanda yang semakin kompleks menyebabkan meletusnya Perang Jawa (1825-1830) serta terjadi peristiwa-peristiwa politik di Yogyakarta.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="text-lg font-bold mt-5 mb-2">Sejarah Meletusnya Perang Jawa (1825-1830)</p>
                    <p className="indent-8 leading-8">Keraton Yogyakarta, ini berdiri sejak tahun 1755 sebagai hasil dari penaklukkan militer. Keraton Yogyakarta memiliki hubungan dengan Belanda, namun sepeninggal Mangkubumi dan tahta digantikan oleh anaknya, Sultan Hamengkubowono II. Terjadi peristiwa penting pada periode Sultan Hamengkubowono II dengan jatuhnya Kerajaan Belanda ke tangan Napoleon dari Perancis. Sehingga bekas wilayah yang dikuasai VOC kemudian dikendalikan di bawah pemerintah kolonial Belanda. Menandai perubahan tersebut, pada tanggal 14 Januari 1808, Herman Willem Daendels menjadi Gubernur Jenderal Hindia Belanda di bawah kendali Perancis, menggantikan posisi pimpinan sebelumnya yang dipegang oleh Albertus Henricus Wiese.</p>
                    <p className="indent-8 leading-8">Herman Willem Daendels membuat perubahan mendasar yang menjadikan seluruh kerajaan di bekas jajahan VOC sebagai bawahan dari Kerajaan Belanda. Oleh karena itu, ia mengharuskan Raja Jawa tunduk kepada Raja Belanda. Herman Willem Daendels juga mengeluarkan aturan bahwa hak pengelolaan hutan harus berada di bawah pemerintah Belanda. Sultan Hamengku Buwono II dengan tegas menolak semua tatanan baru tersebut. Hingga di kemudian hari, Herman Willem Daendels sendiri datang ke Yogyakarta membawa 3300 pasukan untuk menekan Sultan Hamengku Buwono II.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="indent-8 leading-8">Akibat dari tekanan tersebut, Sultan Hamengku Buwono II dipaksa turun tahta dan digantikan oleh putra mahkotanya RM. Surojo sebagai Hamengku Buwono III pada tanggal 31 Desember 1810. Sultan Hamengku Buwono III diharuskan menandatangani kontrak dengan Belanda dengan syarat-syarat yang memberatkan. Namun perjanjian yang ditandatangani pada Januari 1811 ini tidak sempat dilaksanakan karena Inggris datang dan memukul mundur Belanda. Pada masa pendudukan Inggris di Jawa, Pangeran Diponegoro pernah ditawari oleh John Crawfurd, seorang residen Inggris, untuk diangkat sebagai Sultan. Tawaran ini merupakan upaya Inggris untuk memperkuat pengaruh di kalangan elit Jawa dengan mendekati tokoh-tokoh yang memiliki pengaruh besar di masyarakat Jawa. Namun, rencana pengangkatan ini tidak pernah terlaksana. Sedangkan disisi lainnya kesempatan ini dipergunakan oleh Sultan Hamengku Buwono II untuk mengambil kembali tahtanya. Beliau menurunkan status Sultan Hamengku Buwono III kembali ke posisi sebelumnya dan mengeksekusi Patih Danurejo II yang didapati terbukti bersekongkol dengan Herman Willem Daendels. Sejak R. M. Sundoro diangkat sebagai Sultan Hamengkubowono II banyak sekali konflik yang terjadi dengan pihak Belanda maupun konflik internal keraton karena banyaknya tindakan persengkokolan dan penyalahgunaan jabatan sehingga terjadinya guncangan dalam stabiltas politik dikeraton (Carey, 2007).</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="indent-8 leading-8">Konflik-konflik internal dan eksternal seperti ini terus terjadi sampai kekuasaan Belanda di Pulau Jawa semakin kuat.  Awalnya kedatangan Belanda disambut baik oleh para pejabat keraton, akan tetapi semakin lama Belanda justru menusukkan duri dari belakang. Belanda mulai berani mencampuri urusan dalam keraton sehingga menambah keruh konflik internal di Keraton Yogyakarta. Para punggawa keraton mulai kehilangan tradisi, adat istiadat Jawa karena mereka justru cenderung mengikuti kebijakan norma-norma Barat yang dibawa oleh Belanda. Serta Herman Willem Daendels terus melakukan reorganisasi dengan memasukkan elit Jawa ke dalam sistem administrasi Belanda dan meletakkan landasan pemerintahan yang lebih modern. Perubahan-perubahan besar yang menyebabkan terguncangnya tatanan Jawa membuat Pangeran Diponegoro merasa prihatin melihat keadaan negaranya. Serta datangnya dukungan dari kaum santri akan Pangeran Diponegoro dalam Perang Jawa (1825-1830) karena melihat perjuangannya sebagai jihad melawan ketidakadilan dan penindasan Belanda. Perlawanan ini bukan hanya perjuangan politik, tetapi juga kewajiban agama untuk membela keadilan dan melindungi nilai-nilai Islam yang mereka yakini sedang terancam oleh kebijakan-kebijakan Belanda yang merugikan masyarakat jawa (Wibowo et al., 2023).</p>
                    <p className="indent-8 leading-8">Perpecahan di kalangan keraton tidak saja melemahkan keraton tetapi juga menyebabkan pengaruh Belanda semakin menjadi kuat. Setiap pertentangan antar keluarga bangsawan di keraton akan mengundang campur tangan pihak Belanda, yang pada akhirnya merugikan keraton itu sendiri sebagai keseluruhan.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="leading-8">Hingga peristiwa terdekat sebelum meletusnya Perang Jawa adalah konflik antara Pangeran Diponegoro dengan residen Smissaert yang melakukan kebijakan memasang tonggak untuk pembuatan rel kereta api yang melewati makam leluhur Pangeran Diponegoro tanpa izin terlebih dahulu. Konflik politik ini mencapai puncaknya dengan penutupan jalan ke Tegalrejo, yaitu tempat kediaman Pangeran Diponegoro. Pengikut Pangeran Diponegoro mencabut pancang-pancang yang digunakan untuk menutup jalan tersebut. Insiden pancang dan penutupan jalan menjadi konflik terbuka antara Smissaert melawan Pangeran Diponegoro, yang melibatkan kekuatan bersenjata. Pangeran Diponegoro mendapat simpati dari berbagai golongan masyarakat. Mereka berkumpul di Tegalrejo untuk membantu Pangeran Diponegoro melawan Belanda (Muhibbuddin, 2018). </p>
                    <p className="text-lg font-bold mt-5 mb-2">Perjuangan Pangeran Diponegoro Dalam Perang Jawa (1825-1830)</p>
                    <p className="indent-8 leading-8">Perang Jawa (1825-1830) ini dipimpin oleh Pangeran Diponegoro, yang merupakan seorang bangsawan dari Keraton Yogyakarta, yang menentang kekuasaan Belanda karena berbagai kebijakan Belanda yang dianggap sewenang-wenang dan merusak tatanan kehidupan sosial dan budaya masyarakat jawa. Dalam Perang Jawa (1825-1830) Pangeran Diponegoro dikenal sebagai pemimpin yang cerdas dalam mengatur strategi militer. Salah satu strategi yang ia gunakan dalam melawan Belanda adalah perang gerilya.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="leading-8">Pasukan Diponegoro, yang sebagian besar terdiri dari petani dan masyarakat biasa menggunakan kondisi geografis Jawa yang bergunung-gunung dan berhutan lebat sebagai keuntungan. Mereka melakukan serangan kilat terhadap pos-pos militer Belanda, kemudian segera mundur ke pedalaman untuk menghindari serangan balasan. Perang gerilya ini sangat efektif di tahap-tahap awal perang, karena pasukan Belanda yang terdiri dari tentara profesional tidak terbiasa berperang di medan yang sulit dan terjal. Mereka kesulitan mengejar pasukan Pangeran Diponegoro yang bergerak cepat dan berpindah-pindah tempat. Kondisi alam yang keras dan kurangnya pengetahuan Belanda tentang medan membuat pasukan Belanda mengalami banyak kekalahan di awal perang. Akhirnya Perang Jawa ini berakhir dengan tipu daya yang dilakukan Jenderal de Kock, dengan strategi ini pengepungan yang dikenal dengan startegi benteng stelsel. Suatu strategi baru dari Jenderal de Kock dengan membangun benteng di berbagai wilayah untuk menahan serangan dari pasukan pangeran Diponegoro (Dewi et al., 2020).</p>
                    <p className="indent-8 leading-8">Perang Jawa yang terjadi selama 5 tahun ini hampir 200.000 orang Jawa tewas dalam peperangan dan seperampat dari luas tanah dipulau tersebut mengalami kerusakan yang hebat.  Selain itu, pemerintah Belanda juga mendapatkan penderiataan sebagai akibat dari peperangan dengan korban jiwa sebanyak 8.000 tentara Belanda dan 7.000 serdadu pribumi yang membantu Belanda. Serta Belanda menghabiskan dana sekitar 20 juta gulden untuk membiayai seluruh pengeluaran dalam Perang Jawa.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="leading-8">Dalam Perang Jawa Sentot Ali Basah Prawirodirjo menjadi senopati atau panglima sekaligus perancang strategi perang Pangeran Doponegoro. Setelah melalui berbagai kecamuk perang, meski dukungan bangsawan dan masyarakat masih besar, Sentot Ali Basah Prawirodirjo menyadari posisi Pangeran Diponegoro semakin tertekan. Hingga redupnya perlawanan Pangeran Diponegoro setelah Kyai Mojo, sang pemimpin spiritual, tertangkap pada 1829. Peristiwa itu menggenapkan penangkapan demi penangkapan para pemimpin dan tokoh perlawanan yang lain. Menyadari situasi semakin sulit diantisipasi, pada tahun yang sama Sentot Ali Basah Prawirodirjo menyerahkan diri. Setahun kemudian tepatnya pada 1830, Jenderal de Kock menawarkan perundingan untuk menjebak Diponegoro dan berhasil.</p>
                    <p className="indent-8 leading-8">Akhir dari peperangan ini memberikan Belanda sebuah kemenangan sehingga ia memiliki kekuasaan tanpa batas atas Pulau Jawa dan dengan berakhirnya perang tersebut menandakan bahwa kolonialisme secara resmi berlaku di Pulau Jawa. Untuk mengawali penjajahannya di Pulau Jawa, Belanda menerapkan sistem tanam paksa atau cultuur stelsel dibawah pemerintahan van den Bosch. Akan tetapi Perang Jawa (1825-1830) menjadi salah satu perang terbesar yang terjadi di wilayah Indonesia selama masa penjajahan Belanda. Perang ini melibatkan banyak pihak, mulai dari kaum bangsawan, masyarakat biasa, hingga pemerintahan Belanda. Perang Jawa (1825-1830) sebagai sebuah bukti nyata akan sifat nasionalisme dan patriotisme yang tertanam dalam diri Pangeran Diponegoro.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="text-lg font-bold mt-5 mb-2">Penangkapan Pangeran Diponegoro</p>
                    <img
                        src="/assets/images/materi-1.jpg"
                        className="w-[280px] h-[178px] object-contain"
                    />
                    <p className="indent-8 leading-8">Serbuan pasukan Pangeran Diponegoro mengejutkan tentara Hindia Belanda dan membuat panik para pembesar keraton dan pemerintah Belanda. Residen Smissaert segera melaporkan kepada Jenderal de Kock karena kekuatan yang sangat tidak seimbang. Kemudian Jenderal de Kock ditugaskan sebagai Komisaris Pemerintah untuk Keraton Yogyakarta dan kekuasaan penuh untuk menumpas pemberontakan Pangeran Diponegoro. Jenderal de Kock mengumpulkan semua pasukannya yang berada di berbagai wilayah di Nusantara untuk berkumpul di Jawa. Selanjutnya Jenderal de Kock merencanakan operasi besar-besaran untuk merebut kembali Yogyakarta dan menghancurkan markas besar Pangeran Diponegoro di Selarong, dengan persiapan yang matang dan cermat. Jenderal De Kock mengirimkan surat kepada Pangeran Diponegoro di Selarong, dan kemudian pihak Pangeran Diponegoro pun mengirimkan balasan.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="leading-8">Setelah menerima balasan surat dari Pangeran Diponegoro, Jenderal de Kock segera memerintahkan pasukannya untuk menyerang Selarong. Akan tetapi, ternyata Selarong sudah kosong, Pangeran Diponegoro beserta pasukannya sudah melarikan diri dari Selarong.  Hal ini membuat peperangan semakin berlarut-larut (Ariwibowo, 2021).</p>
                    <p className="indent-8 leading-8">Hingga penangkapan Pangeran Diponegoro terjadi pada 28 Maret 1830, dan merupakan titik penting dalam sejarah perjuangan melawan kolonialisme Belanda. Setelah berjuang selama lima tahun dalam Perang Jawa (1825-1830), Pangeran Diponegoro setuju untuk menghadiri perundingan di Magelang. Diponegoro dan pengikutnya tiba dengan niat baik, berharap adanya jalan damai. Namun, Jenderal De Kock memanfaatkan situasi ini untuk menahan Pangeran Diponegoro. Penangkapan tersebut dilakukan tanpa pertempuran langsung, dan Pangeran Diponegoro segera diasingkan ke Manado, Pangeran Diponegoro menghabiskan sisa hidupnya di Makassar.</p>
                    <p className="text-lg font-bold mt-5 mb-2">Pengasingan Pangeran Diponegoro</p>
                    <p className="indent-8 leading-8">Setelah penangkapan pada 28 Maret 1830, Pangeran Diponegoro diasingkan oleh Belanda. Pada awalnya, ia dibawa ke Ungaran, lalu dipindahkan ke Batavia (sekarang Jakarta). Setelah itu, Diponegoro diasingkan ke Manado pada tahun 1830, di Benteng Amsterdam. Namun, karena dianggap terlalu berpengaruh di sana, ia kemudian dipindahkan ke Makassar pada tahun 1834.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="indent-8 leading-8">Di Makassar, Diponegoro tinggal di Benteng Rotterdam dan menjalani sisa hidupnya dalam pengasingan hingga wafat pada 8 Januari 1855. Pengasingan ini mengakhiri perlawanan besar melawan Belanda. Pengasingan Pangeran Diponegoro merupakan akhir dari perjuangannya melawan kolonial Belanda setelah penangkapannya pada tahun 1830. Setelah ditangkap Pangeran Diponegoro awalnya dibawa ke Batavia sebelum diasingkan ke Manado, Sulawesi Utara, di Benteng Amsterdam. Namun, karena pengaruhnya yang masih kuat di kalangan masyarakat ia kemudian dipindahkan ke Makassar pada tahun 1834. Di Makassar, Pangeran Diponegoro ditahan di Benteng Rotterdam dan Belanda terus mengawasi Pangeran Diponegoro dengan ketat karena khawatir akan pengaruh Pangeran Diponegoro yang masih kuat terhadap masyarakat Jawa. Pangeran Diponegoro menjalani sisa hidupnya di Makassar hingga wafat pada 8 Januari 1855. Meskipun hidup dalam pengasingan, semangat perjuangannya tetap menginspirasi generasi berikutnya dalam melawan Belanda (Hanifatul, 2019).</p>
                    <p className="text-lg font-bold mt-5">Dampak Perang Jawa (1825-1830)</p>
                    <p className="text-md font-bold mb-2">Bagi pihak masyarakat jawa :</p>
                    <p>1. Perang ini meningkatkan semangat nasionalisme di kalangan masyarakat jawa, yang mulai menyadari pentingnya perjuangan melawan Belanda.</p>
                    <p>2. Banyak karya yang muncul dari peristiwa ini yang memberikan wawasan tentang perjuangan.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p>3. Perang Jawa menginspirasi gerakan-gerakan perlawanan terhadap Belanda di berbagai daerah di Nusantara.</p>
                    <p>4. Menimbulkan korban jiwa yang lebih dari 200.000 dari orang Jawa.</p>
                    <p>5. Kekalahan Perang Jawa membuat penegasan dominasi Belanda semakin kuat dengan penerapan tanam paksa (cultuurstelsel).</p>
                    <p>6. Dalam Perang Jawa banyak desa yang hancur akibat pertempuran, lahan pertanian rusak, dan banyak rakyat yang mengalami kelaparan.</p>
                    <p className="text-md font-bold my-2">Bagi pihak Belanda antara lain :</p>
                    <p>1. Belanda berhasil memenangkan Perang Jawa dan mengasingkan Pangeran Diponegoro.</p>
                    <p>2. Belanda melakukan penegasan dominasi kekuasaan dengan penerapan tanam paksa (cultuurstelsel) dan kebijakan pajak yang membuat masyarakat jawa sengsara atas kebijakannya.</p>
                    <p>3. Belanda mampu membuat raja dan bupati tunduk terhadap dominasi kekuasaan Belanda.</p>
                    <p>4. Dalam Perang Jawa menimbulkan korban jiwa sebanyak 8.000 tentara Belanda dan 7.000 serdadu pribumi yang membantu Belanda.</p>
                    <p>5. Kerugian besar dari Belanda dalam Perang Jawa yang terjadi selama lima tahun, Belanda harus mengerahkan banyak tentara dan sumber daya untuk menghadapi pasukan Pangeran Diponegoro.</p>
                    <p>6. Belanda mengeluarkan biaya perang sebesar 20 juta gulden yang sangat tinggi membuat Belanda mengalami kesulitan keuangan.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="text-lg font-bold mb-2">Tokoh-Tokoh Dalam Perjuangan Pangeran Diponegoro</p>
                    <p>1. Pangeran Diponegoro</p>
                    <img
                        src="/assets/images/materi-2.jpg"
                        className="w-[193px] h-[261px] object-contain"
                    />
                    <p className="indent-8 leading-8">Pangeran Diponegoro lahir di Yogyakarta pada 11 November 1785. Ia merupakan seorang pemimpin utama dalam Perang Jawa yang berlangsung antara tahun 1825-1830. Pangeran Diponegoro dikenal tidak hanya sebagai seorang pejuang yang gigih melawan penjajahan Belanda, tetapi juga sebagai tokoh spiritual yang memiliki pengaruh besar di kalangan masyarakat jawa. </p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p>2. Kyai Mojo</p>
                    <img
                        src="/assets/images/materi-3.png"
                        className="w-[193px] h-[261px] object-contain"
                    />
                    <p className="indent-8 leading-8">Kyai Mojo lahir pada tahun 1792, ia merupakan seorang penasihat spiritual dari Pangeran Diponegoro dan Kyai Mojo tidak hanya dikenal karena pengetahuannya yang mendalam tentang agama, tetapi juga karena kemampuannya dalam memotivasi dan mengorganisir masyarakat jawa untuk berjuang melawan Belanda dalam Perang Jawa.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p>3. Sentot Ali Basah Prawirodirjo</p>
                    <img
                        src="/assets/images/materi-4.jpg"
                        className="w-[193px] h-[261px] object-contain"
                    />
                    <p className="indent-8 leading-8">Sentot Ali Basah Prawirodirdjo lahir pada tahun 1807, ia adalah seorang panglima perang yang terkenal pada masa Perang Diponegoro. Dalam Perang Jawa Sentot Ali Basah Prawirodirdjo bertanggung jawab atas strategi dan komando pasukan perang gerilya dalam melawan Belanda.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p>4. Jenderal de Kock</p>
                    <img
                        src="/assets/images/materi-5.jpg"
                        className="w-[193px] h-[261px] object-contain"
                    />
                    <p className="indent-8 leading-8 mb-2">Jenderal de Kock lahir pada tanggal 25 Mei 1779 dan ia adalah seorang pemimpin militer Belanda yang bertanggung jawab atas operasi militer serta penangkapan Pangeran Diponegoro.</p>
                    <p>5. Hendrik Smissaert</p>
                    <p className="indent-8 leading-8">Hendrik Smissaert lahir pada 1717, ia seorang yang menjadi pemimpin residen Yogyakarta dalam mendukung strategi Belanda untuk mengatasi perlawanan Pangeran Diponegoro.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="text-lg font-bold mb-2">Karya-karya Dari Pangeran Diponegoro</p>
                    <p>1. Babad Diponegoro</p>
                    <img
                        src="/assets/images/materi-6.jpg"
                        className="w-[240px] h-[180px] object-contain"
                    />
                    <p className="indent-8 leading-8">Dalam babad ini menggambarkan semangat perjuangan, strategi perang, serta nilai-nilai budaya dan agama yang menjadi motivasi Pangeran Diponegoro dan pengikutnya. Babad ini ditulis ketika pangeran Diponegoro berada di pengasingan di Makassar.</p>
                    <p>1. Manuskrip kitab uṣul fiqh</p>
                    <img
                        src="/assets/images/materi-7.jpg"
                        className="w-[251px] h-[186px] object-contain"
                    />
                    <p className="indent-8 leading-8">Manuskrip milik Pangeran Diponegoro yang berukuran 32x21cm dengan ketebalan 7 cm dan jumlah halaman keseluruhan manuskrip ini sebanyak 848 halaman.</p>
                </div>
                <div className="bg-white p-5 flex flex-col">
                    <p className="text-lg font-bold mb-2">Referensi</p>
                    <p>Ariwibowo, T. (2021). Strategi Perang Semesta: Pertempuran Pangeran Diponegoro Menghadapi Belanda 1825-1830. Syntax Literate ; Jurnal Ilmiah Indonesia, 6(5), 2537. https://doi.org/10.36418/syntax-literate.v6i5.2742</p>
                    <p>Carey, P. (2007). Kuasa Ramalan: Pangeran Diponegoro dan Akhir Tatanan Lama di Jawa, 1785-1855 (C. M. Udiani, Ed.). Kepustakaan Populer Gramedia.</p>
                    <p>Dewi, V. M., Hartanto, W., & Puji, R. P. N. (2020). Pangeran Diponegoro Dalam Perang Jawa 1825-1830. Sindang: Jurnal Pendidikan Sejarah Dan Kajian Sejarah, 2(2), 2020. https://doi.org/https://doi.org/10.31540/sindang.v2i2.254</p>
                    <p>Hanifatul, H. (2019). Karakteristik Manuskrip al-Qur’an Pangeran Diponegoro: Telaah atas Khazanah Islam era Perang Jawa. Hermeneutik : Jurnal Ilmu Al-Quran Dan Tafsir, 13(2), 104–119. https://doi.org/10.21043/hermeneutik.v13i2.6374</p>
                    <p>Muhibbuddin, M. (2018). Konflik dan Taktik Perang Jawa 1825-1830 Menelusuri Jejak Jihad dan Pengorbanan Pangeran Diponegoro (A. Sasmita, Ed.). Araska.</p>
                    <p>Wibowo, C., Sudiarso, A., & Prihantoro, K. (2023). Analisis Kepemimpinan Pangeran Diponegoro pada Perang Jawa Dalam Menegakkan Kedaulatan Kesultanan Yogyakarta (Ditinjau Dari Teori Seni Perang Sun-Tzu). Jurnal Kewarganegaraan, 7(1). https://doi.org/https://doi.org/10.31316/jk.v7i1.5205</p>
                </div>
            </HTMLFlipBook>
            <div className="flex items-center justify-center gap-10 mt-10 z-50">
                <Button title="HOME" onClick={() => router.visit(route('home'))} />
                <Button title="LANJUT" onClick={() => book.current?.pageFlip().flipNext()} />
            </div>
        </div>
    )
}
