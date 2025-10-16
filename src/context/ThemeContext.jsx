// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    name: '🔥 Default',
    colors: {
      // Your current beautiful theme!
      bgMain: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900',
      bgAnimated: 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10',
      bgOrb1: 'bg-purple-500/20',
      bgOrb2: 'bg-blue-500/20',
      bgCard: 'backdrop-blur-2xl bg-white/10 border border-white/20',
      bgNavbar: 'backdrop-blur-xl bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95',
      bgSidebar: 'backdrop-blur-2xl bg-gradient-to-b from-gray-900/80 to-purple-900/80 border-r border-white/10',
      bgHeader: 'backdrop-blur-xl bg-gray-800/90 border-b border-white/20',
      bgInput: 'backdrop-blur-xl bg-white/10 border border-white/20',
      bgButton: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600',
      bgButtonSecondary: 'backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20',
      bgMessageOwn: 'backdrop-blur-md bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-400/30',
      bgMessageOther: 'backdrop-blur-md bg-white/10 border border-white/20',
      bgContextMenu: 'bg-gray-800/95 backdrop-blur-md border border-white/20',
      bgDropdown: 'backdrop-blur-2xl bg-gray-900/95 border border-white/20',
      textGradient: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      borderPrimary: 'border-white/20',
      borderSecondary: 'border-white/10',
    }
  },
  
  light: {
    name: '☀️ Light Mode',
    colors: {
      bgMain: 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50',
      bgAnimated: 'bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20',
      bgOrb1: 'bg-purple-200/30',
      bgOrb2: 'bg-blue-200/30',
      bgCard: 'backdrop-blur-xl bg-white/90 border border-gray-200 shadow-xl',
      bgNavbar: 'backdrop-blur-xl bg-white/95 border-b border-gray-200',
      bgSidebar: 'backdrop-blur-xl bg-gradient-to-b from-white/95 to-gray-50/95 border-r border-gray-200',
      bgHeader: 'backdrop-blur-xl bg-white/90 border-b border-gray-200',
      bgInput: 'backdrop-blur-xl bg-white/80 border border-gray-300',
      bgButton: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white',
      bgButtonSecondary: 'backdrop-blur-xl bg-gray-100 border border-gray-300 hover:bg-gray-200',
      bgMessageOwn: 'backdrop-blur-md bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200',
      bgMessageOther: 'backdrop-blur-md bg-gray-50 border border-gray-200',
      bgContextMenu: 'bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl',
      bgDropdown: 'backdrop-blur-xl bg-white/95 border border-gray-200 shadow-xl',
      textGradient: 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-500',
      borderPrimary: 'border-gray-200',
      borderSecondary: 'border-gray-100',
    }
  },

  dark: {
    name: '🌙 Dark Mode',
    colors: {
      bgMain: 'bg-gradient-to-br from-black via-gray-950 to-black',
      bgAnimated: 'bg-gradient-to-br from-gray-800/10 via-gray-700/10 to-gray-800/10',
      bgOrb1: 'bg-gray-600/20',
      bgOrb2: 'bg-gray-700/20',
      bgCard: 'backdrop-blur-xl bg-gray-900/90 border border-gray-700',
      bgNavbar: 'backdrop-blur-xl bg-black/95 border-b border-gray-800',
      bgSidebar: 'backdrop-blur-xl bg-gradient-to-b from-gray-950/95 to-black/95 border-r border-gray-800',
      bgHeader: 'backdrop-blur-xl bg-gray-950/90 border-b border-gray-800',
      bgInput: 'backdrop-blur-xl bg-gray-900/80 border border-gray-700',
      bgButton: 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500',
      bgButtonSecondary: 'backdrop-blur-xl bg-gray-800 border border-gray-700 hover:bg-gray-700',
      bgMessageOwn: 'backdrop-blur-md bg-gray-800/80 border border-gray-700',
      bgMessageOther: 'backdrop-blur-md bg-gray-900/60 border border-gray-800',
      bgContextMenu: 'bg-gray-900/95 backdrop-blur-md border border-gray-700',
      bgDropdown: 'backdrop-blur-xl bg-gray-950/95 border border-gray-800',
      textGradient: 'bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-500',
      borderPrimary: 'border-gray-700',
      borderSecondary: 'border-gray-800',
    }
  },

  ocean: {
    name: '🌊 Ocean',
    colors: {
      bgMain: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900',
      bgAnimated: 'bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-blue-500/10',
      bgOrb1: 'bg-cyan-500/20',
      bgOrb2: 'bg-teal-500/20',
      bgCard: 'backdrop-blur-2xl bg-cyan-950/40 border border-cyan-500/20',
      bgNavbar: 'backdrop-blur-xl bg-gradient-to-r from-blue-950/95 via-cyan-950/95 to-blue-950/95',
      bgSidebar: 'backdrop-blur-2xl bg-gradient-to-b from-blue-950/80 to-cyan-950/80 border-r border-cyan-500/10',
      bgHeader: 'backdrop-blur-xl bg-cyan-900/90 border-b border-cyan-500/20',
      bgInput: 'backdrop-blur-xl bg-cyan-950/40 border border-cyan-500/20',
      bgButton: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600',
      bgButtonSecondary: 'backdrop-blur-xl bg-cyan-950/40 border border-cyan-500/20 hover:bg-cyan-950/60',
      bgMessageOwn: 'backdrop-blur-md bg-gradient-to-br from-cyan-500/30 to-teal-500/30 border border-cyan-400/30',
      bgMessageOther: 'backdrop-blur-md bg-cyan-950/40 border border-cyan-500/20',
      bgContextMenu: 'bg-cyan-950/95 backdrop-blur-md border border-cyan-500/20',
      bgDropdown: 'backdrop-blur-2xl bg-blue-950/95 border border-cyan-500/20',
      textGradient: 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent',
      textPrimary: 'text-cyan-50',
      textSecondary: 'text-cyan-200',
      textMuted: 'text-cyan-400',
      borderPrimary: 'border-cyan-500/20',
      borderSecondary: 'border-cyan-500/10',
    }
  },

  sunset: {
    name: '🔮 Sunset',
    colors: {
      bgMain: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
      bgAnimated: 'bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10',
      bgOrb1: 'bg-orange-500/20',
      bgOrb2: 'bg-pink-500/20',
      bgCard: 'backdrop-blur-2xl bg-orange-950/40 border border-orange-500/20',
      bgNavbar: 'backdrop-blur-xl bg-gradient-to-r from-orange-950/95 via-red-950/95 to-orange-950/95',
      bgSidebar: 'backdrop-blur-2xl bg-gradient-to-b from-orange-950/80 to-red-950/80 border-r border-orange-500/10',
      bgHeader: 'backdrop-blur-xl bg-red-900/90 border-b border-orange-500/20',
      bgInput: 'backdrop-blur-xl bg-orange-950/40 border border-orange-500/20',
      bgButton: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600',
      bgButtonSecondary: 'backdrop-blur-xl bg-orange-950/40 border border-orange-500/20 hover:bg-orange-950/60',
      bgMessageOwn: 'backdrop-blur-md bg-gradient-to-br from-orange-500/30 to-pink-500/30 border border-orange-400/30',
      bgMessageOther: 'backdrop-blur-md bg-orange-950/40 border border-orange-500/20',
      bgContextMenu: 'bg-orange-950/95 backdrop-blur-md border border-orange-500/20',
      bgDropdown: 'backdrop-blur-2xl bg-orange-950/95 border border-orange-500/20',
      textGradient: 'bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent',
      textPrimary: 'text-orange-50',
      textSecondary: 'text-orange-200',
      textMuted: 'text-orange-400',
      borderPrimary: 'border-orange-500/20',
      borderSecondary: 'border-orange-500/10',
    }
  },

  midnight: {
    name: '💎 Midnight',
    colors: {
      bgMain: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950',
      bgAnimated: 'bg-gradient-to-br from-indigo-500/10 via-slate-500/10 to-indigo-500/10',
      bgOrb1: 'bg-indigo-500/20',
      bgOrb2: 'bg-slate-500/20',
      bgCard: 'backdrop-blur-2xl bg-slate-950/60 border border-slate-700/30',
      bgNavbar: 'backdrop-blur-xl bg-gradient-to-r from-slate-950/95 via-indigo-950/95 to-slate-950/95',
      bgSidebar: 'backdrop-blur-2xl bg-gradient-to-b from-slate-950/80 to-indigo-950/80 border-r border-slate-700/20',
      bgHeader: 'backdrop-blur-xl bg-indigo-950/90 border-b border-slate-700/30',
      bgInput: 'backdrop-blur-xl bg-slate-950/60 border border-slate-700/30',
      bgButton: 'bg-gradient-to-r from-indigo-500 to-slate-400 hover:from-indigo-600 hover:to-slate-500',
      bgButtonSecondary: 'backdrop-blur-xl bg-slate-950/60 border border-slate-700/30 hover:bg-slate-950/80',
      bgMessageOwn: 'backdrop-blur-md bg-gradient-to-br from-indigo-500/30 to-slate-500/30 border border-indigo-400/30',
      bgMessageOther: 'backdrop-blur-md bg-slate-950/60 border border-slate-700/30',
      bgContextMenu: 'bg-slate-950/95 backdrop-blur-md border border-slate-700/30',
      bgDropdown: 'backdrop-blur-2xl bg-slate-950/95 border border-slate-700/30',
      textGradient: 'bg-gradient-to-r from-indigo-400 via-slate-300 to-indigo-400 bg-clip-text text-transparent',
      textPrimary: 'text-slate-50',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-500',
      borderPrimary: 'border-slate-700/30',
      borderSecondary: 'border-slate-700/20',
    }
  },

  sakura: {
    name: '🌸 Sakura',
    colors: {
      bgMain: 'bg-gradient-to-br from-pink-900 via-purple-900 to-pink-900',
      bgAnimated: 'bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10',
      bgOrb1: 'bg-pink-500/20',
      bgOrb2: 'bg-purple-500/20',
      bgCard: 'backdrop-blur-2xl bg-pink-950/40 border border-pink-500/20',
      bgNavbar: 'backdrop-blur-xl bg-gradient-to-r from-pink-950/95 via-purple-950/95 to-pink-950/95',
      bgSidebar: 'backdrop-blur-2xl bg-gradient-to-b from-pink-950/80 to-purple-950/80 border-r border-pink-500/10',
      bgHeader: 'backdrop-blur-xl bg-purple-900/90 border-b border-pink-500/20',
      bgInput: 'backdrop-blur-xl bg-pink-950/40 border border-pink-500/20',
      bgButton: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600',
      bgButtonSecondary: 'backdrop-blur-xl bg-pink-950/40 border border-pink-500/20 hover:bg-pink-950/60',
      bgMessageOwn: 'backdrop-blur-md bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-pink-400/30',
      bgMessageOther: 'backdrop-blur-md bg-pink-950/40 border border-pink-500/20',
      bgContextMenu: 'bg-pink-950/95 backdrop-blur-md border border-pink-500/20',
      bgDropdown: 'backdrop-blur-2xl bg-pink-950/95 border border-pink-500/20',
      textGradient: 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent',
      textPrimary: 'text-pink-50',
      textSecondary: 'text-pink-200',
      textMuted: 'text-pink-400',
      borderPrimary: 'border-pink-500/20',
      borderSecondary: 'border-pink-500/10',
    }
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('chatforge-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('chatforge-theme', themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    changeTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
