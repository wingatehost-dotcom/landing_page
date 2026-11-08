export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-950 px-6 text-center text-neutral-100">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 left-1/4 h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-3xl"
      />

      <div className="relative flex flex-col items-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-neutral-300 uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Coming soon
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Something great is on the way.
        </h1>

        <p className="mt-6 max-w-xl text-base text-pretty text-neutral-400 sm:text-lg">
          We&apos;re working behind the scenes to bring you something worth
          waiting for. Check back soon.
        </p>

        <a
          href="mailto:hello@example.com"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
        >
          Get in touch
          <svg
            aria-hidden
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <footer className="absolute bottom-8 text-xs text-neutral-600">
        © {new Date().getFullYear()} All rights reserved.
      </footer>
    </main>
  );
}
