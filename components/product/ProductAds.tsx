import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "../../apps/site.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import ProductAd from "./ProductAd.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { SectionProps } from "deco/types.ts";

interface Likes {
    "product": 1;
    "comments": string[];
}

interface Props {
    products: Product[] | null;
    /**
     * @ignore
     */
    activeIndex: number;
    message: string;
    image: ImageWidget;
    /**
     * @ignore
     */
    likes: Likes[];
}

export async function loader (props: Props, req: Request, ctx: AppContext) {
    const { products = [] } = props;

    if (!products || products.length === 0) {
        return { ...props, likes: [] };
    }

    const likes = await Promise.all(products.map((item: Product) => {
        const productID = String(item.productID || "");
        return ctx.invoke.site.loaders.likesPerProduct({ productID });
    }));

    return { ...props, likes };
}

export default function ProductAds({
    products,
    activeIndex = 0,
    message = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
    image = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    likes
}: SectionProps<typeof loader>) {
    const currentProductLikes = likes[activeIndex] || {};

    console.log("PRODUCTS:", products);

    if (!products || products.length === 0) {
      return null;
    }

    return (
        <>
            {/* <ProductAd {...products[activeIndex]} currentProductLikes={currentProductLikes} /> */}
            <div class="container px-3 sm:px-0 flex align-start gap-3">
                <div class="flex flex-col items-center justify-start gap-2">
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                            <img src={image} />
                        </div>
                    </div>
                    <button 
                        class="flex bg-sky-500 text-white grow-0 rounded hover:bg-sky-400 text-nowrap px-3 py-2 h-auto"
                        {...usePartialSection<typeof ProductAds>({
                            props: { activeIndex: activeIndex + 1 >= products.length ? 0 : activeIndex + 1 },
                        })}
                    >Próximo anúncio</button>
                </div>
                <div class="bg-gray-100 p-3 rounded">{message}</div>
            </div>
        </>
    );
}