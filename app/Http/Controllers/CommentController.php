<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    public function comment(Request $req) {
        $comment = new Comment;
        $comment->user_id=auth()->user()->id;
        $comment->content=$req->input('content');
        $comment->post_id = $req->input('post_id');
        $comment->save();

        $cmtcount = Comment::where('comments.post_id', '=', $req->input('post_id'))
                    ->count();
        Post::where('posts.id', '=', $req->input('post_id'))
                    ->update(['posts.comment' => $cmtcount]);
    }
}
