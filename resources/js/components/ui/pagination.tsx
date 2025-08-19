import { Link } from '@inertiajs/react';

export default function Pagination({ links }: { links: any[] }) {
    if (!links) return null;

    return (
        <nav className="flex items-center space-x-2">
            {links.map((link: any, index: number) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    className={`px-3 py-1 rounded ${
                        link.active
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    preserveScroll
                />
            ))}
        </nav>
    );
}

