import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Centered content container (controls navbar width on desktop) */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 md:h-20 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo/hpg-badge.png"
              alt="Hidden PG"
              className="h-9 w-9 rounded"
              loading="lazy"
            />
            <span className="text-lg md:text-xl font-semibold text-slate-900">
              Hidden PG
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
              <li>
                <Link
                  to="/"
                  className="rounded-full bg-white shadow-sm px-4 py-2 text-slate-800 hover:bg-slate-50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/hidden-gems-prince-george"
                    className="rounded-full bg-white shadow-sm px-4 py-2 text-slate-800 hover:bg-slate-50">
                    Hidden Gems
                </Link>
              </li>
              <li>
                {/* hash link to homepage section */}
                <a
                  href="/#gems"
                  className="rounded-full bg-white shadow-sm px-4 py-2 text-slate-800 hover:bg-slate-50"
                >
                  Explore Gems
                </a>
              </li>
              <li>
                <Link
                  to="/events"
                  className="rounded-full bg-white shadow-sm px-4 py-2 text-slate-800 hover:bg-slate-50"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="rounded-full bg-white shadow-sm px-4 py-2 text-slate-800 hover:bg-slate-50"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="rounded-full bg-white shadow-sm px-4 py-2 text-slate-800 hover:bg-slate-50"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-slate-700 shadow-sm hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (full width, but content still centered) */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-3">
            <ul className="grid gap-2 text-slate-900">
              <li><Link onClick={() => setOpen(false)} to="/" className="block rounded-lg px-3 py-2 hover:bg-slate-50">Home</Link></li>
                <li><Link onClick={() => setOpen(false)} to="/hidden-gems-prince-george" className="block rounded-lg px-3 py-2 hover:bg-slate-50">Hidden Gems</Link></li>
              <li><a onClick={() => setOpen(false)} href="/#gems" className="block rounded-lg px-3 py-2 hover:bg-slate-50">Explore Gems</a></li>
              <li><Link onClick={() => setOpen(false)} to="/events" className="block rounded-lg px-3 py-2 hover:bg-slate-50">Events</Link></li>
              <li><Link onClick={() => setOpen(false)} to="/blog" className="block rounded-lg px-3 py-2 hover:bg-slate-50">Blog</Link></li>
              <li><Link onClick={() => setOpen(false)} to="/contact" className="block rounded-lg px-3 py-2 hover:bg-slate-50">Contact</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
