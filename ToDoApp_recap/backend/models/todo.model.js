"use strict";
const mongoose = require("mongoose");

const PRIORITIES = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
};

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    priority: {
      //low, normal,high
      type: String,
      enum: {
        values: Object.values(PRIORITIES),
        message: "low,normal, high could be select",
      },
      default: "normal",
    },
  },
  {
    collection: "todo",
    timestamps: true,
  },
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
