const mongoose = require("mongoose")
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    } ,
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is not valid`,
      },
      required: true,
    },
  },
  {timestamps: true},
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1}, {unique: true})

module.exports = mongoose.model(
  "connectionRequest", connectionRequestSchema
)