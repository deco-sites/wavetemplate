import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  items: SiteNavigationElement[];
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <a class="block py-5 text-sm" href={item.url}>{item.name}</a>
          </li>
        ))}
        <li>
          <a class="flex gap-2 items-center py-5 text-sm" href="/stats">
            <Icon id="friends" size={24} />
            Amigos
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
