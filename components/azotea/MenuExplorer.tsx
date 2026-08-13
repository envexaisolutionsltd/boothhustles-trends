"use client";

import { useState } from "react";
import { menus } from "@/lib/azotea";

export default function MenuExplorer() {
  const [active, setActive] = useState<(typeof menus)[number]["id"]>(menus[0].id);
  const current = menus.find((m) => m.id === active) ?? menus[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Menu sections"
        className="flex gap-2.5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {menus.map((menu) => (
          <button
            key={menu.id}
            role="tab"
            type="button"
            id={`tab-${menu.id}`}
            aria-selected={menu.id === active}
            aria-controls={`panel-${menu.id}`}
            className="az-tab"
            onClick={() => setActive(menu.id)}
          >
            {menu.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        key={current.id}
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
        style={{ animation: "az-fade-in 0.5s ease both" }}
      >
        <div>
          <h3 className="az-display az-h2">{current.name}</h3>
          <p className="az-body mt-5">{current.blurb}</p>
        </div>

        <ul className="grid gap-0">
          {current.dishes.map((dish) => (
            <li
              key={dish.name}
              className="border-b border-[rgba(242,230,214,0.12)] py-5 first:border-t"
            >
              <p className="az-display text-xl md:text-2xl">{dish.name}</p>
              <p className="az-body mt-1.5 text-sm md:text-base">{dish.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
