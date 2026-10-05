import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons
} from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    RouterLink
  ]
})
export class InicioPage {
  themeService = inject(ThemeService);

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
