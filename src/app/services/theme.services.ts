import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeServices {
  private root = document.documentElement;

  constructor() {
    this.applyTheme(this.getStoredTheme());
  }

  getStoredTheme(): 'light' | 'dark' {
    return (
      (localStorage.getItem('theme') as 'light' | 'dark') ||
      this.getPreferredTheme()
    );
  }

  getPreferredTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  applyTheme(theme: 'light' | 'dark') {
    this.root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const current = this.root.getAttribute('data-theme') as 'light' | 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }
}
