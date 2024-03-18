import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';

export function register() {
  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'heikki-next-app',
      // NOTE: You can replace `your-project-name` with the actual name of your project
    }),
    spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
    instrumentations: [
      new PgInstrumentation({ addSqlCommenterCommentToQueries: true })
    ]
  });
 
  sdk.start();
}
