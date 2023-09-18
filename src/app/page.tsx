import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>This a full stack next.js auth</p>
      <h1 className="text-3xl">Please login first</h1>
      <Link href="/login" className="text-blue-500 underline">Login</Link>
    </main>
  )
}
