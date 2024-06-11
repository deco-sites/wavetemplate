import { AppContext } from "../apps/site.ts";

export interface Props {
  productID: string;
  comment: string;
}

export default async function sendLikesAction(
  { productID, comment }: Props,
  _req: Request,
  ctx: AppContext,
) {
  console.log("AQUIIII")
  const key = ctx.likes.get();
  console.log("KEY:", key);
  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "sergio",
    },
    body: JSON.stringify({
      productId: productID,
      comment
    }),
  });

  return response.json();
}