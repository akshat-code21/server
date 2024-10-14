import { z } from 'zod';
import { config } from 'dotenv';

const envSchema = z.object({
  SERVER_PORT: z.string(),
  JWT_SIGNING_KEY: z.string(),
  JWT_EXPIRY: z.string(),
  DATABASE_URL: z.string(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_SERVICE_SID: z.string(),
  TWILIO_PHONE_NUMBER: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
  AWS_S3_BUCKET_REGION: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_SECURE: z.string(),
  SMTP_HOST_USER: z.string(),
  SMTP_HOST_PASS: z.string(),
});

export const parseEnv = (): void => {
  config();
  envSchema.parse(process.env);
};

const getEnvVar = (key: keyof z.infer<typeof envSchema>): string => {
  return process.env[key] as string;
};

export default getEnvVar;
