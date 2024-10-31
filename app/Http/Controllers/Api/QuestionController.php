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
                "question": "Siapa nama tokoh yang memimpin Perang Diponegoro?",
                "correct_answer": "Pangeran Diponegoro",
                "point": 8,
                "incorrect_answers": [
                    "Pangeran Antasari",
                    "Sultan Agung",
                    "Pangeran Jayakarta"
                ]
            },
            {
                "question": "Perang Diponegoro terjadi antara tahun?",
                "correct_answer": "1825-1830",
                "point": 10,
                "incorrect_answers": [
                    "1815-1820",
                    "1835-1840",
                    "1845-1850"
                ]
            },
            {
                "question": "Pangeran Diponegoro berasal dari wilayah?",
                "correct_answer": "Belanda",
                "point": 13,
                "incorrect_answers": [
                    "Portugis",
                    "Inggris",
                    "Jepang"
                ]
            },
            {
                "question": "Perang Diponegoro juga dikenal dengan nama lain yaitu?",
                "correct_answer": "Perang Jawa",
                "point": 15,
                "incorrect_answers": [
                    "Perang Padri",
                    "Perang Aceh",
                    "Perang Batak"
                ]
            },
            {
                "question": "Pangeran Diponegoro ditangkap oleh Belanda di?",
                "correct_answer": "Magelang",
                "point": 18,
                "incorrect_answers": [
                    "Jakarta",
                    "Surabaya",
                    "Bandung"
                ]
            },
            {
                "question": "Setelah ditangkap, Pangeran Diponegoro diasingkan ke kota?",
                "correct_answer": "Makassar",
                "point": 25,
                "incorrect_answers": [
                    "Medan",
                    "Palembang",
                    "Banjarmasin"
                ]
            },
            {
                "question": "Penyebab utama Perang Diponegoro adalah?",
                "correct_answer": "Campur tangan Belanda dalam urusan tanah",
                "point": 28,
                "incorrect_answers": [
                    "Masalah ekonomi",
                    "Konflik kerajaan",
                    "Masalah agama"
                ]
            },
            {
                "question": "Perang Diponegoro dianggap salah satu perang besar di Indonesia karena berlangsung selama?",
                "correct_answer": "5 tahun lebih",
                "point": 30,
                "incorrect_answers": [
                    "2 tahun",
                    "3 tahun",
                    "5 tahun"
                ]
            }
        ]';

        $data = json_decode($json, true);

        $this->questions = $data;
    }

    public function index()
    {

        $data = $this->questions;

        $randomIndex = array_rand($data);

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
