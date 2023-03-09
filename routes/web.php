<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\ChatController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/{path?}', function () {
//     return view('welcome');
// })->where('path', '.*');

Route::post('/like', [PostLikeController::class, 'like']);
Route::post('/dislike', [PostLikeController::class, 'dislike']);
Route::post('/addpost', [PostController::class, 'create']);
Route::post('/comment', [CommentController::class, 'comment']);
Route::post('/acceptfriend', [FriendController::class, 'accept']);
Route::post('/declinefriend', [FriendController::class, 'decline']);
Route::post('/friendrequest', [FriendController::class, 'create']);

Route::middleware('auth')->group(function()
{
    Route::get('/chat', function () {
        return Inertia::render('Chat/Chat');
    });
    Route::get('/', [PostController::class, 'index']);
    Route::get('/account/{id}', [AccountController::class, 'account'])->name('account.account');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);
    Route::group(['middleware' => 'checkRole:1'], function () {
        Route::get('/admin/view.users', [AdminController::class, 'view_users']);
        Route::get('/admin/view.posts', [AdminController::class, 'view_posts']);
        Route::get('/admin/view.post_comment/{id}', [AdminController::class, 'view_post_comments']);
        Route::get('/admin/view.post_comment/{id}', [AdminController::class, 'view_post_comments']);
        Route::get('/admin/view.user_post/{id}', [AdminController::class, 'view_user_posts']);

        Route::get('/admin/view.comments', [AdminController::class, 'view_comments']);
        Route::get('/admin/delete.post/{id}', [AdminController::class, 'delete_post']);
        Route::get('/admin/delete.comment/{id}', [AdminController::class, 'delete_comment']);
    });


    Route::group(['middleware' => 'checkRole:0'], function () {
        Route::post('/like', [PostLikeController::class, 'like']);
        Route::post('/dislike', [PostLikeController::class, 'dislike']);
        Route::post('/addpost', [PostController::class, 'create']);
        Route::post('/comment', [CommentController::class, 'comment']);
        Route::post('/acceptfriend', [FriendController::class, 'accept']);
        Route::post('/declinefriend', [FriendController::class, 'decline']);
        Route::post('/friendrequest', [FriendController::class, 'create']);
        Route::get('/account/{id}', [AccountController::class, 'account'])->name('account.account');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get('/', [PostController::class, 'index'])->name('post');
        Route::get('/chat', function () {
            return Inertia::render('Chat/Chat');
        });
    });
});

require __DIR__ . '/auth.php';
