/*
  euRedact wordmark, from euredact-wordmark-petrol.svg.

  The supplied file is petrol (#0e4f5c) on white. Here the fill is
  `currentColor` so the mark takes the surrounding text colour — on this site
  that is the light foreground, which is what a dark ground needs.

  "Redact" is knocked out of the bar by a mask rather than drawn: the bar paints
  in currentColor and the letters let the page background through. So the mark
  only reads correctly over a solid background, not over imagery.

  The mask needs a document-unique id. Two instances rendering with the same id
  would make the second one resolve against the first, so `id` is required.
*/
export function Wordmark({
  id,
  className,
  title = "euRedact",
}: {
  id: string;
  className?: string;
  title?: string;
}) {
  const maskId = `wordmark-knockout-${id}`;
  return (
    <svg
      viewBox="0 0 560 200"
      role="img"
      aria-label={title}
      className={className}
      fontFamily="Helvetica, Arial, sans-serif"
    >
      <defs>
        <mask id={maskId}>
          <rect x="141" y="65" width="380" height="73" fill="#ffffff" />
          <text
            x="158"
            y="130"
            fontSize="80"
            fontWeight="bold"
            fill="#000000"
          >
            Redact
          </text>
          <g fill="#000000">
            <rect x="473" y="75.5" width="10" height="52" />
            <g transform="rotate(60 478 101.5)">
              <rect x="473" y="75.5" width="10" height="52" />
            </g>
            <g transform="rotate(120 478 101.5)">
              <rect x="473" y="75.5" width="10" height="52" />
            </g>
          </g>
        </mask>
      </defs>
      <g fill="currentColor">
        <text x="40" y="130" fontSize="80" fontWeight="bold">
          eu
        </text>
        <rect
          x="141"
          y="65"
          width="380"
          height="73"
          mask={`url(#${maskId})`}
        />
      </g>
    </svg>
  );
}
