import { useSection } from "deco/hooks/useSection.ts";

export interface Props {
    /**
     * @hide
     */
    reminders: string[];
    /**
     * @hide
     */
    reminder: string;
}

export default function HTMXForm({
    reminders = [],
    reminder = ""
}: Props) {
    console.log("reminders", reminders);

    const changeHandler = (event: Event) => {
        const target = event.target as HTMLInputElement;
        reminder = target.value;
        console.log("reminder", reminder);
    };

    return (
        <>
            <form
                hx-post={useSection({
                    props: {
                        reminders: reminders.push(reminder),
                    }
                })}
                hx-target="#reminders"
                hx-swap="beforeend"
                hx-on="htmx:beforeRequest: disableForm, htmx:afterRequest: enableForm"
            >
                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Lembrete:</span>
                    </div>
                    <textarea 
                        id="reminder-input"
                        class="textarea textarea-bordered h-24" 
                        required
                        onInput={changeHandler}
                        minLength={5}
                        placeholder="Escreva um lembrete" 
                    />
                </label>
                <button 
                    class="btn"
                    type="submit"
                >
                    Adicionar Lembrete
                </button>
            </form>
            <div>
                <ul id="reminders">
                    {
                        reminders.map(reminder => (
                            <li key={reminder}>
                                {reminder}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}