<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{

    private $questions =  [];

    public function __construct(){
        $json = '[
            {
                "question": "Apa penyebab utama Pangeran Diponegoro memulai perlawanan terhadap Belanda dalam Perang Jawa (1825-1830)?",
                "correct_answer": "Pembangunan jalan oleh Belanda yang melewati tanah leluhur Pangeran Diponegoro tanpa izin",
                "point": 4,
                "incorrect_answers": [
                    "Ketidakadilan ekonomi yang dialami masyarakat jawa akibat sistem tanam paksa (Cultuurstelsel)",
                    "Kebijakan perdagangan bebas dan sistem pajak yang diterapkan oleh Belanda",
                    "Melakukan kebijakan reorganisasi elit jawa dalam administrasi pemerintah Belanda"
                ]
            },
            {
                "question": "Apa peran Herman Willem Daendels dalam konflik internal di Keraton Yogyakarta selama masa Pangeran Diponegoro yang berdampak pada stabilitas politik keraton?",
                "correct_answer": "Herman Willem Daendels memberikan dukungan kepada RM. Surojo sebagai Sultan Hamengkubuwono III dalam melemahkan otoritas Sultan Hamengkubuwono II",
                "point": 4,
                "incorrect_answers": [
                    "Herman Willem Daendels menggantikan Sultan Hamengkubuwono II dengan RM. Surojo sebagai Sultan Hamengkubuwono III menyebabkan ketidakpuasan di kalangan bangsawan dan konflik yang berkepanjangan",
                    "Herman Willem Daendels berperan sebagai mediator yang berusaha menyelesaikan perselisihan antara bangsawan di keraton untuk menciptakan stabilitas politik",
                    "Herman Willem Daendels mencampuri urusan keraton untuk menciptakan perpecahan, sehingga memperlemah posisi keraton terhadap Belanda"
                ]
            },
            {
                "question": "Apa dampak utama dari kekalahan Pangeran Diponegoro dalam Perang Jawa (1825–1830) bagi masyarakat jawa?",
                "correct_answer": "Semakin kuatnya dominasi Belanda dengan menerapkan sistem tanam paksa (Cultuurstelsel) yang memberatkan masyarakat jawa",
                "point": 4,
                "incorrect_answers": [
                    "Perang Jawa menimbulkan banyak sekali kerusakan lahan pertanian milik masyarakat jawa",
                    "Terjadinya krisis kelaparan yang dialami masyarakat jawa",
                    "Melemahnya posisi sosial dari masyarakat jawa atas dominasi Belanda"
                ]
            },
            {
                "question": "Mengapa Pangeran Diponegoro memilih taktik perang gerilya dalam melawan Belanda?",
                "correct_answer": "Karena pasukan Pangeran Diponegoro menguasai medan pertempuran dengan memanfaatkan kondisi geografis Jawa",
                "point": 4,
                "incorrect_answers": [
                    "Karena kekuatan pasukan Pangeran Diponegoro tidak kuat dari pada Belanda",
                    "Karena Pangeran Diponegoro ingin menghindari pertempuran langsung",
                    "Karena Belanda memiliki pasukan bersenjata yang kuat"
                ]
            },
            {
                "question": "Mengapa Perang Jawa (1825-1830) menjadi salah satu perang termahal yang dialami Belanda di Indonesia dengan menghabiskan dana sekitar 20 juta gulden?",
                "correct_answer": "Karena durasi perang yang lama, mobilisasi pasukan besar, dan kebutuhan logistik yang terus meningkat",
                "point": 4,
                "incorrect_answers": [
                    "Karena wilayah Jawa mengalami kelangkaan sumber daya alam selama perang Jawa",
                    "Karena Belanda harus membeli persenjata baru dan kuat dari Inggris",
                    "Karena pendanaan dari pemerintah Belanda yang tidak terbatas"
                ]
            },
            {
                "question": "Salah satu penyebab utama meletusnya Perang Jawa adalah pemasangan patok jalan oleh Belanda yang melalui tanah milik Pangeran Diponegoro. Hal ini menimbulkan konflik karena Pangeran Diponegoro menganggap tanah tersebut sebagai tempat yang sakral. Berdasarkan pernyataan tersebut, faktor apa yang paling memengaruhi meletusnya Perang Jawa?",
                "correct_answer": "Campur tangan Belanda dalam masalah kultur dan agama",
                "point": 7,
                "incorrect_answers": [
                    "Kepentingan ekonomi Belanda atas tanah Jawa",
                    "Ketidakpuasan masyarakat terhadap pajak tinggi",
                    "Perebutan kekuasaan antara Pangeran Diponegoro dan Belanda"
                ]
            },
            {
                "question": "Pada masa itu, Pangeran Diponegoro ditawarkan untuk diangkat sebagai Sultan oleh John Crawfurd dari Residen Inggris akan tetapi pengangkatan ini tidak pernah terlaksana. Analisislah faktor utama yang paling memengaruhi kegagalan pengangkatan tersebut!",
                "correct_answer": "Konflik internal di Keraton serta perpecahan di kalangan bangsawan membuat klaim Pangeran Diponegoro atas tahta Keraton tidak memiliki legitimasi yang kuat",
                "point": 7,
                "incorrect_answers": [
                    "Pangeran Diponegoro tidak memiliki dukungan kekuatan militer sehingga Belanda dengan mudah menggagalkan pengangkatannya",
                    "Belanda berhasil mempengaruhi para ulama dan masyarakat untuk menolak pengangkatan Pangeran Diponegoro sebagai Sultan",
                    "Pangeran Diponegoro lebih berfokus pada strategi perang gerilya daripada berusaha membentuk pemerintahan resmi di bawah kekuasaannya"
                ]
            },
            {
                "question": "Selama Perang Jawa (1825-1830), banyak bangsawan Jawa yang berpihak kepada Belanda untuk mendapatkan keuntungan politik dan ekonomi. Bagaimana pengaruh keputusan bangsawan ini dalam mempengaruhi jalannya Perang Jawa?",
                "correct_answer": "Mengurangi dukungan masyarakat jawa terhadap perlawanan Pangeran Diponegoro",
                "point": 7,
                "incorrect_answers": [
                    "Memperkuat kekuatan militer Belanda di Jawa",
                    "Membantu mempercepat kekalahan dari Pangeran Diponegoro",
                    "Memperkuat kedudukan politik Belanda di mata masyarakat jawa"
                ]
            },
            {
                "question": "Selama Perang Jawa (1825-1830), Belanda menerapkan kebijakan yang memaksa masyarakat jawa untuk membayar pajak tanah yang tinggi. Apa pengaruh utama dari kebijakan ini terhadap masyarakat Jawa?",
                "correct_answer": "Membuat masyarakat jawa sengsara atas kebijakan Belanda yang dibebankan hingga mendorong perlawanan terhadap Belanda",
                "point": 7,
                "incorrect_answers": [
                    "Membuat penurunan produktivitas pertanian masyarakat jawa yang menimbulkan penurunan ekonomi",
                    "Mengakibatkan penurunan kesejahteraan ekonomi di kalangan masyarakat jawa",
                    "Mengurangi jumlah pasukan Pangeran Diponegoro yang berasal dari petani untuk memenuhi biaya pajak"
                ]
            },
            {
                "question": "Analisislah faktor-faktor yang menyebabkan dukungan kaum santri terhadap Pangeran Diponegoro dalam Perang Jawa (1825-1830). Manakah dari pernyataan berikut yang paling tepat menggambarkan alasan dukungan tersebut?",
                "correct_answer": "Kaum santri merasa bahwa perjuangan Diponegoro adalah bentuk jihad yang sah, yang dapat membela agama dan budaya Jawa dari campur tangan Belanda",
                "point": 7,
                "incorrect_answers": [
                    "Kaum santri percaya bahwa kemenangan Pangeran Diponegoro akan menguntungkan mereka dan memberikan kekuasaan dalam pemerintahan",
                    "Dukungan terhadap Diponegoro berasal dari rasa ketidakpuasan terhadap Belanda, yang dinilai tidak memperhatikan kepentingan ekonomi kaum santri",
                    "Kaum santri menganggap perjuangan Diponegoro sebagai bagian dari perlawanan melawan pengaruh Belanda yang akan memperkuat posisi Islam di dunia"
                ]
            },
            {
                "question": "Penangkapan Pangeran Diponegoro pada 28 Maret 1830 menjadi titik balik penting dalam sejarah Perang Jawa. Evaluasilah strategi utama yang digunakan Belanda dalam menghentikan perlawanan Pangeran Diponegoro. Mana dari pernyataan berikut yang paling tepat menggambarkan strategi tersebut?",
                "correct_answer": "Belanda memanfaatkan situasi yang terdesak dari Pangeran Diponegoro dengan membujuknya untuk datang ke Magelang di bawah perjanjian perdamaian yang sebenarnya tipu daya",
                "point": 9,
                "incorrect_answers": [
                    "Belanda menggunakan kebijakan yang menekan terhadap para pengikut Pangeran Diponegoro agar memaksanya untuk menyerah dan menghentikan perlawanan",
                    "Belanda melakukan penangkapan terhadap Sentot Ali Basah Prawirodirjo untuk memperlemah kekuatan Pangeran Diponegoro dengan kehilangan panglimanya",
                    "Belanda menerapkan strategi Benteng Stelsel untuk melemahkan pergerakan Pangeran Diponegoro dengan membatasi pergerakannya"
                ]
            },
            {
                "question": "Pengasingan Pangeran Diponegoro ke Makassar setelah Perang Jawa (1825-1830) dianggap sebagai tindakan penting yang dilakukan oleh Belanda untuk mengamankan kendalinya atas Jawa. Evaluasilah dampak pengasingan ini terhadap perjuangan masyarakat jawa dan kekuasaan Belanda. Mana di antara pernyataan berikut yang paling tepat menggambarkan dampak pengasingan Pangeran Diponegoro?",
                "correct_answer": "Pengasingan Pangeran Diponegoro ke Makassar memutuskan jalur komunikasi dan mengurangi semangat perjuangan rakyat jawa terhadap Belanda",
                "point": 9,
                "incorrect_answers": [
                    "Pengasingan ini justru memicu gelombang baru perlawanan rakyat jawa terhadap Belanda",
                    "Pengasingan Pangeran Diponegoro menguatkan dukungan rakyat jawa kepada Belanda dalam mencapai kedamaian",
                    "Pengasingan ini menyebabkan kesenjangan sosial dan ekonomi yang semakin besar di Jawa"
                ]
            },
            {
                "question": "Perang Jawa (1825-1830) bukan hanya sekadar konflik bersenjata, tetapi juga memiliki dampak signifikan terhadap aspek politik Belanda di Indonesia. Evaluasilah Perang Jawa ini dapat mempengaruhi kebijakan politik Belanda. Mana di antara pernyataan berikut yang paling tepat menggambarkan pengaruh Perang Jawa terhadap kebijakan politik Belanda?",
                "correct_answer": "Perang Jawa mendorong restrukturisasi dalam pemerintahan Belanda, dengan penekanan pada sistem kontrol yang lebih ketat dan peningkatan militerisasi untuk mencegah perlawanan",
                "point": 9,
                "incorrect_answers": [
                    "Perang Jawa memperkuat pengaruh Belanda khususnya di wilayah Jawa dan wilayah Indonesia lainnya",
                    "Perang Jawa meningkatkan posisi Belanda di dunia dan memungkinkan Belanda untuk mengekspansi pengaruh politiknya di Asia Tenggara",
                    "Perang Jawa ini menyebabkan penguatan hubungan antara Belanda dan para bangsawan Jawa yang membantu menciptakan stabilitas politik Belanda di wilayah Jawa"
                ]
            },
            {
                "question": "Evaluasilah faktor-faktor yang mendorong Kyai Mojo untuk melakukan kompromi dengan Belanda dalam Perang Jawa (1825-1830) yang dianggap sebagai penghianatan. Mana di antara pernyataan berikut yang paling tepat menggambarkan alasan utama di balik keputusan tersebut?",
                "correct_answer": "Kyai Mojo memikirkan dampak penderitaan akibat perang yang berkepanjangan dan berkompromi menjadi satu-satunya cara untuk melindungi masyarakat jawa dari lebih banyak kerugian",
                "point": 9,
                "incorrect_answers": [
                    "Kyai Mojo merasa bahwa kompromi dengan Belanda akan meningkatkan kekuasaannya di kalangan masyarakat jawa dan menjadikannya sebagai pemimpin yang lebih berpengaruh",
                    "Kyai Mojo mengambil keputusan untuk berkompromi lebih didasari pada kondisi yang mendesak untuk menyelamatkan dirinya dari Belanda",
                    "Kyai Mojo ingin menjaga stabilitas politik dengan berpihak kepada Belanda untuk melindungi daerahnya"
                ]
            },
            {
                "question": "Identitas nasionalisme dan patriotisme Pangeran Diponegoro terlihat jelas dalam perjuangannya selama Perang Jawa. Manakah pernyataan yang paling tepat yang mencerminkan peran Pangeran Diponegoro dalam menginspirasi perjuangan melawan Belanda?",
                "correct_answer": "Pangeran Diponegoro melakukan perjuang tidak hanya untuk mempertahankan tanahnya tetapi sebagai harapan bagi masyarakat jawa untuk terbebas dari kekuasaan Belanda",
                "point": 9,
                "incorrect_answers": [
                    "Pangeran Diponegoro memilih untuk berperang hanya sebagai cara untuk memperkuat posisinya sebagai pemimpin dengan mempertimbangkan kepentingan masyarakat jawa",
                    "Pangeran Diponegoro memiliki hubungan yang erat dengan pendukungnya yang berasal dari petani dan masyarakat biasa untuk melawan Belanda",
                    "Pangeran Diponegoro melakukan perdamaian dengan Belanda untuk berkompromi demi menghentikan perlawanan yang merugikan masyarakat jawa"
                ]
            }
        ]';

        $data = json_decode($json, true);

        $this->questions = $data;
    }

    public function index(Request $request)
    {
        $number = $request->get('number');

        $data = $this->questions;

        $randomIndex = (int)$number - 1;

        $correctAnswer = $data[$randomIndex]['correct_answer'];
        $incorrectAnswers = $data[$randomIndex]['incorrect_answers'];

        $allAnswers = array_merge($incorrectAnswers, [$correctAnswer]);

        shuffle($allAnswers);

        $randomQuestion = array(
            'question' => $data[$randomIndex]['question'],
            'answers' => $allAnswers
        );

        return response()->json($randomQuestion);
    }

    public function checkAnswer(Request $request)
    {
        $searchAnswer = $request->answer;

        $data = $this->questions;

        $filteredItems = collect($data)->first(function ($item) use ($searchAnswer) {
            return $item['correct_answer'] === $searchAnswer;
        });

        if($filteredItems){
            return response()->json([
                'status' => true,
                'step' => 2,
                'point' => $filteredItems["point"],
            ]);
        }else{
            return response()->json([
                'status' => false,
                'step' => 2,
                'point' => 5,
            ]);
        }
    }
}
