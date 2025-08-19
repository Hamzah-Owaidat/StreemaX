<?php

use App\Http\Controllers\Dashboard\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {

    // Dashboard home
    Route::get('/', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('home');

    // Example: Users management page
    Route::get('/users', [UsersController::class, 'index'])->name('users');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
