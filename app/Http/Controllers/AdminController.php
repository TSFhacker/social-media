<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function view_users(){
        return Inertia::render('Admin/User', [
            'users' => User::all()->map(function($user){
                return [
                    'id'=> $user->id,
                    'name'=> $user->name,
                    'avatar'=>$user->profile_picture,
                    'birthday'=>$user->birthday,
                    'email'=>$user->email,
                    'created_at'=>$user->created_at
                ];
            }),
        ]);
    }

    public function view_posts(){
        return Inertia::render('Admin/Post',[
            'posts' => Post::all()->map(function($post){
                return[
                    'id'=>$post->id,
                    'content'=>$post->content,
                    'image'=>$post->image,
                    'created_at'=>$post->created_at,
                    'updated_at'=>$post->updated_at,
                    // 'user_id'=>$post->user_id,
                ];
            })
        ]);
        
    }

    public function view_comments(){
        return Inertia::render('Admin/Comment',[
            'comments' => Comment::all()->map(function($comment){
                return[
                    'id'=>$comment->id,
                    'content'=>$comment->content,
                    // 'post_id'=>$comment->post_id,
                    // 'user_id'=>$comment->user_id,
                    'created_at'=>$comment->created_at,
                    'updated_at'=>$comment->updated_at,
                ];
            })
        ]);
        
    }

    public function view_post_comments($id){
        $post = Post::findOrFail($id);
        $comments = DB::table('comments')->where('post_id','=',$id)->get();
        return Inertia::render('Admin/Post_Comment',[
            'post'=>$post,
            'comments' => $comments->map(function($comment){
                return[
                    'id'=>$comment->id,
                    'content'=>$comment->content,
                    // 'post_id'=>$comment->post_id,
                    // 'user_id'=>$comment->user_id,
                    'created_at'=>$comment->created_at,
                    'updated_at'=>$comment->updated_at,
                ];
            })
        ]);
    }

    public function view_user_posts($id){
        $user = User::findOrFail($id);
        $posts = DB::table('posts')->where('user_id','=',$id)->get();
        $comments = DB::table('comments')->where('user_id','=',$id)->get();

        return Inertia::render('Admin/User_Post',[
            'user'=>$user,
            'posts' => $posts->map(function($post){
                return[
                    'id'=>$post->id,
                    'content'=>$post->content,
                    'image'=>$post->image,
                    'created_at'=>$post->created_at,
                    'updated_at'=>$post->updated_at,
                ];
            }),
            'comments' => $comments->map(function($comment){
                return[
                    'id'=>$comment->id,
                    'content'=>$comment->content,
                    'created_at'=>$comment->created_at,
                    'updated_at'=>$comment->updated_at,
                ];
            })
        ]);
    }

    public function delete_post($id){
        $post = Post::findOrFail($id);
        $post->delete();
        Session()->flash('success','Post deleted successfully');
    }

    public function delete_comment($id){
        $comment = Comment::findOrFail($id);
        $comment->delete();
        Session()->flash('success','Comment deleted successfully');
    }
}
?>
