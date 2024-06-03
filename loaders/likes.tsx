import { AppContext } from "../apps/site.ts";

export default async function totalLikesLoader(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
) {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.likes.get()),
    },
  });

  return response.json();
}