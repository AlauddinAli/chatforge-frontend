// src/components/ThemeSelector.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
  const { currentTheme, themes, changeTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl ${theme.colors.bgButtonSecondary} ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-all font-semibold text-sm`}
      >
        <span className="text-lg">🎨</span>
        <span className="hidden sm:inline">Theme</span>
        <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 rounded-2xl ${theme.colors.bgDropdown} shadow-2xl py-2 z-50 overflow-hidden animate-fadeIn`}>
          <div className="px-4 py-2 border-b ${theme.colors.borderSecondary}">
            <p className={`text-xs font-semibold ${theme.colors.textMuted}`}>Choose Theme</p>
          </div>
          
          {Object.entries(themes).map(([key, themeObj]) => (
            <button
              key={key}
              onClick={() => {
                changeTheme(key);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                currentTheme === key
                  ? `${theme.colors.bgButton} ${theme.colors.textPrimary}`
                  : `hover:bg-white/10 ${theme.colors.textSecondary}`
              }`}
            >
              <span className="text-lg">{themeObj.name.split(' ')[0]}</span>
              <span className="text-sm font-semibold flex-1">{themeObj.name.split(' ').slice(1).join(' ')}</span>
              {currentTheme === key && <span>✓</span>}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
