import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton
  ]
})
export class AboutPage {
  companyName = 'DAM2 Tech Solutions';
  githubUrl = 'https://github.com/alex060';
  themeService = inject(ThemeService);

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
