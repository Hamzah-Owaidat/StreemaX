import Pagination from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import Actions from '@/components/ui/actions';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import echo from '@/lib/echo';

export default function Users({ users }: { users: User[] }) {
    const { auth } = usePage().props as any; // assuming `auth.user` is available
    const currentUserId = auth.user.id;

    const { patch, delete: destroy } = useForm({});
    const toast = useToast();


    // Toggle user active status
    const handleToggle = (userId: number, isActive: boolean) => {
        if (userId === currentUserId) return;

        patch(route('dashboard.users.toggle', userId), {
            preserveScroll: true,
            preserveState: true,
            data: { is_active: !isActive },
            onSuccess: () => toast.success('User status updated.'),
            onError: () => toast.error('Something went wrong.'),
        });
    };

    const handleDelete = (userId: number) => {
        if (userId === currentUserId) return;

        if (confirm('Are you sure?')) {
            destroy(route('dashboard.users.destroy', userId), {
                preserveScroll: true,
                onSuccess: () => toast.success('User deleted successfully.'),
                onError: () => toast.error('Something went wrong.'),
            });
        }
    };


    return (
        <AppLayout>
            <Head title="Users" />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Users</h1>

                <Table>
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead>ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>DOB</TableHead>
                            <TableHead>Terms Accepted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
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
                                <TableCell className="text-center">
                                    <Switch
                                        checked={user.is_active}
                                        onCheckedChange={() => handleToggle(user.id, user.is_active)}
                                        disabled={user.id === currentUserId}
                                    />
                                </TableCell>
                                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Actions
                                        onEdit={() => console.log('Edit user', user.id)}
                                        onDelete={() => handleDelete(user.id)}
                                    />
                                </TableCell>
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
