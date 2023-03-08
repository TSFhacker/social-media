<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
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


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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

        Route::get('/', function () {
            return Inertia::render('Chat/Chat');
        });
    });
});

require __DIR__ . '/auth.php';
