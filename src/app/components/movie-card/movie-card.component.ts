import { Component, OnInit } from '@angular/core';

/* Types */
import { Movie } from '../../../types/Movie';

/* Services */
import { DataFetchService } from '../../services/data-fetch.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  providers: [DataFetchService],
})
export class MovieCardComponent implements OnInit {
  constructor(private getMoviesData: DataFetchService) {}

  p: number = 1; // pagination: default starting page
  movies: Movie[] = [];

  moviePosterSize = 300;
  imgURL: string = `https://image.tmdb.org/t/p/w${this.moviePosterSize}/`;

  ngOnInit() {
    this.getMoviesData.getMoviesData().subscribe((result) => {
      const moviesList = result.results;
      this.movies = [...moviesList];
    });
  }
}
