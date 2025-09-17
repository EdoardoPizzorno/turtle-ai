import { Search, Bell, User, Sun } from "lucide-react";
import DecryptedText from "./elements/DecryptedText";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-gray-200 flex items-center px-6 h-14 shadow-md">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center">
          <img
            src="/tartaruga/LOGO.png"
            alt="Logo"
            className="h-8 object-contain"
          />
        </div>
        <DecryptedText
            text="TurtleAI"
            animateOn="both"
            revealDirection="center"
            className="text-lg font-semibold text-white"
          />
      </div>

      <ul className="flex items-center space-x-6 mx-auto text-sm font-medium">
        <li
          className="hover:text-white cursor-pointer transition-colors border-b-2 border-transparent hover:border-white"
          onClick={() => { window.history.pushState(null, '', '/dashboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}
        >
          Dashboard
        </li>
        <li
          className="hover:text-white cursor-pointer transition-colors border-b-2 border-transparent hover:border-white"
          onClick={() => { window.history.pushState(null, '', '/charts'); window.dispatchEvent(new PopStateEvent('popstate')); }}
        >
          Charts
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 cursor-pointer hover:text-white" />
        <Sun className="w-5 h-5 cursor-pointer hover:text-white" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-white" />
        <div
          className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer"
          onClick={() => { window.history.pushState(null, '', '/login'); window.dispatchEvent(new PopStateEvent('popstate')); }}
        >
          <User className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
}
