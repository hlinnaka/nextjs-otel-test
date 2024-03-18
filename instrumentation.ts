import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel({
    serviceName: 'heikki-next-app',
    instrumentations: [ 'fetch', 'auto' ]
  });

  const { registerInstrumentations } = await import(
    "@opentelemetry/instrumentation"
  );

  const { PgInstrumentation } = await import("@opentelemetry/instrumentation-pg");
    
  registerInstrumentations({
    instrumentations: [
      new PgInstrumentation(),
    ],
  });
}
