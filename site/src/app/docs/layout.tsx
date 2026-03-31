"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/docs", label: "Overview", icon: "home" },
  { href: "/docs/quickstart", label: "Quickstart", icon: "rocket_launch" },
  { href: "/docs/python", label: "Python SDK", icon: "code" },
  { href: "/docs/nodejs", label: "Node.js SDK", icon: "javascript" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-primary border-r border-white/10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
            Documentation
          </div>
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const isActive =
                link.href === "/docs"
                  ? pathname === "/docs"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
              Resources
            </div>
            <nav className="flex flex-col gap-1">
              <a
                href="https://github.com/euRedact/euRedact"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="material-symbols-outlined text-lg">
                  code
                </span>
                GitHub
              </a>
              <a
                href="https://pypi.org/project/euredact/"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="material-symbols-outlined text-lg">
                  package_2
                </span>
                PyPI
              </a>
              <a
                href="https://www.npmjs.com/package/euredact"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="material-symbols-outlined text-lg">
                  package_2
                </span>
                npm
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar (top nav) */}
      <div className="lg:hidden fixed top-16 left-0 w-full z-40 bg-primary border-b border-white/10 overflow-x-auto">
        <nav className="flex gap-1 px-4 py-2">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/docs"
                ? pathname === "/docs"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-secondary/10 text-secondary"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 lg:pt-0 pt-12">{children}</div>
    </div>
  );
}
