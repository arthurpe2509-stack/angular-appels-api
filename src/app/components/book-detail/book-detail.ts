import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Book } from '../../services/api';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetailComponent implements OnInit {
  livre: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const key = decodeURIComponent(this.route.snapshot.params['key']);
    this.apiService.getWorkDetails(key).subscribe(data => {
      this.livre = data;
      this.cdr.detectChanges();
    });
  }

  getDescription(): string {
    if (!this.livre?.description) return 'Pas de description disponible.';
    return typeof this.livre.description === 'string'
      ? this.livre.description
      : this.livre.description.value;
  }
}