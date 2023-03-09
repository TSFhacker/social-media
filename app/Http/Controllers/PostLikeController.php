<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostLike;
use App\Models\Post;

class PostLikeController extends Controller
{
    //When a user likes a post
    public function like(Request $req) {
        $like = new PostLike;
        $like->post_id=$req->input('post_id');
        $like->user_id=auth()->user()->id;
        $like->category=$req->input('category');
        $like->save();

        $likecount = PostLike::where('post_likes.post_id', '=', $req->input('post_id'))
                    ->count();
        Post::where('posts.id', '=', $req->input('post_id'))
                    ->update(['posts.like' => $likecount]);
    }

    //When a user dislikes a post
    public function dislike(Request $req) {
        PostLike::where([
            ['post_id', '=', $req->input('post_id')],
            ['user_id', '=', auth()->user()->id],
        ])->delete();

        $likecount = PostLike::where('post_likes.post_id', '=', $req->input('post_id'))
                    ->count();
        Post::where('posts.id', '=', $req->input('post_id'))
                    ->update(['posts.like' => $likecount]);
    }
}
