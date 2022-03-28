import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

/* ENV Variables */
import { environment } from '../../../environments/environment';

/* Types */
import { Movie } from '../../../types/Movie';

/* Localization */
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de', 'it']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|de|it|/) ? browserLang : 'en');
  }

  movies: Movie[] = [];

  imgURL = 'https://image.tmdb.org/t/p/w300/';
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
