import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Phone, Heart, Calendar, BookOpen, Music, Video, MapPin, Sparkles } from 'lucide-react';
import Logo from '../common/Logo';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle sticky header scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Upcoming Satsang', path: '/satsang' },
    { name: 'Notices', path: '/notices' },
    { name: 'Videos', path: '/videos' },
    { name: 'Audio', path: '/audio' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-roseBlush-100 py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-roseBlush-100 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-roseBlush-100 text-maroon-800 font-semibold shadow-xs'
                      : 'text-stone-700 hover:text-maroon-700 hover:bg-roseBlush-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 text-stone-600 hover:text-maroon-700 hover:bg-roseBlush-50 rounded-full transition-colors"
              aria-label="Search website"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Contact Action */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-sm hover:shadow-md hover:from-maroon-800 hover:to-roseBlush-800 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-maroon-800 hover:bg-roseBlush-50 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-roseBlush-200 animate-in fade-in zoom-in-95 duration-200">
            <form onSubmit={handleSearchSubmit} className="p-4 sm:p-6 flex items-center gap-3 border-b border-stone-100">
              <Search className="w-6 h-6 text-maroon-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Satsang, Adhesh, Notices, Videos, Literature..."
                className="w-full text-base sm:text-lg focus:outline-hidden text-stone-800 placeholder-stone-400 bg-transparent"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="px-6 py-4 bg-roseBlush-50/60 text-xs text-stone-600 flex items-center justify-between">
              <span>Press <b>Enter</b> to search or search topics:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/search?q=Satsang');
                    setSearchOpen(false);
                  }}
                  className="px-2 py-0.5 rounded bg-white border border-roseBlush-200 text-maroon-700 hover:bg-roseBlush-100"
                >
                  #Satsang
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/search?q=Adhesh');
                    setSearchOpen(false);
                  }}
                  className="px-2 py-0.5 rounded bg-white border border-roseBlush-200 text-maroon-700 hover:bg-roseBlush-100"
                >
                  #Adhesh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-roseBlush-100">
                <Logo size="small" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-maroon-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-roseBlush-100 text-maroon-800 font-semibold'
                          : 'text-stone-700 hover:bg-roseBlush-50 hover:text-maroon-700'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-3 border-t border-roseBlush-100 mt-3 space-y-1">
                  <NavLink
                    to="/teachings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-700 hover:bg-roseBlush-50"
                  >
                    <BookOpen className="w-4 h-4 text-maroon-600" />
                    <span>Teachings & Philosophy</span>
                  </NavLink>
                  <NavLink
                    to="/publications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-700 hover:bg-roseBlush-50"
                  >
                    <Sparkles className="w-4 h-4 text-sacredGold-600" />
                    <span>Publications & Books</span>
                  </NavLink>
                  <NavLink
                    to="/faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-700 hover:bg-roseBlush-50"
                  >
                    <span>Frequently Asked Questions</span>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="p-6 bg-roseBlush-50 border-t border-roseBlush-100">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-maroon-700 text-white shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Ashram</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
