import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="py-6">
        <span class="group-hover:underline text-xs font-thin">
          {name}
        </span>
      </a>
    </li>
  );
}

export default NavItem;
