import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

/* import { MovieDetails } from '../../../types/Movie'; */

/* ENV Variables */
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  private routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {}

  movieGenres: any;
  movieDetails: any;
  moviePosterSize = 300;
  imgURL: string = `https://image.tmdb.org/t/p/w${this.moviePosterSize}/`;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const movieId = params['id'];

      const data$ = fromFetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${environment.MOVIES_DATABASE_TOKEN}`
      ).pipe(
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
          this.movieDetails = result;
          this.movieGenres = [...result.genres];
        },
        complete: () => {
          console.log('complete fallback', this.movieDetails);
          console.log('complete fallback', this.movieGenres);
        },
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
