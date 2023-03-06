<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\PostLike;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        $posts = Post::join('users', 'users.id', '=', 'posts.user_id')
        ->orderByDesc('posts.created_at')
        ->get(['users.name', 'posts.*']);
        $liked = PostLike::where('post_likes.user_id', '=', auth()->user()->id)
                ->get(['post_likes.post_id']);

        $count = 0;
        foreach ($posts as $post) {
            $post['templike'] = 0;
            for($i=0; $i<count($liked); $i++) {
                if($post['id'] == $liked[$i]['post_id']) {
                    $post['liked'] = 1;
                    $count++;
                    break;
                }   
            }
            if($count==0) $post['liked'] = 0;
            $count = 0;
        }

        return Inertia::render('Home/Home', 
        [
            'posts' => $posts
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $req)
    {
        if ($req->hasFile('image')) {
            $post = new Post;
            $post->user_id=auth()->user()->id;
            $post->content=$req->input('content');
            $post->image = $req->file('image')->store('public/images');
            $post->like = 0;
            $post->save();
        } else {
            $post = new Post;
            $post->user_id=auth()->user()->id;
            $post->content=$req->input('content');
            $post->like = 0;
            $post->save();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
