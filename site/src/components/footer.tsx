import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-32 pb-16">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-32">
          <div>
            <div className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">
              Product
            </div>
            <ul className="space-y-5">
              <li>
                <Link
                  href="https://github.com/euRedact/euRedact"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  Open Source SDK
                </Link>
              </li>
              <li>
                <Link
                  href="https://pypi.org/project/euredact/"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  PyPI Package
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/euredact"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  npm Package
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  Cloud Tier (Coming Soon)
                </Link>
              </li>
              <li>
                <Link
                  href="/trust"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  Security Specs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">
              Documentation
            </div>
            <ul className="space-y-5">
              <li>
                <Link
                  href="/docs"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  Quickstart Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/euRedact/euRedact"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  Sample Code
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">
              Legal
            </div>
            <ul className="space-y-5">
              <li>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  GDPR Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  DPA Agreement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-10">
              Engineering
            </div>
            <ul className="space-y-5">
              <li>
                <Link
                  href="/about"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  About the Team
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/euRedact/euRedact"
                  className="text-slate-500 hover:text-secondary transition-colors text-sm font-bold"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            &copy; 2026 JNJS BV. Apache 2.0 License.
          </div>
          <div className="flex items-center gap-3 text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
            <div className="w-6 h-4 bg-blue-700 relative flex items-center justify-center rounded-sm">
              <svg className="w-full h-full p-0.5" viewBox="0 0 12 8">
                <circle
                  cx="6"
                  cy="4"
                  r="1.5"
                  fill="none"
                  stroke="#FFD700"
                  strokeDasharray="0.1,0.1"
                  strokeWidth="0.2"
                />
              </svg>
            </div>
            Data Residency: EU-West-1
          </div>
          <div className="flex gap-8">
            <Link
              href="https://github.com/euRedact/euRedact"
              className="text-slate-600 hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-slate-600 hover:text-white transition-all transform hover:scale-110"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
