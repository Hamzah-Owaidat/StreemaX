import '../css/app.css';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'react-hot-toast';
import { configureEcho } from '@laravel/echo-react';
import echo from '@/lib/echo';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


// Configure Echo
configureEcho({
    broadcaster: 'pusher',
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Helper component to handle Echo events
        function EchoListener() {
            useEffect(() => {
                const currentUserId = props.initialPage?.props?.auth?.user?.id;

                if (!currentUserId) return;

                const channel = echo.private(`user.${currentUserId}`);

                channel.listen('UserDeactivated', (event: any) => {
                    console.log('UserDeactivated event received', event);
                    toast.error('You have been deactivated! Logging out...');
                    router.post(route('logout'));
                });

                return () => {
                    channel.stopListening('UserDeactivated');
                };
            }, [props.initialPage?.props?.auth?.user?.id]);

            return null;
        }

        root.render(
            <>
                <App {...props} />
                <EchoListener />
                <Toaster position="top-right" />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Initialize theme (light / dark)
initializeTheme();
