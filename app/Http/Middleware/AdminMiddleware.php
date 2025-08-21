<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Redirect guest to login
        if (! $user) {
            return redirect()->route('login');
        }

        // Abort if not admin
        if (!$user || !$user->hasRole('admin')) {
            return Inertia::render('errors/Error403', [
                'message' => 'Access denied. Admin privileges required.',
            ])->toResponse($request)
            ->setStatusCode(403);
        }

        return $next($request);
    }
}
