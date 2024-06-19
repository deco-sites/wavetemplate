export default async function totalLikesLoader(
  _props: unknown,
  _req: Request,
) {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "sergio",
    },
  });

  return response.json();
}
