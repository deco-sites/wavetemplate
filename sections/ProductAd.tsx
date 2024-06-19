export { default, loader } from "../components/product/ProductAd.tsx";
import { asset } from "$fresh/runtime.ts";

export function ErrorFallback() {
  return (
    <div class="container px-3 sm:px-0">
      <div
        class={`flex flex-col sm:flex-row gap-3 p-3 rounded-xl my-5 min-h-[320px] max-h-[320px]`}
      >
        <img
          class="card"
          src={asset("image/ilha.jpg")}
          width={250}
          height={250}
          loading="lazy"
          style={{ transition: "all .3s ease" }}
        />
        <div class="flex flex-col gap-3 items-start w-full mt-5">
          <h2 class="text-lg font-bold uppercase">
            Descuple :(, não foi possível processar sua solicitação
          </h2>
          <p class="grow">
            Por favor, tente novamente mais tarde ou entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div class="container px-3 sm:px-0">
      <div
        class={`flex w-fit flex-col sm:flex-row gap-3 p-3 rounded-xl my-5 min-h-[320px] max-h-[320px]`}
      >
        <div class="skeleton block min-w-[250px] w-[250px] h-[250px]" />
        <div class="flex flex-col gap-3 items-start w-full mt-5">
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
}
