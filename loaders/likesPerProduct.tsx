import { AppContext } from "../apps/site.ts";

export interface Props {
  productID: string;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": String(ctx.likes.get()),
      },
    },
  );

  return response.json();
}