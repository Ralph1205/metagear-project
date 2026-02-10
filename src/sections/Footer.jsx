export default function Footer() {
  return (
    <footer className="bg-gray-50 px-12 py-16 border-t mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="MetaGear Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-2xl tracking-tighter">
              MetaGear
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            The ultimate destination for MetaGear hardware. We provide
            high-performance gaming accessories for the next generation of
            players.
          </p>
        </div>

        {["Shop", "Support", "Community"].map((section) => (
          <div key={section} className="flex flex-col gap-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400">
              {section}
            </h4>
            <ul className="text-sm text-gray-600 flex flex-col gap-2">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Link 1
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Link 2
              </li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">
                Link 3
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t text-center text-xs text-gray-400">
        © 2026 MetaGear Gaming Store. Project by Flores, Custodio, Viernes.
      </div>
    </footer>
  );
}
