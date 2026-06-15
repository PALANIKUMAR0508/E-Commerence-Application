export const calculateDiscount = (sellingPrice, mrp) => {
  return Math.ceil(((mrp - sellingPrice) / mrp) * 100);
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/*
export const calculateDiscount = (sellingPrice, mrp) => {
  return Math.ceil(((mrp - sellingPrice) / mrp) * 100);
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} | ${formattedTime}`;
};*/
