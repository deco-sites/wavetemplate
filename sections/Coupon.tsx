import CouponButton from "../islands/CouponButton.tsx";

interface Props {
  /** @title Código de Cupom */
  coupon: string;
}

export default function Coupon({
  coupon = "Teste123",
}: Props) {
  return (
    <section class="relative bg-white text-black py-20 max-w-screen">
      <div class="mx-6 lg:container lg:mx-auto flex justify-center items-center flex-col gap-4">
        <p>Não saia de mãos vazias! Leve esse cupom ;)</p>
        <CouponButton couponCode={coupon} />
      </div>
    </section>
  );
}
