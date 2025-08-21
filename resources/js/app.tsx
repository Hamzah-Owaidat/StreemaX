import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { configureEcho } from '@laravel/echo-react';
import { initializeTheme } from './hooks/use-appearance';
import EchoListener from './listeners/EchoListeners';

// Configure Echo globally
configureEcho({
    broadcaster: 'pusher',
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const { auth } = props.initialPage?.props ?? {};
        const user = auth?.user;

        root.render(
            <>
                <App {...props} />
                <EchoListener user={user} />
                <Toaster position="top-right" />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Initialize theme
initializeTheme();
