import { useSection } from "deco/hooks/useSection.ts";

import type { SectionProps } from "deco/types.ts";

export interface Props {
    /**
     * @hide
     */
    reminders: string[];
}

export const loader = async (
    props: Props,
    req: Request
) => {
    const contentType = req.headers.get("content-type");

    if (contentType !== "application/x-www-form-urlencoded") {
        return props;
    }

    const {
        reminders = [],
    } = props;

    const form = await req.formData();

    const reminder = form.get("reminder")?.toString();

    if (reminder) reminders.push(reminder);

    return { reminders };
}

export default function HTMXForm({
    reminders = []
}: SectionProps<typeof loader>) {
    console.log("reminders", reminders);

    return (
        <>
            <form 
                class="container"
                hx-on="htmx:beforeRequest: disableForm, htmx:afterRequest: enableForm"
                hx-post={useSection({
                    props: {
                        reminders,
                    }
                })}
                hx-swap="outerHTML"
                hx-target="closest section"
                hx-indicator="#submitButton"
            >
                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Lembrete:</span>
                    </div>
                    <textarea 
                        name="reminder"
                        class="reminder textarea textarea-bordered h-24" 
                        required
                        minLength={5}
                        placeholder="Escreva um lembrete"
                    />
                </label>
                <button 
                    id="submitButton"
                    class="btn mt-2"
                    type="submit"
                >
                    Adicionar Lembrete
                </button>
            </form>
            <div class="container">
                <ul class="flex gap-2 my-3" id="reminders">
                    {
                        reminders.map(reminder => (
                            <li class="bg-gray-100 rounded p-3" key={reminder}>
                                {reminder}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}