<?php

namespace App\Http\Controllers;

use App\Models\DocumentMetadata;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Elastic\Elasticsearch\ClientBuilder;
use Illuminate\Support\Facades\Log;

class DocumentController extends Controller
{
    private $elasticSearch;

    public function __construct()
    {
        $this->elasticSearch = ClientBuilder::create()
            ->setHosts([env('ELASTICSEARCH_SCHEME', 'http') . '://' . env('ELASTICSEARCH_HOST', 'elasticsearch') . ':' . env('ELASTICSEARCH_PORT', '9200')])
            ->build();
    }

    public function index(Request $request)
    {
        $searchQuery = $request->query('query');
        $documents = [];
        $errorMessage = null;

        if ($searchQuery) {
            $request->validate([
                'query' => 'required|string|min:3',
            ]);
            $searchParams = [
                'index' => 'documents',
                'body' => [
                    'query' => [
                        'multi_match' => [
                            'query' => $searchQuery,
                            'fields' => ['title', 'author', 'content'],
                            'fuzziness' => 'AUTO',
                        ]
                    ],
                ],
            ];
            try {
                $response = $this->elasticSearch->search($searchParams);
                $documents = $response['hits']['hits'];
            } catch (\Exception $e) {
                $errorMessage = $e->getMessage();
            }
        }

        return Inertia::render('documents/documents', [
            'documents' => $documents,
            'errorMessage' => $errorMessage,
            'searchQuery' => $searchQuery,
        ]);
    }

    public function create()
    {
        return Inertia::render('documents/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:3',
            'author' => 'nullable|string',
            'date' => 'nullable|date',
            'type' => 'required|string',
            'content' => 'required|string',
        ]);
        $success = false;
        $message = '';
        $document = DocumentMetadata::create($request->all());

        try {
            // Ensure "documents" index exists in Elasticsearch
            $indexParams = ['index' => 'documents'];
            if (!$this->elasticSearch->indices()->exists($indexParams)) {
                $this->elasticSearch->indices()->create([
                    'index' => 'documents',
                    'body'  => [
                        'settings' => [
                            'number_of_shards' => 1,
                            'number_of_replicas' => 0
                        ],
                        'mappings' => [
                            'properties' => [
                                'title' => ['type' => 'text'],
                                'author' => ['type' => 'keyword'],
                                'date' => ['type' => 'date'],
                                'type' => ['type' => 'keyword'],
                                'content' => ['type' => 'text']
                            ]
                        ]
                    ]
                ]);
            }

            $this->elasticSearch->index([
                'index' => 'documents',
                'id' => $document->id,
                'body' => [
                    'title' => $document->title,
                    'author' => $document->author,
                    'date' => $document->date,
                    'type' => $document->type,
                    'content' => $document->content
                ]
            ]);

            $message = 'Document created successfully';
            $success = true;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            $message = 'Failed to create document';
            $success = false;
        }

        return Inertia::render('documents/create', [
            'message' => $message,
            'success' => $success,
        ]);
    }
}
