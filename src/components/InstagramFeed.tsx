function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* Ziva Instagram — replace the handle/URL and swap these images for your real
   Instagram photos anytime (a URL or a /local-file.webp both work). */
const IG_HANDLE = "@ziva.beauty";
const IG_URL = "https://instagram.com/ziva.beauty";

// id + a height to build a varied masonry band like the reference.
const POSTS: { id: string; h: number }[] = [
  { id: "photo-1596462502278-27bfdc403348", h: 560 },
  { id: "photo-1570172619644-dfd03ed5d881", h: 720 },
  { id: "photo-1522335789203-aabd1fc54bc9", h: 500 },
  { id: "photo-1487412947147-5cebf100ffc2", h: 680 },
  { id: "photo-1616394584738-fc6e612e71b9", h: 540 },
  { id: "photo-1512496015851-a90fb38ba796", h: 760 },
  { id: "photo-1571781926291-c477ebfd024b", h: 620 },
  { id: "photo-1598440947619-2c35fc9aa908", h: 500 },
  { id: "photo-1560066984-138dadb4c035", h: 700 },
  { id: "photo-1608248543803-ba4f8c70ae0b", h: 560 },
  { id: "photo-1556228720-195a672e8a03", h: 640 },
  { id: "photo-1620916566398-39f1143ab7be", h: 520 },
];

const src = (id: string, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&h=${h}&q=70`;

export default function InstagramFeed() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mb-8 px-4 text-center sm:mb-10">
        <h2 className="text-[26px] font-bold tracking-tight text-ink sm:text-[32px]">
          Follow Us On Instagram
        </h2>
        <p className="mt-2 text-sm text-ink/60 sm:text-[15px]">
          Tag us{" "}
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold italic text-gold-deep hover:underline"
          >
            {IG_HANDLE}
          </a>{" "}
          to get featured
        </p>
      </div>

      <div className="px-2 sm:px-3">
        <div className="columns-2 gap-2 sm:columns-4 sm:gap-3 lg:columns-6 xl:columns-7">
          {POSTS.map((post, i) => (
            <a
              key={i}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mb-2 block break-inside-avoid overflow-hidden rounded-xl sm:mb-3"
              aria-label="View Ziva on Instagram"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src(post.id, post.h)}
                alt="Ziva Beauty on Instagram"
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/35">
                <InstagramIcon className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
