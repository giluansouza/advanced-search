import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { PlusIcon, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Documents',
        href: '/documents',
    },
];

// const documents = [
//     {
//         id: 1,
//         title: 'Título de documento',
//         date: '20/02/2025',
//         excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
//         fullContent:
//             'Conteúdo completo do documento aqui... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     },
//     {
//         id: 2,
//         title: 'Vue',
//         date: '21/02/2025',
//         excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
//         fullContent: 'Conteúdo completo sobre Vue... Vue.js é um framework progressivo para construção de interfaces de usuário.',
//     },
//     {
//         id: 3,
//         title: 'Angular',
//         date: '22/02/2025',
//         excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
//         fullContent: 'Conteúdo completo sobre Angular... Angular é uma plataforma de desenvolvimento baseada em TypeScript.',
//     },
//     {
//         id: 4,
//         title: 'Next.js',
//         date: '23/02/2025',
//         excerpt: 'Trecho do texto do documento pesquisado e retornado pelo sistema',
//         fullContent: 'Conteúdo completo sobre Next.js... Next.js é um framework React com renderização híbrida.',
//     },
// ];

export default function Documents() {
    const { documents, errorMessage, searchQuery } = usePage().props;
    const [values, setValues] = useState({
        search: searchQuery || '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.get('/documents', { query: values.search });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <div> */}
                <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
                    <div className="flex w-full flex-row items-center justify-center gap-4">
                        <h3 className="text-3xl font-bold">Search for documents</h3>
                        <a
                            href="/documents/create"
                            className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-blue-400 px-4 py-2 text-white shadow-md transition-all duration-200 hover:bg-blue-300"
                        >
                            <PlusIcon className="text-white" />
                            <span className="hidden flex-row sm:flex sm:gap-1">
                                Create <span className="hidden lg:block">document</span>
                            </span>
                        </a>
                    </div>
                    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center gap-4">
                        <div className="relative w-full max-w-3xl">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="text-blue-500" />
                            </span>
                            <input
                                id="search"
                                name="search"
                                value={values.search}
                                onChange={handleChange}
                                type="text"
                                placeholder="Search for documents"
                                className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-10 shadow focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            />
                        </div>
                        <div className="flex w-full flex-row items-center justify-center gap-4">
                            <button className="flex w-1/3 cursor-pointer items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-200 hover:bg-orange-400">
                                Search
                            </button>
                            <a
                                href="/documents"
                                className="rounded-full bg-zinc-500 p-2 text-red-500 shadow-md transition-all duration-200 hover:bg-red-400"
                            >
                                <Trash2 className="text-white" />
                            </a>
                        </div>
                    </form>
                </div>

                <div className="mt-6">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold">Search result</h3>
                        {errorMessage && <p className="text-red-500">{String(errorMessage)}</p>}
                        <div className="mt-8 flex w-full max-w-5xl flex-col gap-4">
                            {documents && documents.length > 0 ? (
                                documents.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">{doc._source.title}</h4>
                                            <span className="text-gray-500">{doc._source.date || 'No date'}</span>
                                        </div>
                                        <p className="mt-2 text-gray-500">
                                            {doc._source.content.substring(0, 100)}...
                                            <span className="font-semibold text-blue-500"> Read more</span>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No documents found.</p>
                            )}
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </AppLayout>
    );
}
