function generateUHID(mobile) {

  const timestamp =
    Date.now()
      .toString()
      .slice(-6);

  const mobilePart =
    mobile.slice(-4);

  return `UH${timestamp}${mobilePart}`;
}

export default generateUHID;