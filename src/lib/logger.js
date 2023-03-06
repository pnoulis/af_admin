import pino from "pino";

const options = {
  name: "af_admin",
  browser: {
    asObject: true,
  },
};

if (import.meta.env.PROD) {
  options.level = "warn";
} else {
  options.level = "trace";
}

const logger = pino(options);

export { logger };
