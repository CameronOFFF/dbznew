import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? "dev_secret",
  refreshSecret: process.env.REFRESH_SECRET ?? "dev_refresh",
  jwtTtl: process.env.JWT_TTL ?? "15m",
  refreshTtlDays: Number(process.env.REFRESH_TTL_DAYS ?? 14),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  legacyMd5: process.env.LEGACY_MD5 === "true",
  storageDriver: process.env.STORAGE_DRIVER ?? "local",
  storageLocalPath: process.env.STORAGE_LOCAL_PATH ?? "uploads",
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3AccessKey: process.env.S3_ACCESS_KEY ?? "",
  s3SecretKey: process.env.S3_SECRET_KEY ?? ""
};
