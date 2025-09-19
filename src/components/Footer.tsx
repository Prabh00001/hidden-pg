import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-pg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Brand / blurb */}
        <div className="grid gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo/hpg-badge.png" alt="Hidden PG" className="w-8 h-8 rounded" loading="lazy" />
              <span className="text-xl font-medium">Hidden PG</span>
            </div>
            <p className="text-white/80">
              Discover Prince George’s hidden gems — from trails to tastings.
            </p>
          </div>

          {/* Site pages */}
          <nav aria-label="Site pages" className="md:justify-self-center">
            <h4 className="font-semibold mb-2 text-white">Pages</h4>
            <ul className="space-y-1 text-white/80 text-sm">
  <li><Link className="hover:text-white" to="/events">Events</Link></li>
  <li><Link className="hover:text-white" to="/blog">Blog</Link></li>
  <li><Link className="hover:text-white" to="/contact">Contact</Link></li>
  <li><Link className="hover:text-white" to="/privacy">Privacy</Link></li>
  <li><Link className="hover:text-white" to="/about">About us</Link></li>
</ul>

          </nav>

          {/* Home sections */}
          <nav aria-label="Explore sections">
            <h4 className="font-semibold mb-2 text-white">Explore</h4>
            <ul className="space-y-1 text-white/80 text-sm">
              <li><a className="hover:text-white" href="/#gems">Gems</a></li>
              <li><a className="hover:text-white" href="/#featured">Featured</a></li>
              <li><a className="hover:text-white" href="/#newsletter">Newsletter</a></li>
              <li><a className="hover:text-white" href="/#feature-business">Feature Your Business</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/70 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Hidden PG. All rights reserved.</span>
          <span>Made with ♥ in Prince George.</span>
        </div>
      </div>
    </footer>
  );
}
