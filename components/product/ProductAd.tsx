import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";

import Image from "apps/website/components/Image.tsx";
import ProductReview from "../../islands/PopUp/ProductReview.tsx";
import { SectionProps } from "deco/mod.ts";

import type { AppContext } from "../../apps/site.ts";
import type { ProductDetailsPage, Product } from "apps/commerce/types.ts";

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
    vertical?: boolean;
    /**
     * @title Carregamento lento de imagem?
     * @default true
     */
    lazyLoad?: boolean;
    animateImage?: boolean;
    relatedProduct?: Product[] | null;
    showRelatedProduct?: boolean;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
    const { product } = props;

    if (!product) return props;
    if (!product?.product) return props;

    const {
        product: {
            productID,
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
    vertical = false,
    lazyLoad = true,
    animateImage = true,
    relatedProduct = [],
    showRelatedProduct = false
}: SectionProps<typeof loader>) {
    const {
        product: productLikes = 0
    } = likes || {};

    if (!product) return null;
    if (!product?.product) return null;

    const { price } = useOffer(product?.product?.offers);

    const currentProduct = showRelatedProduct ? 
        // @ts-expect-error relatedProduct is an array
        relatedProduct.length > 0 ? relatedProduct[0] :
        product.product : 
        product.product;

    const {
        url,
        name = "",
        image: images = [],
        productID,
        description
    } = currentProduct;

    const image = images[0]?.url ?? "";

    return (
        <div class="container px-3 sm:px-0">
            <div class={`flex flex-col relative ${vertical && "sm:flex-row"} gap-3 ${highlight && productLikes >= 3 ? "bg-gray-200 border-2 border-black" : "bg-gray-100 border-2 border-transparent"} p-3 rounded-xl my-5 min-h-[320px] max-h-[320px]`}>
                <a 
                    href={url}
                    class="block overflow-hidden rounded-xl"
                    style={{ 
                        width: vertical ? "250px" : "150px", 
                        height: vertical ? "250px" : "150px"
                    }}
                >
                    <Image
                        class={`card object-cover ${animateImage && "hover:scale-110"}`}
                        src={image}
                        alt={name}  
                        width={vertical ? 250 : 150}
                        height={vertical ? 250 : 150}
                        preload={!lazyLoad}
                        loading={lazyLoad ? "lazy" : "eager"}
                        fetchPriority={lazyLoad ? "low" : "high"}
                        style={{ transition: "all .3s ease" }}
                    />
                </a>
                <div class={`flex flex-col items-start w-full ${!vertical && "mt-2"}`}>
                    <h2 class="text-lg font-bold uppercase">{name}</h2>
                    {vertical && <p class="grow">{!adDescription ? description : adDescription}</p>}
                    <p class="font-bold sm:text-right">{formatPrice(price)}</p>
                    <ProductReview image={image} title={name} productID={productID} />
                    {
                        !vertical &&
                        <div class="tooltip absolute top-0 right-0 m-3 tooltip-left z-50" data-tip={!adDescription ? description : adDescription}>
                            <button class="btn">Saiba mais</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}