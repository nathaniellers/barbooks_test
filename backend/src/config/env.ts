import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  dbPath: process.env.DB_PATH || 'data/app.db',
  useCloudwatch: process.env.USE_CLOUDWATCH || 'false',
  awsRegion: process.env.AWS_REGION,
  cloudwatchGroup: process.env.CLOUDWATCH_GROUP,
  cloudwatchStream: process.env.CLOUDWATCH_STREAM,
};
