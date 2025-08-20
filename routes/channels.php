<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('user.{userId}', function ($user, $userId) {
    // Ensure the user is authenticated and matches the userId
    if (!$user || !isset($user->id)) {
        return false;
    }

    \Log::info("Broadcasting to user channel: user.{$userId} for user ID: {$user->id}");

    // Allow access only if the authenticated user's ID matches the userId
    return (int) $user->id === (int) $userId;
});


