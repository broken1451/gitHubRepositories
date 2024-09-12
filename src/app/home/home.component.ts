import { Component, inject, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Item } from '../interfaces/repository.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private githubSvc = inject(GithubService);
  public repositories: Item[] = [];
  public languages = this.githubSvc.languages;
  public loading: boolean = false;
  public err!: number;
  
  ngOnInit(): void {
    // Cargar el tema desde localStorage
    const theme = localStorage.getItem('theme');
    console.log('Tema cargado desde localStorage:', theme);

    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
  }


  getmore(termino: string) {
    let newItems = [];
    this.repositories = [];
    this.loading = true;
    this.githubSvc.getRepositories(termino).subscribe((response) => {
      const items = response.items;
      for (let index = 0; index < items.length; index++) {
        const idx = Math.floor(Math.random() * items.length);
        newItems.push(items[idx]);
      }
      let result = newItems.filter((item, index) => {
        return newItems.indexOf(item) === index;
      })
      this.repositories = result;
      this.loading = false;
    }, (error) => {
      this.err = error.status;
      this.loading = false;
    });
  }


  changeLanguage(language: Event) {
    const target = (language.target as HTMLSelectElement).value;
    if (target === '') {
      this.repositories = [];
      return;
    }
     this.getmore(target);
  }
  
  retry() {
    this.err = 0;
    this.getmore('TypeScript');
  }

  toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
  }

}
