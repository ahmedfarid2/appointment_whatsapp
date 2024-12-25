import axios from "axios";

export const markMessageAsRead = async (messageId) => {
  try {
    const response = await axios.post(
      process.env.WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        message_id: messageId,
        status: "read",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Message marked as read:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to mark message as read:",
      error.response?.data || error.message
    );
    throw new Error("Failed to mark message as read");
  }
};

export const sendWhatsAppMessage = async (message) =>
  axios.post(process.env.WHATSAPP_API_URL, message, {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
