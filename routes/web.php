<?php

use App\Http\Controllers\{
    HomeController,
    ProfileController
};
use App\Http\Controllers\Api\{
    QuestionController
};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/player', [HomeController::class, 'player'])->name('player');
Route::get('/character', [HomeController::class, 'character'])->name('character');
Route::get('/materi', [HomeController::class, 'materi'])->name('materi');
Route::get('/riwayat', [HomeController::class, 'riwayat'])->name('riwayat');
Route::get('/leaderboard', [HomeController::class, 'leaderboard'])->name('leaderboard');
Route::get('/info', [HomeController::class, 'info'])->name('info');

Route::get('/play', function () {
    return Inertia::render('Play');
})->name('play');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/question', [QuestionController::class, 'index'])->name('question');
Route::post('/question/check', [QuestionController::class, 'checkAnswer'])->name('question.check');

require __DIR__.'/auth.php';
