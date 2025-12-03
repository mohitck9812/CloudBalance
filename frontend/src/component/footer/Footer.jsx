import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f7f7] absolute bottom-0">
      <div className="z-9">
        <div className="w-full p-4 px-8 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            CloudKeeper 2025 | All Rights Reserved
          </div>

          <div className="text-sm text-gray-700 cursor-pointer hover:underline">
            <Link to="mailto:mohit@cloudkeeper.com" className="text-blue-500">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
