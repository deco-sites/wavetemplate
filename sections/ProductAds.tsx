import type { ProductProps } from "./ProductAd.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import ProductAd from "./ProductAd.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Props {
    /** @title Products */
    productAds: ProductProps[];
    activeIndex: number;
    message: string;
    image: ImageWidget;
}

export default function ProductAds({
    productAds,
    activeIndex = 0,
    message = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
    image = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
}: Props) {
    return (
        <>
            <ProductAd {...productAds[activeIndex]} />
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