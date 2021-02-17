// src/app/icon/icon.component.ts
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IconService } from './icon.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-icon',
  // O template simplesmente renderiza o SVG baixado em uma div interna
  template: `<div class="icon-inner" [innerHTML]="svgContent | async"></div>`,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class IconComponent {
  @Input()
  @HostBinding('class')
    // Classes com tamanhos predefinidos
  size: 'small' | 'large' | 'default' = 'default';

  // Variável com a requisição do SVG que vai ser renderizado
  public svgContent: Observable<SafeHtml> | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: IconService
  ) {}

  @Input()
  set src(value: string) {
    // Pegamos o caminho do SVG e invocamos o
    // nosso service que vai baixá-lo.
    this.setSvgContent(value);
  }

  private setSvgContent(src: string): void {
    // Baixamos o SVG do service e atribuímos
    // à nossa variável que é renderizada no template
    this.svgContent = this.iconService
      .getSvgContent(src)
      .pipe(map(content => this.sanitizer.bypassSecurityTrustHtml(content)));
  }
}
