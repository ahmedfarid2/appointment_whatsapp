import {
  markMessageAsRead,
  sendWhatsappMessage,
} from "../../services/whatsapp.services.js";
import { asyncHandler } from "../../utils/errorHandling.js";

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

// ============== handlesIncomingMessages ==============

export const handleIncomingMessages = asyncHandler(async (req, res, next) => {
  const messages = req.body.entry?.[0]?.changes?.[0]?.value?.messages;
  if (!messages || !messages.length) {
    const { conversation_id } = req.body.entry?.[0]?.changes?.[0]?.value;
    return next(
      new Error("No messages found", { cause: 404, conversation_id })
    );
  }
  console.log(messages);
  const { from, id, type } = messages[0];
  await markMessageAsRead(id);
  if (type === "text") {
    await sendWhatsappMessage(
      JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        type: "text",
        text: {
          body: "Hello from Whatsapp API",
        },
      })
    );
  }
});
