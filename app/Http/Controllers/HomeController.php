<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Home');
    }

    public function player(Request $request)
    {
        return Inertia::render('Player');
    }

    public function character(Request $request)
    {
        return Inertia::render('Character');
    }

    public function materi(Request $request)
    {
        return Inertia::render('Materi');
    }

    public function riwayat(Request $request)
    {
        return Inertia::render('Riwayat');
    }

    public function leaderboard(Request $request)
    {
        return Inertia::render('Leaderboard');
    }
}
