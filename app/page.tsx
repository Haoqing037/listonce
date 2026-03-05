import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full max-w-2xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          ListOnce
        </h1>
        <p className="mt-2 text-zinc-600">
          List once, post everywhere. Cross-post reseller listings to multiple
          marketplaces.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signin"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Sign in
          </Link>
        </div>
        <p className="mt-12 text-sm text-zinc-500">
          Milestone 0 scaffold. Next: database, auth providers, listing CRUD.
        </p>
      </main>
    </div>
  );
}
