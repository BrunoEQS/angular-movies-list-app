import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

/* ENV Variables */
import { environment } from '../../../environments/environment';

/* Types */
import { Movie } from '../../../types/Movie';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  constructor() {}

  p: number = 1; // pagination: default starting page
  movies: Movie[] = [];

  moviePosterSize = 300;
  imgURL: string = `https://image.tmdb.org/t/p/w${this.moviePosterSize}/`;
  endpoint: string = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.MOVIES_DATABASE_TOKEN}`;

  ngOnInit(): void {
    const data$ = fromFetch(this.endpoint).pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError((err) => {
        console.error(err);
        return of({ error: true, message: err.message });
      })
    );

    data$.subscribe({
      next: (result) => {
        const moviesList = result.results;
        this.movies = [...moviesList];
      },
      complete: () => {
        console.log('complete fallback', this.movies);
      },
    });
  }
}
