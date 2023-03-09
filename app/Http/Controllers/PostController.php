<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\PostLike;
use App\Models\User;
use App\Models\Comment;
use App\Models\Friend;

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
        ->get(['users.name', 'users.profile_picture', 'posts.*']);
        $liked = PostLike::where('post_likes.user_id', '=', auth()->user()->id)
                ->get(['post_likes.post_id']);
        $comments = Comment::join('posts', 'posts.id', '=', 'comments.post_id')
        ->join('users', 'users.id', '=', 'comments.user_id')
        ->orderByDesc('comments.created_at')
        ->get(['posts.id', 'comments.*', 'users.name', 'users.profile_picture']);
        $count = 0;
        foreach ($posts as &$post) {
            $post['templike'] = 0;
            $post['comment_visibility'] = "hidden";
            for($i=0; $i<count($liked); $i++) {
                if($post['id'] == $liked[$i]['post_id']) {
                    $post['liked'] = 1;
                    $count++;
                    break;
                }   
            }
            if($count==0) $post['liked'] = 0;
            $array = [];
            for($i=0; $i<count($comments); $i++) {
                if($post['id'] == $comments[$i]['post_id']){
                    $array[] = $comments[$i];
                }
            }
            $post['comments'] = $array;
        }

        return Inertia::render('Home/Home', 
        [
            'friendrequests' => Friend::join('users', 'users.id', '=', 'friends.user_id_1')
                                        ->where([['friends.user_id_2', '=', auth()->user()->id], 
                                                ['friends.state', '=', 0]])->get(['users.name', 'friends.id', 'friends.user_id_1']),
            'users' => User::all('users.id', 'users.name', 'users.profile_picture'),
            'posts' => $posts,
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
?>
