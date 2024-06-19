import { invoke } from "../runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect, useMemo } from "preact/hooks";
import type { Like } from "../components/product/ProductAd.tsx";

export default function ShowProductEvents() {
  const likes = useSignal<Like | null>(null);
  const productID = useSignal(0);

  const actualProductID = useMemo(() => {
    return productID.value.toString();
  }, [productID.value]);

  useEffect(() => {
    const getData = async () => {
      const response = await invoke.site.loaders.likesPerProduct({
        productID: actualProductID,
      });
      likes.value = response;
    };
    if (!actualProductID) return;
    getData();
  }, [actualProductID]);

  return (
    <div class="container px-5 flex flex-col items-center">
      <label className="form-control w-full max-w-xs">
        <div className="label justify-center">
          <span className="label-text">Digite o ID do Produto</span>
        </div>
        <input
          type="text"
          placeholder="ID do Produto"
          className="input input-bordered w-full max-w-xs text-center"
          value={productID.value}
          onInput={(e) => productID.value = e.currentTarget.value}
        />
      </label>
      <ul class="flex flex-col gap-2 mt-5">
        {likes.value?.comments.map((comment, index) => (
          <li class="bg-gray-100 rounded p-3" key={index}>
            {comment}
          </li>
        ))}
      </ul>
      <div class="text-lg py-5">
        Total de Likes: {likes.value?.product}
      </div>
    </div>
  );
}
