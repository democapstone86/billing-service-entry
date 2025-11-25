import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { ThemeServices } from '../../services/theme.services';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';
  menuOpen = false;

  constructor(
    private themeService: ThemeServices,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.theme = this.themeService.getStoredTheme();
  }

  toggle() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.getStoredTheme();
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:clcik')
  closeMenu(): void {
    if (!this.elementRef.nativeElement.contains(event?.target))
      this.menuOpen = false;
  }
}
