import type { AppContext } from "../../apps/site.ts";

export async function loader(props: null, req: Request, ctx: AppContext) {
    const response = await ctx.invoke.site.loaders.likes();
    console.log("response", response);
    return { total: response.total };
}

export default function TotalEvents({
    total
}: { total?: number }) {
    return <h1 class="text-lg text-center py-5">Site Saves: {total}</h1>;
}