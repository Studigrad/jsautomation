export function parseDate(inputString) {
  const match = inputString.match(/(\d{1,2}:\d{2})\s[APMapm]{2}/);
  if (match) {
    const parsedTime = match[1];
    console.log(parsedTime);
    return parsedTime;
  } else {
    console.log("No match found");
    return 0;
  }
}
