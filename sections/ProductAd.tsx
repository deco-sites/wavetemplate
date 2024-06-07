import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";
import ProductReview from "../islands/PopUp/ProductReview.tsx";
import { formatPrice } from "../sdk/format.ts";

import type { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy title */
interface Ad {
    /** @title ID do Produto */
    productID: string;
    /** @title Título do Produto */
    /** @description Dê um belo título para o seu anúncio */
    title: string;
    /** @title Descrição */
    description?: string;
    /** @title Preço */
    price: number;
    /** @title Imagem do Produto */
    imageSrc: ImageWidget;
    /** @title Em destaque? */
    highlight?: boolean;
}

export interface Like {
    product: number;
    comments: string[];
}

/** @title Product */
export interface ProductProps {
    /** @title Dados do Produto */
    product: Ad;
    /** @title Descrição do Anúncio */
    adDescription?: string;
    currentProductLikes?: Like;
}

export function ErrorFallback({ error }: { error?: Error }) {
    return error;
}
  
export function LoadingFallback() {
    return "Loading...";
}

export default function ProductAd({
    product: {
        productID,
        title = "Teste 1",
        description = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
        price = 129.99,
        imageSrc = "https://placehold.co/600x600",
        highlight = false,
    },
    adDescription = "",
    currentProductLikes,
}: ProductProps) {
    const {
        product: likes = 0
    } = currentProductLikes || {};

    return (
        <div class="container px-3 sm:px-0">
            <div class={`flex flex-col sm:flex-row gap-3 ${highlight && likes >= 3 ? "bg-gray-200 border-2 border-black" : "bg-gray-100 border-2 border-transparent"} p-3 rounded-xl my-5`}>
                <Image
                    class="card"
                    src={imageSrc}
                    alt={title}
                    width={300}
                    height={300}
                    loading="lazy"
                />
                <div class="flex flex-col items-start w-full mt-5">
                    <h2 class="text-lg font-bold uppercase">{title}</h2>
                    <p class="grow">{!adDescription ? description : adDescription}</p>
                    <p class="font-bold sm:text-right">{formatPrice(price)}</p>
                    <ProductReview image={imageSrc} title={title} productID={productID} />
                </div>
            </div>
        </div>
    );
}