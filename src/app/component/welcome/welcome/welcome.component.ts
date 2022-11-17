import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { APP_CONFIG } from '@configuration';
import _ from 'lodash';
import { marked, Renderer } from 'marked';
import highlightjs from 'highlight.js';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  data: SafeHtml = <any>{};
  md: any;

  componentTmpl = <any>APP_CONFIG.tmpl.welcomePage;
  mdTmpl = ``;

  static highlightCode(code: string, language: string): string {
    if (!(language && highlightjs.getLanguage(language))) {
      language = 'markdown';
    }

    const result = highlightjs.highlight(language, code).value;
    return `<code class="hljs ${language}">${result}</code>`;
  }

  constructor(private sanitizer: DomSanitizer) {
    const renderer = new Renderer();
    renderer.code = WelcomeComponent.highlightCode;
    this.md = marked.setOptions({ renderer });
  }

  ngOnInit(): void {
    const { tmplPath, tmplData } = this.componentTmpl;
    fetch(tmplPath)
      .then((response) => response.text())
      .then((text) => {
        const compiled = _.template(text);
        const value = compiled(tmplData);
        const html = this.md(value);
        const safeHtml = DOMPurify.sanitize(html);
        this.data = this.sanitizer.bypassSecurityTrustHtml(safeHtml);
      });
  }
}
