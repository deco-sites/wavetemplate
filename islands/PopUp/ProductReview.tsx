import Modal from "../../components/ui/Modal.tsx";
import Image from "apps/website/components/Image.tsx";
import Button from "../../components/ui/Button.tsx";
import Toastify from "toastify";

import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { sendEvent } from "../../sdk/analytics.tsx";

interface Props {
  image: string;
  title: string;
  productID: string;
}

export default function ProductReview({
  image = "",
  title = "",
  productID = "0",
}: Props) {
  const comment = useSignal<string>("");
  const displayModal = useSignal(false);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    try {
      await invoke.site.actions.likes({ productID, comment: comment.value });

      Toastify({
        text: "Comentário salvo com sucesso.",
        close: true,
        gravity: "bottom",
        duration: 5000,
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#27ae60",
        },
      }).showToast();

      sendEvent({
        name: "post_score",
        params: {
          score: 1,
        },
      });

      displayModal.value = false;
    } catch (err) {
      console.error("error:", err);

      Toastify({
        text: "Houve um erro. Tente novamente mais tarde.",
        close: true,
        gravity: "bottom",
        duration: 5000,
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#c0392b",
        },
      }).showToast();

      displayModal.value = false;
    }
  };

  return (
    <>
      <button
        class="btn btn-primary mt-5"
        onClick={() => displayModal.value = true}
      >
        Save
      </button>
      {displayModal.value && (
        <Modal loading="lazy" open>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-bordered bg-base-100 p-7 rounded-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <Image
                alt={title}
                src={image}
                class="rounded"
                width={150}
                height={150}
              />
              <div>
                <h2 class="text-lg font-bold">{title}</h2>
                <label className="form-control mb-3 w-64">
                  <div className="label">
                    <span className="label-text">Observações</span>
                  </div>
                  <textarea
                    onInput={(event) => {
                      comment.value = (event.target as HTMLInputElement).value;
                    }}
                    value={comment.value}
                    required
                    className="textarea textarea-bordered h-24"
                    minLength={5}
                    placeholder="Seu texto aqui"
                  />
                </label>
                <div class="flex justify-end gap-3">
                  <Button onClick={() => displayModal.value = false}>
                    Cancelar
                  </Button>
                  <Button type="submit">Publicar</Button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
