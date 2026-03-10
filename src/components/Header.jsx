import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="relative shadow-sm bg-white z-50">
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-5 page-container">
        {/* LOGO */}
        <Link to="/">
          <img src="/logo.svg" width={140} />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-16">
          <li className="cursor-pointer hover:text-primary">
            <Link to="/">Strona główna</Link>
          </li>

          <li
            className="cursor-pointer hover:text-primary"
            onClick={() => setIsSearchOpen((p) => !p)}
          >
            Szukaj
          </li>

          <Link to="/search?condition=Nowy">
            <li className="cursor-pointer hover:text-primary">Nowe</li>
          </Link>

          <Link to="/search?condition=Używany">
            <li className="cursor-pointer hover:text-primary">Używane</li>
          </Link>
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsSearchOpen((p) => !p)}
          >
            <FaSearch size={22} />
          </button>

          {/* AUTH DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <UserButton />
                <Link to="/profile">
                  <Button>Panel</Button>
                </Link>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button>Zaloguj</Button>
              </SignInButton>
            )}
          </div>

          {/* HAMBURGER */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <FaBars size={26} />
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div
        className={`
    absolute left-0 right-0 top-full bg-white border-t shadow-md
    transform transition-all duration-300 ease-out
    ${
      isSearchOpen
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-4 pointer-events-none"
    }
  `}
      >
        <SearchBar closeSearch={() => setIsSearchOpen(false)} />
      </div>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* SLIDE PANEL */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white p-6
          transform transition-transform duration-300 ease-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* CLOSE */}
          <button
            className="self-end mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes size={26} />
          </button>

          {/* AUTH MOBILE */}
          {isSignedIn ? (
            <div className="flex items-center gap-3 mb-6">
              <UserButton />
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Panel</Button>
              </Link>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button className="w-full mb-6">Zaloguj</Button>
            </SignInButton>
          )}

          {/* NAV */}
          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Strona Główna
            </Link>
            <Link
              to="/search?condition=Nowy"
              onClick={() => setIsMenuOpen(false)}
            >
              Nowe
            </Link>
            <Link
              to="/search?condition=Używany"
              onClick={() => setIsMenuOpen(false)}
            >
              Używane
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
