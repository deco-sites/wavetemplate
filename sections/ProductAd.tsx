import { formatPrice } from "../sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { invoke } from "../runtime.ts";
import { SectionProps } from "deco/mod.ts";
import { AppContext } from "../apps/site.ts";

/** @titleBy title */
interface Ad {
    /** @title ID do Produto */
    productId: number;
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

/** @title Product */
export interface ProductProps {
    /** @title Dados do Produto */
    product: Ad;
    /** @title Descrição do Anúncio */
    adDescription?: string;
}

export function ErrorFallback({ error }: { error?: Error }) {
    return error;
}
  
export function LoadingFallback() {
    return "Loading...";
}

export async function loader (props: ProductProps, req: Request, ctx: AppContext) {
    console.log("loader");
    const { product: { productId }} = props;
    console.log("productId", productId);

    const result = await invoke["deco-sites/wavetemplate"].loaders.likesPerProduct({ productId });
    console.log("result:", result);

    return { ...props, result };
}

export default function ProductAd({
    product: {
        title = "Teste 1",
        description = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
        price = 129.99,
        imageSrc = "https://placehold.co/600x600",
        highlight = false,
    },
    adDescription = "",
    result
}: SectionProps<typeof loader>) {
    console.log("highlight", highlight);
    console.log("result", result);
    return (
        <div class="container px-3 sm:px-0">
            <div class={`flex flex-col sm:flex-row gap-3 p-3 rounded-xl my-5 ${highlight ? "border-2 border-black bg-gray-200" : "border-2 border-transparent bg-gray-100"}`}>
                <Image
                    class="card"
                    src={imageSrc}
                    alt={title}
                    width={300}
                    height={300}
                    loading="lazy"
                />
                <div class="flex flex-col w-full">
                    <h2 class="text-lg font-bold uppercase">{title}</h2>
                    <p class="grow">{!adDescription ? description : adDescription}</p>
                    <p class="font-bold sm:text-right">{formatPrice(price)}</p>
                </div>
            </div>
        </div>
    );
}