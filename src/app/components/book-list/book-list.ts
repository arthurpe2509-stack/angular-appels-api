import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Book } from '../../services/api';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent implements OnInit {
  livres = signal([] as Book[]);

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiService.getWorks().subscribe(data => {
      this.livres.set(data.docs);
      this.cdr.detectChanges();
    });
  }

  voirDetail(livre: Book) {
    // livre.key ressemble à "/works/OL12345W", on encode pour l'URL
    const key = encodeURIComponent(livre.key);
    this.router.navigate(['/book', key]);
  }
}