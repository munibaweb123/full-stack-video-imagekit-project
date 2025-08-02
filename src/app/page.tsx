"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="text-4xl font-bold">Welcome to VideoVault 🎬</h1>
      <p className="text-gray-600 text-lg max-w-xl">
        Upload, store, and preview your videos securely with ImageKit.
      </p>

      <Link
        href="/upload"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Upload a Video
      </Link>
    </main>
  );
}
