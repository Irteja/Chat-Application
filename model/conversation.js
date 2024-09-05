const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    creator: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String,
    },
    participant: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String,
    },
    last_update: {
        type: Date,
        default: Date.now(),
    },

}, {
    timestamps: true,
});

const conversation=mongoose.model("Conversations",conversationSchema);

module.exports=conversation;