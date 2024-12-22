import axios from "axios";

export const markMessageAsRead = async (messageId) =>
  axios.post(
    process.env.WHATSAPP_API_URL,
    {
      messaging_product: "whatsapp",
      receipt_id: messageId,
      status: "read",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

export const sendWhatsappMessage = async (message) =>
  axios.post(process.env.WHATSAPP_API_URL, message, {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
