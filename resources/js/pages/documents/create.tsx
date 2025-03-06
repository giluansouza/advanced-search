import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface PageProps {
    message?: string;
    success: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Document',
        href: '/documents/create',
    },
];

export default function Create() {
    const { message, success } = usePage<PageProps>().props;

    console.log(message, success);

    const [values, setValues] = useState({
        title: '',
        author: '',
        date: '',
        type: '',
        description: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { id, name, value } = e.target;
        setValues((values) => ({
            ...values,
            [id || name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.post('/documents', values);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documents" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h2 className="text-3xl font-bold">Create a new document</h2>
                        {message && (
                            <div
                                className={`${
                                    success ? 'border-green-400 bg-green-100' : 'border-red-400 bg-red-100'
                                } flex w-full max-w-3xl items-center justify-between rounded-lg border p-4 text-lg font-semibold`}
                            >
                                <span>{message}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center gap-4">
                            <div className="w-full max-w-3xl">
                                <label htmlFor="title" className="text-lg font-semibold">
                                    Title
                                </label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full rounded-lg border border-gray-200 bg-white p-2"
                                    placeholder="Enter the title"
                                />
                            </div>
                            <div className="w-full max-w-3xl">
                                <label htmlFor="author" className="text-lg font-semibold">
                                    Director
                                </label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="author"
                                    id="author"
                                    className="w-full rounded-lg border border-gray-200 bg-white p-2"
                                    placeholder="Who directed this movie?"
                                />
                            </div>
                            <div className="w-full max-w-3xl">
                                <label htmlFor="date" className="text-lg font-semibold">
                                    Date
                                </label>
                                <input
                                    onChange={handleChange}
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="w-full rounded-lg border border-gray-200 bg-white p-2"
                                    placeholder="YYYY-MM-DD"
                                />
                            </div>
                            <div className="w-full max-w-3xl">
                                <label htmlFor="type" className="text-lg font-semibold">
                                    Type
                                </label>
                                <select
                                    onChange={handleChange}
                                    name="type"
                                    id="type"
                                    className="w-full rounded-lg border border-gray-200 bg-white p-2"
                                    value={values.type}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Movie">Movie</option>
                                    <option value="TV Show">TV Show</option>
                                </select>
                            </div>
                            <div className="w-full max-w-3xl">
                                <label htmlFor="author" className="text-lg font-semibold">
                                    Description
                                </label>
                                <textarea
                                    onChange={handleChange}
                                    name="content"
                                    id="content"
                                    className="w-full rounded-lg border border-gray-200 bg-white p-2"
                                    placeholder="Enter a description of the document"
                                />
                            </div>
                            {/* <div> */}
                            <Button className="mb-4 cursor-pointer">Create document</Button>
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
