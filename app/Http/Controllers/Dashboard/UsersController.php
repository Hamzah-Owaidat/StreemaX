<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UsersController extends Controller
{
    public function index()
{
    $users = User::with('roles')
        ->select('id', 'username', 'email', 'dob', 'terms_accepted', 'is_active', 'created_at')
        ->paginate(5); // paginate for easier table handling

    return Inertia::render('dashboard/users', [
        'users' => $users
    ]);
}
}
