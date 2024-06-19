export interface Props {
  productID: string;
}

export default async function loader(
  props: Props,
  _req: Request,
) {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "sergio",
      },
    },
  );

  return response.json();
}
