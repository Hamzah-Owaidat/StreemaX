<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $commonPassword = 'password123';

        for ($i = 0; $i < 50; $i++) {
            $user = User::create([
                'username' => $faker->unique()->userName,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make($commonPassword),
                'dob' => $faker->date('Y-m-d', '2005-12-31'),
                'profile_photo' => null,
                'is_streamer' => $faker->boolean(20), // 20% chance to be a streamer
                'is_active' => true,
                'wallet_balance' => $faker->randomFloat(2, 0, 100),
                'provider' => null,
                'provider_id' => null,
                'terms_accepted' => 1, // all users accepted terms
            ]);

            // Assign 'user' role using Laratrust
            $user->addRole('user');
        }

        $this->command->info('50 users seeded successfully with the "user" role and terms accepted.');
    }
}
