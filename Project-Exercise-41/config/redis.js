const { createClient } = require("redis");

console.log("REDIS URL:", process.env.REDIS_URL);

const client = createClient({
  url: process.env.REDIS_URL,
  socket:{
    tls:true
  } 
});

client.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  await client.connect();
  console.log("Redis Connected");
};

module.exports = { client, connectRedis };