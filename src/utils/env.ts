const requiredEnvVars = [
    "DB_HOST",
    "DB_PORT", 
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
] as const;

for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

export const env = {
    db: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        name: process.env.DB_NAME!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
    },
    port: Number(process.env.PORT ?? 3000),
    backendUrl: process.env.BACKEND_URL!,
    frontendUrl: process.env.FRONTEND_URL!,
}