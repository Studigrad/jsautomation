export function parseDate(inputString) {
  const match = inputString.match(/(\d{1,2}:\d{2})\s[APMapm]{2}/);
  if (match) {
    const parsedTime = match[1];
    const match2 = parsedTime.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      const hours = match2[1].padStart(2, '0'); // Add leading zero if needed
      const minutes = match2[2];
      const res = `${hours}:${minutes}`;
      return res;
    } else {
      return parsedTime
    }
  } else {
    console.log("No match found");
    return 0;
  }
}
