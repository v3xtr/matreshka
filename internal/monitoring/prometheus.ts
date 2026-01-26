import {
    Registry,
    Counter,
    Histogram,
    Gauge,
    collectDefaultMetrics,
    HistogramConfiguration,
    CounterConfiguration,
    GaugeConfiguration
} from 'prom-client';
import { Request, Response, NextFunction } from 'express';

export class MetricsCollector {
    private readonly registry: Registry;
    private readonly httpRequestsTotal: Counter<string>;
    private readonly httpRequestDuration: Histogram<string>;
    private readonly activeConnections: Gauge<string>;
    private readonly errorsTotal: Counter<string>;
    private readonly databaseQueriesTotal: Counter<string>;
    private readonly cacheHitsTotal: Counter<string>;

    constructor(private readonly serviceName: string) {
        this.registry = new Registry();

        collectDefaultMetrics({
            register: this.registry,
            prefix: 'node_',
        });

        const httpRequestsConfig: CounterConfiguration<string> = {
            name: 'http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'path', 'status_code', 'service'] as const,
        };
        this.httpRequestsTotal = new Counter(httpRequestsConfig);
        this.registry.registerMetric(this.httpRequestsTotal);

        const httpDurationConfig: HistogramConfiguration<string> = {
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'path', 'status_code', 'service'] as const,
            buckets: [0.1, 0.3, 0.5, 1, 2, 5, 10]
        };
        this.httpRequestDuration = new Histogram(httpDurationConfig);
        this.registry.registerMetric(this.httpRequestDuration);

        const errorsConfig: CounterConfiguration<string> = {
            name: 'errors_total',
            help: 'Total number of errors',
            labelNames: ['type', 'service'] as const,
        };
        this.errorsTotal = new Counter(errorsConfig);
        this.registry.registerMetric(this.errorsTotal);

        const activeConnectionsConfig: GaugeConfiguration<string> = {
            name: 'active_connections',
            help: 'Number of active connections',
            labelNames: ['service'] as const,
        };
        this.activeConnections = new Gauge(activeConnectionsConfig);
        this.registry.registerMetric(this.activeConnections);

        const dbQueriesConfig: CounterConfiguration<string> = {
            name: 'database_queries_total',
            help: 'Total number of database queries',
            labelNames: ['operation', 'service'] as const,
        };
        this.databaseQueriesTotal = new Counter(dbQueriesConfig);
        this.registry.registerMetric(this.databaseQueriesTotal);

        const cacheHitsConfig: CounterConfiguration<string> = {
            name: 'cache_hits_total',
            help: 'Total number of cache hits',
            labelNames: ['cache_type', 'service'] as const,
        };
        this.cacheHitsTotal = new Counter(cacheHitsConfig);
        this.registry.registerMetric(this.cacheHitsTotal);
    }

     getMiddleware() {
        return (req: Request, res: Response, next: NextFunction): void => {
            const start = process.hrtime();

            // Ловим завершение response
            res.on('finish', () => {
                const [seconds, nanoseconds] = process.hrtime(start);
                const duration = seconds + nanoseconds / 1e9;
                const path = this.normalizePath(req.path);

                this.recordHttpRequest(
                    req.method,
                    path,
                    res.statusCode,
                    duration
                );
            });

            res.on('close', () => {
                if (!res.writableEnded) {
                    this.recordError('connection_closed', 'HTTP connection closed prematurely');
                }
            });

            next();
        };
    }


     recordHttpRequest(
        method: string,
        path: string,
        statusCode: number,
        durationSeconds: number
    ): void {
        this.httpRequestsTotal.inc({
            method,
            path,
            status_code: statusCode.toString(),
            service: this.serviceName
        });

        this.httpRequestDuration.observe(
            {
                method,
                path,
                status_code: statusCode.toString(),
                service: this.serviceName
            },
            durationSeconds
        );
    }

    recordError(type: string, message?: string): void {
        this.errorsTotal.inc({
            type,
            service: this.serviceName
        });

        if (message) {
            console.error(`[${this.serviceName}] Error ${type}: ${message}`);
        }
    }

    recordDatabaseQuery(operation: string): void {
        this.databaseQueriesTotal.inc({
            operation,
            service: this.serviceName
        });
    }

    recordCacheHit(cacheType: string): void {
        this.cacheHitsTotal.inc({
            cache_type: cacheType,
            service: this.serviceName
        });
    }

    updateActiveConnections(count: number): void {
        this.activeConnections.set({ service: this.serviceName }, count);
    }
    
     async getMetrics(): Promise<string> {
        return await this.registry.metrics();
    }
    
     getHealthCheckHandler() {
        return (_req: Request, res: Response): void => {
            res.json({
                status: 'healthy',
                service: this.serviceName,
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage()
            });
        };
    }


    getMetricsHandler() {
        return async (_req: Request, res: Response): Promise<void> => {
            try {
                const metrics = await this.getMetrics();
                res.set('Content-Type', this.registry.contentType);
                res.send(metrics);
            } catch (error) {
                this.recordError('metrics_fetch_error', (error as Error).message);
                res.status(500).json({ error: 'Failed to fetch metrics' });
            }
        };
    }

    private normalizePath(path: string): string {
        return path.replace(/\/\d+/g, '/:id').replace(/\/[a-f0-9-]{36}/gi, '/:uuid');
    }
}