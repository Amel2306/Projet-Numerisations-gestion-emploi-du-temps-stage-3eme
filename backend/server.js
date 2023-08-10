const http = require("http");
const app = require("./app");
const sequelize = require("./config/dbConfig");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection established and models synced.");

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database or sync models:", error);
  }
})();
