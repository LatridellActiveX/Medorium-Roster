const textToURL = (text: string = "") => {
  return text
    .toLowerCase()
    .split(" ")
    .map((i, index) => (index === 0 ? i : i[0].toUpperCase() + i.slice(1)))
    .join("");
};

export default textToURL;
