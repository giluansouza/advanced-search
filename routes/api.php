<?php

use App\Http\Controllers\Api\DocumentController;
use Elastic\Elasticsearch\ClientBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/documents', [DocumentController::class, 'index']);

// Route::get('/test-elasticsearch', function () {
//     $host = env('ELASTICSEARCH_SCHEME', 'http') . '://' . env('ELASTICSEARCH_HOST', 'elasticsearch') . ':' . env('ELASTICSEARCH_PORT', '9200');

//     try {
//         $client = ClientBuilder::create()
//             ->setHosts([$host])
//             ->build();

//         return $client->info();
//     } catch (\Exception $e) {
//         return response()->json(['error' => $e->getMessage()], 500);
//     }
// });
