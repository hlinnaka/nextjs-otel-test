import { registerOTel } from '@vercel/otel';
 
export function register() {
  registerOTel({
    serviceName: 'heikki-next-app',
    instrumentations: [ 'fetch', 'auto' ]
  });
}
