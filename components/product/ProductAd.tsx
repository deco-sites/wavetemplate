import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";

import Image from "apps/website/components/Image.tsx";
import ProductReview from "../../islands/PopUp/ProductReview.tsx";

import type { AppContext } from "../../apps/site.ts";
import type { ProductDetailsPage, Product } from "apps/commerce/types.ts";
import { SectionProps } from "deco/mod.ts";

export interface Like {
    product: number;
    comments: string[];
}

export interface Props {
    product: ProductDetailsPage | null;
    /** 
     * @title Destaque
     */
    highlight?: boolean;
    /** 
     * @title Descrição do Anúncio 
     * @format textarea
     */
    adDescription?: string;
    /**
     * @hide
     */
    likes: Like | null;
}

export function ErrorFallback({ error }: { error?: Error }) {
    console.error("Error from ProductAd: ", error);
    return null;
}
  
export function LoadingFallback() {
    return "Loading...";
}

export async function loader (props: Props, req: Request, ctx: AppContext) {
    const { product } = props;

    if (!product) return props;
    if (!product?.product) return props;

    const {
        product: {
            productID
        }
    } = product;

    const likes = await ctx.invoke.site.loaders.likesPerProduct({ productID });
    return { ...props, likes };
}

export default function ProductAd({
    product,
    highlight = false,
    adDescription = "",
    likes = null,
}: SectionProps<typeof loader>) {
    const {
        product: productLikes = 0
    } = likes || {};

    if (!product) return null;
    if (!product?.product) return null;
    console.log("PRODUCT", product.product);

    const { price } = useOffer(product?.product?.offers);

    const {
        product: {
            name = "",
            image: images = [],
            productID,
            description
        }
    } = product;

    const image = images[0]?.url ?? "";

    return (
        <div class="container px-3 sm:px-0">
            <div class={`flex flex-col sm:flex-row gap-3 ${highlight && productLikes >= 3 ? "bg-gray-200 border-2 border-black" : "bg-gray-100 border-2 border-transparent"} p-3 rounded-xl my-5`}>
                <Image
                    class="card"
                    src={image}
                    alt={name}
                    width={300}
                    height={300}
                    loading="lazy"
                />
                <div class="flex flex-col items-start w-full mt-5">
                    <h2 class="text-lg font-bold uppercase">{name}</h2>
                    <p class="grow">{!adDescription ? description : adDescription}</p>
                    <p class="font-bold sm:text-right">{formatPrice(price)}</p>
                    <ProductReview image={image} title={name} productID={productID} />
                </div>
            </div>
        </div>
    );
}