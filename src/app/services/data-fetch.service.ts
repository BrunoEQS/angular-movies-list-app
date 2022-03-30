import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

/* ENV Variables */
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  endpoint: string = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.MOVIES_DATABASE_TOKEN}`;

  constructor() {}

  getMoviesData() {
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
    
    return data$;
  }
}
