<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \Laratrust\Middleware\Role::class,
            'permission' => \Laratrust\Middleware\Permission::class,
            'ability' => \Laratrust\Middleware\Ability::class,
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        
        $exceptions->render(function (HttpException $ex, Request $request) {
            $statusCode = $ex->getStatusCode();
            // Use Inertia for React-based error pages
            if ($statusCode === 404) {
                return inertia('errors/Error404')->toResponse($request)->setStatusCode(404);
            }
            if ($statusCode === 500) {
                return inertia('errors/Error500')->toResponse($request)->setStatusCode(500);
            }
        });

        // Catch any other unexpected exceptions
        $exceptions->render(function (Throwable $th, Request $request) {
            return inertia('Error500')->toResponse($request)->setStatusCode(500);
        });
    })->create();
