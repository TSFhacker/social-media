<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommentLike;


class CommentLikeController extends Controller
{
    //When a user likes a comment
    public function like(Request $req) {
        $like = new CommentLike;
        $like->comment_id=$req->input('comment_id');
        $like->user_id=$req->input('user_id');
        $like->category=$req->input('category');
        $like->save();
    }

    //When a user dislikes a comment
    public function dislike(Request $req) {
        CommentLike::where([
            ['comment_id', '=', $req->input('comment_id')],
            ['user_id', '=', $req->input('user_id')],
        ])->delete();
    }
}
