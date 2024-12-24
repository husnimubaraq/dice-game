<?php

namespace Database\Seeders;

use App\Models\{
    Leaderboard,
    History
};
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $history = History::create([]);

        Leaderboard::create([
            'history_id' => $history->id,
            'name' => 'User 1',
            'score' => 26,
            'image' => '/assets/images/diponegoro2.png'
        ]);

        Leaderboard::create([
            'history_id' => $history->id,
            'name' => 'User 2',
            'score' => 24,
            'image' => '/assets/images/kyai-mojo.png'
        ]);

        Leaderboard::create([
            'history_id' => $history->id,
            'name' => 'User 3',
            'score' => 36,
            'image' => '/assets/images/de-kock.png'
        ]);

        $history = History::create([]);

        Leaderboard::create([
            'history_id' => $history->id,
            'name' => 'Player 4',
            'score' => 28,
            'image' => '/assets/images/hendrik2.png'
        ]);

        Leaderboard::create([
            'history_id' => $history->id,
            'name' => 'Player 5',
            'score' => 30,
            'image' => '/assets/images/kyai-mojo.png'
        ]);

        Leaderboard::create([
            'history_id' => $history->id,
            'name' => 'Player 6',
            'score' => 26,
            'image' => '/assets/images/sentot.png'
        ]);
    }
}
