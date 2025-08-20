import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
});

console.log('Echo configured with Pusher:', {
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
});

if (!import.meta.env.VITE_PUSHER_APP_KEY || !import.meta.env.VITE_PUSHER_APP_CLUSTER) {
  console.warn('Pusher configuration is missing. Ensure VITE_PUSHER_APP_KEY and VITE_PUSHER_APP_CLUSTER are set.');
}

export default echo;
