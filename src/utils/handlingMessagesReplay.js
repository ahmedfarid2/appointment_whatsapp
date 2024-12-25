import { sendWhatsAppMessage } from "../services/whatsapp.services.js";
import { sampleConfirmMenu, sampleMenu, sampleMultiSelectMenu, samplePaymentGateWay, sampletext } from "../shared/sampleModels.js";
import { findItemById } from "./MenuItems.js";

export const handleTextMessage = async (messages, next) => {
  const { from } = messages[0];
  try {
    await sendWhatsAppMessage(sampleMenu({ number: from }));
  } catch (error) {
    console.error(
      "Error in handleTextMessage:",
      error.response?.data || error.message
    );
    next(
      new Error(
        JSON.stringify(error.response?.data || "Failed to send message"),
        { cause: 500 }
      )
    );
  }
};


export const handleInteractiveMessage = async (messages, session, next) => {
  const { from, interactive: { button_reply, list_reply } = {} } = messages[0];

  if (button_reply) {
    await handleButtonReply(button_reply, from, session, next);
  }

  if (list_reply) {
    await handleListReply(list_reply, from, session, next);
  }
};

export const handleButtonReply = async (button_reply, from, session, next) => {
  const { id: buttonId } = button_reply;
  switch (buttonId) {
    case "cancel":
      await sendWhatsAppMessage(
        sampletext({ textResponse: "Appointment booking canceled.", number: from })
      ).catch((error) =>
        next(
          new Error(error?.response.data || "Failed to send message", {
            cause: 500,
          })
        )
      );
      delete userSessions[from];
      break;
    case "confirm":
      if (!session.selections.specialty || !session.selections.time) {
        await sendWhatsAppMessage(
          sampletext({
            textResponse: "You must select a specialty and a time slot.",
            number: from,
          })
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
      } else {
        const { specialty, time } = session.selections;
        await sendWhatsAppMessage(
          sampletext({
            textResponse: `Your appointment with a ${specialty.title} specialist is confirmed for the ${time.title}.`,
            number: from,
          })
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
        delete userSessions[from];
      }
      break;
    default:
      const { item, listName } = findItemById(buttonId);
      if (listName === "specialtiesList") {
        session.selections.specialty = item;
        await sendWhatsAppMessage(
          sampleMultiSelectMenu({ number: from, optionId: "time_options" })
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
      } else {
        await sendWhatsAppMessage(
          sampleMultiSelectMenu({ number: from, optionId: "specialty_options" })
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
      }
      break;
  }
};

export const handleListReply = async (list_reply, from, session, next) => {
  const { id: listId } = list_reply;
  const { item } = findItemById(listId);

  if (item && item.title) {
    session.selections.time = item;
  }

  await sendWhatsAppMessage(
    sampleConfirmMenu({
      number: from,
      selections: [
        { title: session.selections.specialty.title },
        { title: session.selections.time.title },
      ],
    })
  ).catch((error) =>
    next(
      new Error(error?.response.data || "Failed to send message", {
        cause: 500,
      })
    )
  );
};
