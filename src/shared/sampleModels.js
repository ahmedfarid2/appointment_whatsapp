import { specialtiesList, timesList } from "../utils/MenuItems.js";

export function sampletext({ textResponse, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "text",
    text: {
      body: textResponse,
    },
  });
}

export function sampleImage({ imgUrl, caption, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "image",
    image: {
      link: imgUrl,
      caption: caption || "",
    },
  });
}

export function sampleVideo({ videoUrl, caption, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "video",
    video: {
      link: videoUrl,
      caption: caption || "",
    },
  });
}

export function sampleDocument({ documentUrl, caption, filename, number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "document",
    document: {
      link: documentUrl,
      caption: caption || "",
      filename: filename || "file",
    },
  });
}

export function sampleMenu({ number }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: "Please select an option",
      },
      body: {
        text: "Choose one of the options below.",
      },
      footer: {
        text: "Thank you!",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "specialty_options",
              title: "Select Specialty",
            },
          },
          {
            type: "reply",
            reply: {
              id: "time_options",
              title: "Select Time Slot",
            },
          },
        ],
      },
    },
  });
}

export function sampleMultiSelectMenu({ number, optionId }) {
  const sections = [];
  if (optionId === "specialty_options") {
    sections.push({
      title: "Available Specialties",
      rows: [...specialtiesList],
    });
  } else if (optionId === "time_options") {
    sections.push({
      title: "Available Time Slots",
      rows: [...timesList],
    });
  }
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: `Select your ${optionId.replace("_options", "")}`,
      },
      body: {
        text: "Choose an option below.",
      },
      action: {
        button: "Select",
        sections,
      },
    },
  });
}

export function sampleConfirmMenu({ number, selections }) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: `Confirm your appointment with ${selections[0].title} on ${selections[1].title}`,
      },
      body: {
        text: "Please confirm or cancel your appointment.",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "confirm",
              title: "Confirm",
            },
          },
          {
            type: "reply",
            reply: {
              id: "cancel",
              title: "Cancel",
            },
          },
        ],
      },
    },
  });
}

export function samplePaymentGateWay({ number, totalPrice }) {
  const url = `https://developer.paypal.com/home/`;
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "text",
    text: {
      preview_url: true,
      body: `click here to pay ${totalPrice.toFixed(2)} , ${url}`,
    },
  });
}
