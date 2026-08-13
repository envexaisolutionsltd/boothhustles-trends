import Link from "next/link";

export default function AzoteaNotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden az-grain">
      <div className="az-sky absolute inset-0" aria-hidden="true">
        <div className="az-skyline az-skyline-low opacity-55" />
        <div className="az-fade-bottom" />
      </div>
      <div className="az-wrap az-wrap-wide relative py-24 text-center">
        <p className="az-eyebrow az-eyebrow-plain">Error 404</p>
        <h1 className="az-display az-h2 mx-auto mt-6 max-w-[16ch]">
          This table doesn&apos;t <span className="az-ital">exist</span>
        </h1>
        <p className="az-lead mx-auto mt-6">
          The page you were looking for has moved on. The rooftop is still right where
          you left it.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/azotea" className="az-btn">
            Back to AZOTEA
          </Link>
          <Link href="/azotea/book-a-table" className="az-btn az-btn-ghost">
            Book a table
          </Link>
        </div>
      </div>
    </section>
  );
}
