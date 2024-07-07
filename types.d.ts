declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    REDIS_USER_NAME?: string;
    REDIS_PASSWORD?: string;
    SECONDS_ALLOWED_TO_INCREASE_VIEWS?: string;
  }
}
