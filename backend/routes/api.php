<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TowingRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('requests')->group(function () {
    Route::get('/', [TowingRequestController::class, 'index']);
    Route::post('/', [TowingRequestController::class, 'store']);
    Route::get('/{id}', [TowingRequestController::class, 'show']);
    Route::put('/{id}', [TowingRequestController::class, 'update']);
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'timestamp' => now()
    ]);
});
