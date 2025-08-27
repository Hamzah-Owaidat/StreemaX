import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <nav className="flex w-full items-center justify-end gap-4 p-4">
                {auth.user ? (
                    <div className='flex justify-between items-center w-full'>
                        <div className='text-white'>
                            SreemaX
                        </div>

                        {/* make a search input */}
                        <div>
                            <input type="text" />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <UserInfo user={auth.user} showData={false} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="end"
                            >
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </>
    );
}
