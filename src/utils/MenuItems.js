const getListItemName = (item) => {
  if (specialtiesList.includes(item)) return "specialtiesList";
  if (timesList.includes(item)) return "timesList";
};

export const findItemById = (searchKey) => {
  const allItems = [...specialtiesList, ...timesList];
  const item = allItems.find((item) => item.id === searchKey);
  if (item) {
    const listName = getListItemName(item);
    return { item, listName };
  }
  return { item: null, listName: "unknown" };
};

export const getPrice = (item) => {
  const description = item.description;
  const priceRegex = /\d+(\.\d+)?\$/; // matches a price in the format $X.XX
  const match = description.match(priceRegex);
  if (match) {
    return parseFloat(match[0].replace(/\$/g, ""), 10); // remove the dollar sign and convert to float with decimal point
  } else {
    return null; // no price found
  }
};

export const specialtiesList = [
  {
    id: "cardiology",
    title: "Cardiology",
    description: "Specialist for heart-related issues.",
  },
  {
    id: "dermatology",
    title: "Dermatology",
    description: "Specialist for skin-related issues.",
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    description: "Specialist for child-related issues.",
  },
];

export const timesList = [
  {
    id: "morning",
    title: "Morning Slot",
    description: "Available from 9 AM to 12 PM.",
  },
  {
    id: "afternoon",
    title: "Afternoon Slot",
    description: "Available from 1 PM to 4 PM.",
  },
  {
    id: "evening",
    title: "Evening Slot",
    description: "Available from 5 PM to 8 PM.",
  },
];

export const menuItemsList = {
  specialties: {
    id: "specialty_options",
    title: "Specialty Options",
  },
  times: {
    id: "time_options",
    title: "Available Time Slots",
  },
};
