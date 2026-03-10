import React from "react";

function Footer() {
  return (
    <footer className="mt-24 border-t bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* LOGO + DESC */}
        <div className="md:col-span-1">
          <img src="/logo.svg" alt="Logo" className="h-8 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Nowoczesna platforma do wyszukiwania i sprzedaży samochodów. Szybko,
            bezpiecznie i bez zbędnych formalności.
          </p>
        </div>

        {/* LINKI */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Serwis</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-primary cursor-pointer">Ogłoszenia</li>
            <li className="hover:text-primary cursor-pointer">
              Dodaj ogłoszenie
            </li>
            <li className="hover:text-primary cursor-pointer">Cennik</li>
            <li className="hover:text-primary cursor-pointer">Kontakt</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Pomoc</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-primary cursor-pointer">FAQ</li>
            <li className="hover:text-primary cursor-pointer">Regulamin</li>
            <li className="hover:text-primary cursor-pointer">
              Polityka prywatności
            </li>
          </ul>
        </div>

        {/* TRUST / INFO */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Dlaczego my?</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>✔ Zweryfikowane ogłoszenia</li>
            <li>✔ Brak ukrytych opłat</li>
            <li>✔ Polska platforma</li>
            <li>✔ Wsparcie użytkownika</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Moto-Select. Wszelkie prawa zastrzeżone.
          </span>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-primary cursor-pointer">Regulamin</span>
            <span className="hover:text-primary cursor-pointer">
              Prywatność
            </span>
            <span className="hover:text-primary cursor-pointer">Kontakt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
