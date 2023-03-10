/* eslint-disable prettier/prettier */
async function callApi(url, data, apiMethod, token = undefined) {
  const apiHeaders = new Headers();
  apiHeaders.append("accept", "application/json");
  apiHeaders.append("Content-Type", "application/json");
  if (token) apiHeaders.append("Authorization", `Bearer ${token}`);
  const apiBody = data ? JSON.stringify(data) : null;

  const apiResponse = await fetch(url, {
    method: apiMethod,
    headers: apiHeaders,
    body: apiBody || null,
  })
    .then((response) => response.json())
    .then((response) => response)
    // eslint-disable-next-line no-console
    .catch((error) => console.log("erreur", error));
  return apiResponse;
}

export default callApi;
