<?php

use App\Http\Controllers\Dashboard\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dashboard routes - restricted to admin users only
Route::middleware(['auth', 'verified', 'admin'])->prefix('dashboard')->name('dashboard.')->group(function () {

    // Dashboard home
    Route::get('/', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');

    // Users management routes
    Route::get('/users', [UsersController::class, 'index'])->name('users');
    Route::patch('/users/{user}/toggle', [UsersController::class, 'toggleActive'])->name('users.toggle');
    Route::patch('/users/{user}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('users.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
