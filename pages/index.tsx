import { CommandLineIcon } from "components/icons/CommandLineIcon"

import { Inter } from "@next/font/google"

const inter = Inter({ subsets: ["latin"] })


export default function Home() {
  console.log("home component rendered")
  return (
    <div className="text-center max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
      >
        Jambhalucid
      </h1>
      <p
        style={inter.style}
        className="mb-6 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
      >
        A Lucid/Next.js demo UI for Jambhala Plutus samples
      </p>
    </div>
  )
}