<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin', 'display_name' => 'Admin']);
        $moderator = Role::create(['name' => 'moderator', 'display_name' => 'Moderator']);
        $streamer = Role::create(['name' => 'streamer', 'display_name' => 'Streamer']);
        $user = Role::create(['name' => 'user', 'display_name' => 'User']);

        // Permissions
        $manageUsers = Permission::create(['name' => 'manage-users', 'display_name' => 'Manage Users']);
        $deleteStream = Permission::create(['name' => 'delete-stream', 'display_name' => 'Delete Stream']);
        $banUser = Permission::create(['name' => 'ban-user', 'display_name' => 'Ban User']);
        $editStream = Permission::create(['name' => 'edit-stream', 'display_name' => 'Edit Stream']);

        // Assign permissions to roles
        $admin->attachPermissions([$manageUsers, $deleteStream, $banUser, $editStream]);
        $moderator->attachPermissions([$deleteStream, $banUser]);
        $streamer->attachPermission($editStream);
    }
}
