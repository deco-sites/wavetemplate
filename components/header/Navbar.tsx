import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { Logo } from "../../components/header/Header.tsx";
import { MenuButton } from "../../islands/Header/Buttons.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { navbarHeight } from "./constants.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, logo, device }: {
    items: SiteNavigationElement[];
    logo?: Logo;
    device: "mobile" | "desktop" | "tablet";
  },
) {
  const platform = usePlatform();

  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden grid grid-cols-3 justify-between items-center border-b border-base-200 w-full px-6 pb-6 gap-2"
      >
        <MenuButton />
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden sm:block w-full">
      <div class="container flex items-center justify-between">
        <div>
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>
        <ul class="flex gap-6 col-span-1">
          {items.map((item) => <NavItem item={item} />)}
          <li class="group flex items-center">
            <a href="/stats" class="py-6">
              <Icon id="friends" size={24} />
              {/* inseri direto, pois sprites não está funcionando em produção */}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-friends"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
              </svg> */}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
