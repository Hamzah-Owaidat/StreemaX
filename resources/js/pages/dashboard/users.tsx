
import Pagination from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';

export default function Users({ users }: { users: User[] }) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Users</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>DOB</TableHead>
                            <TableHead>Terms Accepted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>
                                    {user.roles.map((role: any) => role.name).join(', ')}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.dob}</TableCell>
                                <TableCell>{user.terms_accepted ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{user.is_active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="mt-4">
                    <Pagination links={users.links} />
                </div>
            </div>
        </AppLayout>
    );
}
