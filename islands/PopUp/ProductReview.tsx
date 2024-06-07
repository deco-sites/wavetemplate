import Modal from "../../components/ui/Modal.tsx";
import Image from "apps/website/components/Image.tsx";
import Button from "../../components/ui/Button.tsx";

import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";

interface Props {
    image: string;
    title: string;
    productID: string;
}

export default function ProductReview({
    image = "",
    title = "",
    productID = "0"
}: Props) {
    const comment = useSignal<string>("");
    const displayModal = useSignal(false);

    const handleSubmit = async () => {
        const response = await invoke.actions.site.likes({ productID, comment: comment.value });
        console.log("response:", response);
    }

    return (
        <>
            <button
                class="btn btn-primary"
                onClick={() => displayModal.value = true}
            >
                Save
            </button>
            {displayModal.value && (
                <Modal loading="lazy" open>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-bordered bg-base-100 p-7 rounded-md">
                        <div className="flex flex-col sm:flex-row items-start gap-3">
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
                                            comment.value = (event.target as HTMLInputElement).value
                                        }}
                                        value={comment.value}
                                        className="textarea textarea-bordered h-24" 
                                        placeholder="Seu texto aqui" 
                                    />
                                </label>
                                <div class="flex justify-end gap-3">
                                    <Button onClick={() => displayModal.value = false}>Cancelar</Button>
                                    <Button onClick={handleSubmit}>Publicar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}