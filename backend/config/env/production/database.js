module.exports = ({ env }) => {
  // Google Cloud SQL (Unix socket)
  if (env("INSTANCE_CONNECTION_NAME")) {
    return {
      connection: {
        client: "postgres",
        connection: {
          host: `/cloudsql/${env("INSTANCE_CONNECTION_NAME")}`,
          database: env("DATABASE_NAME"),
          user: env("DATABASE_USER"),
          password: env("DATABASE_PASSWORD"),
        },
      },
    };
  }

  // Single connection string (Railway, Render, Heroku-style)
  if (env("DATABASE_URL")) {
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: env("DATABASE_URL"),
          ssl: env.bool("DATABASE_SSL", false) && { rejectUnauthorized: false },
        },
      },
    };
  }

  // Discrete host/port/user/password vars
  return {
    connection: {
      client: "postgres",
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "polluxa_dev"),
        user: env("DATABASE_USERNAME", "postgres"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  };
};
