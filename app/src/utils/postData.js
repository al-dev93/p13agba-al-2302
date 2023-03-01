/* eslint-disable prettier/prettier */
async function postData(url, data) {
  const isString = typeof data === "string" || data instanceof String;
  const apiHeaders = new Headers();
  apiHeaders.append("accept", "application/json");
  if (!isString) apiHeaders.append("Content-Type", "application/json");
  else apiHeaders.append("Authorization", `Bearer ${data}`);

  const apiResponse = await fetch(url, {
    method: "POST",
    headers: apiHeaders,
    body: !isString ? JSON.stringify(data) : null,
  })
    .then((response) => response.json())
    .then((response) => response)
    // eslint-disable-next-line no-console
    .catch((error) => console.log("erreur", error));
  return apiResponse;
}

export default postData;
