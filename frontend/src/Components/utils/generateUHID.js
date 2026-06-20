const generateUHID = (mobile) => {
  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `UH${mobile.slice(-4)}${random}`;
};

export default generateUHID;