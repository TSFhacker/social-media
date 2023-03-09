<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Friend;


class AccountController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function account($id, Request $request)
    {
        $user = User::find($id);
        return Inertia::render('Profile/Account', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user,
            'users' => User::all('users.id', 'users.name', 'users.profile_picture'),
            'friendrequests' => Friend::join('users', 'users.id', '=', 'friends.user_id_1')
                                        ->where([['friends.user_id_2', '=', auth()->user()->id], 
                                                ['friends.state', '=', 0]])->get(['users.name', 'friends.id', 'friends.user_id_1']),
        ]);
    }
}
