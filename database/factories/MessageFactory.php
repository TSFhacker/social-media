<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
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
            'content' => fake()->sentence(),
            'sender_id' => $RandomUserId1,
            'receiver_id' => $RandomUserId2,
            'created_at' => fake()->dateTime(),
            'updated_at' => now()
        ];
    }
}
