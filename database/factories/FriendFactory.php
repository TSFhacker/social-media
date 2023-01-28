<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Friend>
 */
class FriendFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $RandomUserId1 = User::all()->random()->id;
        $RandomUserId2 = User::all()->random()->id; 
        while($RandomUserId1==$RandomUserId2) {
            $RandomUserId2 = User::all()->random()->id;
        }
        return [
            'user_id_1' => $RandomUserId1,
            'user_id_2' => $RandomUserId2
        ];
    }
}
