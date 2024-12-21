const mongoose = require("mongoose");

const dbConnections = {
  mernCrud: "mongodb://127.0.0.1:27017/mern-crud",
  lab13: "mongodb://127.0.0.1:27017/lab-13",
};
const connections = {};
for (const [name, uri] of Object.entries(dbConnections)) {
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.on("connected", () => {
    console.log(`Connected to database: ${name}`);
  });
  connection.on("error", (err) => {
    console.error(`Database connection error (${name}): ${err}`);
  });
  connections[name] = connection;
}
const getConnection = (name) => {
  if (!connections[name]) {
    throw new Error(`Connection with name "${name}" does not exist.`);
  }
  return connections[name];
};
module.exports = { getConnection };
