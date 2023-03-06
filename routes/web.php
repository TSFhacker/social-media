<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use Illuminate\Foundation\Application;
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

Route::middleware('auth')->group(function()
{
    Route::get('/chat', function () {
        return Inertia::render('Chat/Chat');
    });
    Route::get('/', [PostController::class, 'index']);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/account/{id}', [AccountController::class, 'account'])->name('account.account');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route::get('/Home', [PostController::class, 'index'])->name('post');
});

require __DIR__.'/auth.php';
