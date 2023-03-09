<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;

class FriendController extends Controller
{
    public function create(Request $req) {
        $friend = new Friend;
        $friend->user_id_1=auth()->user()->id;
        $friend->user_id_2=$req->input('user_id');
        $friend->state = 0;
        $friend->save();
    }

    public function accept(Request $req) {
        Friend::where('friends.id', '=', $req->input('id'))
                    ->update(['friends.state' => 1]);
    }

    public function decline(Request $req) {
        Friend::where('friends.id', '=', $req->input('id'))
                    ->delete();
    }
}
