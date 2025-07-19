<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TowingRequest;

class TowingRequestSeeder extends Seeder
{
    public function run(): void
    {
        $requests = [
            [
                'customer_name' => 'Ahmed Al-Rashid',
                'location' => 'Sheikh Zayed Road, Dubai, near Mall of the Emirates',
                'note' => 'Car broke down in the middle lane, need urgent assistance',
                'status' => 'pending',
                'created_at' => now()->subMinutes(30),
                'updated_at' => now()->subMinutes(30),
            ],
            [
                'customer_name' => 'Sarah Johnson',
                'location' => 'Jumeirah Beach Road, Dubai Marina',
                'note' => 'Flat tire, parked safely on the side',
                'status' => 'accepted',
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subMinutes(45),
            ],
            [
                'customer_name' => 'Mohammed Hassan',
                'location' => 'Al Wasl Road, Jumeirah, near City Walk',
                'note' => 'Engine overheating, smoke coming from hood',
                'status' => 'in_progress',
                'created_at' => now()->subHours(1),
                'updated_at' => now()->subMinutes(15),
            ],
            [
                'customer_name' => 'Lisa Chen',
                'location' => 'Dubai International Airport, Terminal 3 parking',
                'note' => 'Battery dead, need jump start or towing',
                'status' => 'completed',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subHours(22),
            ],
            [
                'customer_name' => 'Omar Al-Mansouri',
                'location' => 'Business Bay, near Burj Khalifa',
                'note' => null,
                'status' => 'pending',
                'created_at' => now()->subMinutes(10),
                'updated_at' => now()->subMinutes(10),
            ]
        ];

        foreach ($requests as $request) {
            TowingRequest::create($request);
        }
    }
}
