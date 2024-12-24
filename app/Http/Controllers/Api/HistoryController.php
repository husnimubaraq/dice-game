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
use App\Models\{
    Leaderboard,
    History
};

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $histories = History::with('leaderboards')->get();

        return response()->json($histories);
    }

    public function detail(Request $request, $id)
    {
        $history = History::with('leaderboards')->where('id', $id)->first();

        return response()->json($history);
    }

    public function leaderboard(Request $request)
    {
        $history = Leaderboard::get();

        return response()->json($history);
    }

    public function store(Request $request)
    {
        $data = $request->data;

        try {
            $history = History::create([]);

            foreach ($request->data as $value) {
                Leaderboard::create([
                    'history_id' => $history->id,
                    'name' => $value['name'],
                    'score' => $value['score'],
                    'image' => $value['image']
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'Succes'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed'
            ]);
        }
    }
}
