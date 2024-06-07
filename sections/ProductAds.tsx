import type { AppContext } from "../apps/site.ts";
import type { ProductProps } from "./ProductAd.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import ProductAd from "./ProductAd.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { SectionProps } from "deco/types.ts";

interface Props {
    /** @title Products */
    productAds: ProductProps[];
    activeIndex: number;
    message: string;
    image: ImageWidget;
}

export async function loader (props: Props, req: Request, ctx: AppContext) {
    const { productAds = [] } = props;
    const likes = await Promise.all(productAds.map((item: ProductProps) => {
        const {
            product: { productID = 0 },
        } = item;

        if (productID === 0) return null;
        return ctx.invoke.site.loaders.likesPerProduct({ productID });
    }));
    return { ...props, likes };
}

export default function ProductAds({
    productAds,
    activeIndex = 0,
    message = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
    image = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    likes
}: SectionProps<typeof loader>) {
    const currentProductLikes = likes[activeIndex];

    return (
        <>
            <ProductAd {...productAds[activeIndex]} currentProductLikes={currentProductLikes} />
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
                            props: { activeIndex: activeIndex + 1 >= productAds.length ? 0 : activeIndex + 1 },
                        })}
                    >Próximo anúncio</button>
                </div>
                <div class="bg-gray-100 p-3 rounded">{message}</div>
            </div>
        </>
    );
}