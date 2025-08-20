import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import echo from '@/lib/echo';

interface EchoListenerProps {
    user?: { id: number };
}

const eventHandlers: Record<
    string,
    (event: any) => void
> = {
    UserDeactivated: () => {
        console.log('UserDeactivated event received');
        toast.error('You have been deactivated! Logging out...');
        router.post(route('logout'));
    },
    UserDeleted: () => {
        console.log('UserDeleted event received');
        toast.error('Your account has been deleted. Logging out...');
        router.post(route('logout'));
    },
    // 🔥 Add new events here in the future
};

export default function EchoListener({ user }: EchoListenerProps) {
    const userId = user?.id; // simple alias

    useEffect(() => {
        if (!userId) return;

        const channel = echo.private(`user.${userId}`);

        Object.entries(eventHandlers).forEach(([eventName, handler]) => {
            channel.listen(eventName, handler);
        });

        return () => {
            Object.keys(eventHandlers).forEach((eventName) => {
                channel.stopListening(eventName);
            });
        };
    }, [userId]);

    return null;
}

