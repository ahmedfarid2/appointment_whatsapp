import { markMessageAsRead } from "../../services/whatsapp.services.js";

import { asyncHandler } from "../../utils/errorHandling.js";
import {
  handleInteractiveMessage,
  handleTextMessage,
} from "../../utils/handlingMessagesReplay.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { "hub.verify_token": verifyToken, "hub.challenge": challenge } = query;
  const accessToken = "RTQWWTVHBDS32145698741258963";

  if (challenge && verifyToken && verifyToken === accessToken) {
    res.status(200).send(challenge);
  } else {
    next(new Error("Failed to verify token", { cause: 500 }));
  }
});

// ==============in memory session store +++cashing obj ++++++ ==============
const userSessions = {};

// ==============confirm selections ==============

// ============== Receive Message ==============
export const receivedMessage = asyncHandler(async (req, res, next) => {
  console.log("Webhook Payload:", JSON.stringify(req.body, null, 2));

  const messages = req.body.entry?.[0]?.changes?.[0]?.value?.messages;

  if (!messages || !messages.length) {
    console.error(
      "No messages found in payload:",
      JSON.stringify(req.body, null, 2)
    );
    return next(new Error("No messages found", { cause: 404 }));
  }

  console.log("Messages:", messages);

  const { from, id, type } = messages[0];

  try {
    await markMessageAsRead(id);
  } catch (error) {
    console.error(
      "Failed to mark message as read:",
      error.response?.data || error.message
    );
    return next(new Error("Failed to mark message as read", { cause: 500 }));
  }

  const session = userSessions[from] || {
    selections: [],
    status: null,
    totalPrice: 0,
  };

  try {
    switch (type) {
      case "text":
        await handleTextMessage(messages, next);
        break;
      case "interactive":
        await handleInteractiveMessage(messages, session, next);
        break;
      default:
        console.error("Unsupported message type:", type);
        return next(new Error("Message type not found", { cause: 404 }));
    }
  } catch (error) {
    console.error("Error processing message:", error.message);
    return next(
      new Error(error.message || "Internal Server Error", { cause: 500 })
    );
  }

  userSessions[from] = session;

  if (!res.headersSent) {
    res.status(200).json({ message: "ok" });
  }
});
