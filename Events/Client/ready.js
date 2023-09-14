const { Client, ModalBuilder } = require("discord.js");
const mongoose = require("mongoose");
const config = require("../../config");
require("dotenv").config();
const mongolink = process.env.MONGODB;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await mongoose.connect(mongolink || "");

    if (mongoose.connect) {
      console.log("MongoDB connected");
    }

    console.log(
      `Successfully logged in as ${client.user.username} (${client.user.id})`
    );
  },
};
