export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Griglia principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + descrizione */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">TurtleAI</h2>
            <p className="text-gray-400 text-sm">
              Dashboard finanziaria completa per tenere traccia di mercati, crypto e indicatori economici.
            </p>
          </div>

          {/* Link rapidi */}
          <div>
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Markets</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Crypto</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Reports</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Settings</a></li>
            </ul>
          </div>

          {/* Contatti / Social */}
          <div>
            <h3 className="text-white font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-gray-400 mb-2">support@turtleai.com</p>
            <p className="text-sm text-gray-400 mb-4">+1 (555) 123-4567</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-emerald-500 transition-colors">Twitter</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TurtleAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
