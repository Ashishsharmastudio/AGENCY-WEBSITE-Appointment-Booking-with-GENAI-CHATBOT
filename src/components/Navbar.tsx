import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center rounded-lg max-w-7xl mx-auto mt-4">
      <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
        MyAgency
      </Link>
      <div className="space-x-6 text-gray-700 font-medium">
        <Link href="/portfolio" className="hover:text-blue-600 transition duration-300">
          Portfolio
        </Link>
        <Link href="/admin" className="hover:text-blue-600 transition duration-300">
          Admin
        </Link>
      </div>
    </nav>
  );
}