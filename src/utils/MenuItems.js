const getListItemName = (item) => {
  if (foodsList.includes(item)) return "foodsList";
  if (dessertsList.includes(item)) return "dessertsList";
  if (drinksList.includes(item)) return "drinksList";
};

export const findItemById = (searchKey) => {
  const allFoodItems = [...foodsList, ...dessertsList, ...drinksList];
  const item = allFoodItems.find((item) => item.id === searchKey);
  if (item) {
    const listName = getListItemName(item);
    return { item, listName };
  } else {
    const item = Object.values(menuItemsList).find(
      (item) => item.id === searchKey
    );

    if (item) {
      return { item, listName: "menuItems" };
    } else {
      return { item: null, listName: "unknown" };
    }
  }
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
export const dessertsList = [
  {
    id: "chocolate",
    title: "شوكولاتة",
    description: "السعر 8$",
  },
  {
    id: "strawberry",
    title: "فراولة",
    description: "السعر 9$",
  },
  {
    id: "vanilla",
    title: "فانيليا",
    description: "السعر 6$",
  },
];
export const foodsList = [
  {
    id: "chicken",
    title: "دجاج",
    description: "السعر 10$",
  },
  {
    id: "beef",
    title: "لحم بقر",
    description: "السعر 12$",
  },
  {
    id: "fish",
    title: "لحم سمك",
    description: "السعر 14$",
  },
];
export const drinksList = [
  {
    id: "coke",
    title: "كولا",
    description: "السعر 5$",
  },
  {
    id: "pepsi",
    title: "بيبسي",
    description: "السعر 5$",
  },
  {
    id: "orange_juice",
    title: "عصير برتقال",
    description: "السعر 7$",
  },
];
export const menuItemsList = {
  foods: {
    id: "food_options",
    title: "خيارات الطعام",
  },
  desserts: {
    id: "dessert_options",
    title: "خيارات الحلويات",
  },
  drinks: {
    id: "drink_options",
    title: "خيارات المشروبات",
  },
};
