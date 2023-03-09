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
        $comment->state = 0;
        $comment->save();
    }

    public function accept(Request $req) {
        $friend = new Friend;
        $friend->user_id_1=auth()->user()->id;
        $friend->user_id_2=$req->input('user_id');
        $comment->state = 0;
        $comment->save();
    }
}
