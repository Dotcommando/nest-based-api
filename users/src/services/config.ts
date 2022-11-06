export default () => ({
  environment: process.env.ENVIRONMENT,
  host: process.env.USER_SERVICE_HOST,
  port: process.env.USER_SERVICE_PORT,
});
