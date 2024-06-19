import type { SiteNavigationElement } from "apps/commerce/types.ts";

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
            {/* inseri direto, pois sprites não está funcionando em produção */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-friends">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
              <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
            </svg>
            Amigos
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
