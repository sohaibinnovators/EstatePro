import Link from "next/link";
import { IconChevron } from "@/components/icons";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: Crumb[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-sm",
          light ? "text-white/65" : "text-muted",
        )}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-1"
            >
              {index > 0 ? (
                <IconChevron className="h-3.5 w-3.5 shrink-0 opacity-50" />
              ) : null}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "hover:text-white" : "hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    last && (light ? "font-medium text-white" : "font-medium text-navy"),
                  )}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
