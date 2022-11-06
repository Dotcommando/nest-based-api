import { Transport } from '@nestjs/microservices';

export default () => ({
  port: process.env.USER_GATEWAY_PORT,
  corsOrigin: process.env.USER_CORS_ORIGIN,
  environment: process.env.ENVIRONMENT,
  userService: {
    options: {
      port: process.env.USER_SERVICE_PORT,
      host: process.env.USER_SERVICE_HOST,
    },
    transport: Transport.TCP,
  },
});
