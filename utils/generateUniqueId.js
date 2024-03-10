function generateUniqueId() {
  const randomPart = Math.random().toString(36).substr(2, 9);
  const timestampPart = new Date().getTime().toString(36);
  const uniqueId = randomPart + timestampPart;
  return uniqueId;
}

export default generateUniqueId;
