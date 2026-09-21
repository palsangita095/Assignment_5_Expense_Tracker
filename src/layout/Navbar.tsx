import { Link, useLocation } from "react-router-dom";
import { navItems } from "../services/json/global.json";
import { Wallet } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-9xl">
       
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100">
            <Wallet size={20} className="text-emerald-600" />
          </div>

          <h1 className="text-xl font-bold text-zinc-900">
            Expense<span className="text-emerald-600">Tracker</span>
          </h1>
        </div>

       
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider uppercase text-zinc-500">
            v1.0
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
