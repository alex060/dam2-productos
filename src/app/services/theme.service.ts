import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = false;

  constructor() {
    // Recuperar preferencia guardada o del sistema
    const saved = localStorage.getItem('app-theme');
    if (saved) {
      this.isDarkMode = saved === 'dark';
    } else {
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  toggleTheme(): boolean {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('app-theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
    return this.isDarkMode;
  }

  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
      document.body.classList.toggle('ion-palette-dark', this.isDarkMode);
    }
  }
}
