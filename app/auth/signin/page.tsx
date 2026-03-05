export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Auth providers (Google, GitHub, eBay OAuth) will be wired in a later
          milestone. For now, use the API to test NextAuth.
        </p>
      </div>
    </div>
  );
}
