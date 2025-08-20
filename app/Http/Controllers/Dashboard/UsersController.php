<?php

namespace App\Http\Controllers\Dashboard;

use App\Events\UserDeactivated;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Events\UserDeleted;

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

    public function toggleActive(User $user)
    {
        $authUserId = Auth::id();

        if ($user->id === $authUserId) {
            return back()->with('error', 'You cannot deactivate yourself.');
        }

        $user->is_active = !$user->is_active;
        $user->save();

        if(!$user->is_active) {
            broadcast(new UserDeactivated($user));
        }

        return back()->with('success', 'User status updated.');
    }

    public function destroy(User $user)
    {
        $authUserId = Auth::id();

        if ($user->id === $authUserId) {
            return back()->with('error', 'You cannot delete yourself.');
        }

        // Broadcast the user deletion event
        broadcast(new UserDeleted($user));

        $user->delete();

        // Optionally, you can log the deletion
        \Log::info("User deleted: {$user->id} by Auth User: {$authUserId}");

        return back()->with('success', 'User deleted successfully.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'dob' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $user->update($request->only('username', 'email', 'dob', 'is_active'));

        return back()->with('success', 'User updated successfully.');
    }


}
