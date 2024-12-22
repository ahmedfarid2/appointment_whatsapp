import {
  dessertsList,
  drinksList,
  foodsList,
  getPrice,
  menuItemsList,
} from "../utils/MenuItems.js";

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
        text: "Feel free to choose your meal with a dessert and a drink",
      },
      body: {
        text: "Select your favorite foods, desserts, and drinks!",
      },
      footer: {
        text: "Thank you for your order!",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: menuItemsList.foods,
          },
          {
            type: "reply",
            reply: menuItemsList.desserts,
          },
          {
            type: "reply",
            reply: menuItemsList.drinks,
          },
        ],
      },
    },
  });
}

export function sampleMultiSelectMenu({ number, optionId }) {
  const sections = [];
  if (optionId === "food_options") {
    sections.push({
      title: "Foods",
      rows: [...foodsList],
    });
  } else if (optionId === "dessert_options") {
    sections.push({
      title: "Desserts",
      rows: [...dessertsList],
    });
  } else if (optionId === "drink_options") {
    sections.push({
      title: "Drinks",
      rows: [...drinksList],
    });
  }
  console.log({ sections });
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: `Select your favorite ${optionId}`,
      },
      body: {
        text: `Select your favorite ${optionId}`,
      },
      action: {
        button: "Select",
        sections,
      },
    },
  });
}
export function sampleConfirmMenu({ number, selections }) {
  const totalPrice = selections.reduce((acc, item) => acc + getPrice(item), 0);
  return JSON.stringify({
    messaging_product: "whatsapp",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      header: {
        type: "text",
        text: `Confirm your order: ${selections
          .map((item) => item.title)
          .join(", ")} ($${totalPrice.toFixed(2)})`,
      },
      body: {
        text: `Confirm your order: ${selections
          .map((item) => item.title)
          .join(", ")} ($${totalPrice.toFixed(2)})`,
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "ask_for_more",
              title: "Ask for more",
            },
          },
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
