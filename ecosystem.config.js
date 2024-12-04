module.exports = {
  apps: [
    {
      name: "Pagina_Cumtual",
      script: "./src/app.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        DB_HOST: "5.183.9.167",
        DB_USER: "josue_cumtual",
        DB_PASSWORD: "Password2024$",
        DB_SERVER: "localhost",
        DB_DATABASE: "dbCumtual",
        DB_PORT: 3306,
        EMAIL_MARKETING: "marketing@cumtual.com",
        EMAIL_PASSWORD: "Cumtual2024$",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8000,
        DB_HOST: "localhost",
        DB_USER: "josue_cumtual",
        DB_PASSWORD: "Password2024$",
        DB_SERVER: "localhost",
        DB_DATABASE: "dbCumtual",
        DB_PORT: 3306,
        EMAIL_MARKETING: "marketing@cumtual.com",
        EMAIL_PASSWORD: "Cumtual2024$",
      },
    },
  ],
};
