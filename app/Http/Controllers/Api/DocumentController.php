<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentMetadata;
use Elastic\Elasticsearch\ClientBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    private $elasticSearch;

    public function __construct()
    {
        $this->elasticSearch = ClientBuilder::create()
            ->setHosts([env('ELASTICSEARCH_SCHEME', 'http') . '://' . env('ELASTICSEARCH_HOST', 'elasticsearch') . ':' . env('ELASTICSEARCH_PORT', '9200')])
            ->build();
    }

    /**
     * Retorna todos os documentos sem autenticação.
     */
    public function index(): JsonResponse
    {
        // Retornar todos os documentos do elastic search
        $searchParams = [
            'index' => 'documents',
            'body' => [
                'query' => [
                    'match_all' => (object) []
                ],
            ],
        ];
        $response = $this->elasticSearch->search($searchParams);
        $documents = $response['hits']['hits'];

        return response()->json($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
