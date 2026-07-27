This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing the published claims

The site advertises concrete numbers — 31 countries, 27 entity types, per-page
latency, checksum coverage. Those are checked against the installed `euredact`
package rather than trusted:

```bash
npm test        # claim tests: fast, deterministic
npm run test:perf   # latency tests: real timing, machine-dependent
```

`npm test` fails if a page states a country or entity count that disagrees with
the engine, if the SDK docs list entity types the engine never emits, if a
checksum-invalid identifier gets redacted, or if a retired figure (the 0.02 ms
cache-hit latency) reappears. `test:perf` is kept separate because it measures
real work; it is a tripwire for order-of-magnitude drift, not a benchmark.

Python-specific figures on the site (`~3 ms per page`, `345 pattern
definitions`, `44 checksum validators`) are **not** covered — the Python engine
is not a dependency of this repo, so those stay manually verified.

## The react-simple-maps override

`package.json` pins `react-simple-maps`'s React peers to ours:

```json
"overrides": {
  "react-simple-maps": { "react": "$react", "react-dom": "$react-dom" }
}
```

`react-simple-maps@3.0.0` declares `react ^16.8.0 || 17.x || 18.x` and has not
shipped a stable release since; the 4.x betas declare the same range. Without
the override, `npm install` and `npm ci` fail with `ERESOLVE` against React 19.

It renders correctly under React 19 — geographies draw and the console is
clean — so this is stale metadata, not a real incompatibility. The override is
deliberately scoped to that one package: `legacy-peer-deps=true` in `.npmrc`
would fix the same symptom by disabling peer resolution for the whole tree,
hiding any genuine conflict that appears later.

Remove it if the library ships React 19 support or is replaced.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
