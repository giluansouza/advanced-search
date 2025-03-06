import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Document',
        href: '/documents/create',
    },
];

const documents = [
    {
        id: 1,
        title: 'Título de documento',
        date: '20/02/2025',
        excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
        fullContent:
            'Conteúdo completo do documento aqui... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 2,
        title: 'Vue',
        date: '21/02/2025',
        excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
        fullContent: 'Conteúdo completo sobre Vue... Vue.js é um framework progressivo para construção de interfaces de usuário.',
    },
    {
        id: 3,
        title: 'Angular',
        date: '22/02/2025',
        excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
        fullContent: 'Conteúdo completo sobre Angular... Angular é uma plataforma de desenvolvimento baseada em TypeScript.',
    },
    {
        id: 4,
        title: 'Next.js',
        date: '23/02/2025',
        excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
        fullContent: 'Conteúdo completo sobre Next.js... Next.js é um framework React com renderização híbrida.',
    },
];

export default function Documents() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <div className="flex flex-col items-center justify-center gap-4 bg-blue-500 p-10">
                        <h2 className="text-3xl font-bold text-white">Find the documentation you need</h2>
                        <div className="relative w-full max-w-3xl">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="text-white" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full rounded-full border border-zinc-200 bg-white py-2 pr-12 pl-10 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            />
                        </div>
                        <button className="flex w-1/3 cursor-pointer items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-200 hover:bg-orange-400">
                            Search
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-bold">Result Searches</h3>
                            <div className="mt-8 flex w-full max-w-5xl flex-col gap-4">
                                {documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        // onClick={() => openModal(doc)}
                                        className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">{doc.title}</h4>
                                            <span className="text-gray-500">{doc.date}</span>
                                        </div>
                                        <p className="mt-2 text-gray-500">
                                            {doc.excerpt} <span className="font-semibold text-blue-500">Read more</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
