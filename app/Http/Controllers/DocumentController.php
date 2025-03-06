<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Elastic\Elasticsearch\ClientBuilder;

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
                            'fields' => ['title', 'content'],
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

        $document = [
            'title' => $request->input('title'),
            'author' => $request->input('author'),
            'date' => $request->input('date'),
            'type' => $request->input('type'),
            'content' => $request->input('content'),
        ];

        $params = [
            'index' => 'documents',
            'body' => $document,
        ];

        try {
            $response = $this->elasticSearch->index($params);
            return redirect()->route('documents.index');
        } catch (\Exception $e) {
            return redirect()->route('documents.index')->with('error', $e->getMessage());
        }
    }
}
