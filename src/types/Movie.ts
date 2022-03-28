export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  budget: number;
  genres: Array<any>;
  original_language: string;
  poster_path: string;
  release_date: string;
  overview: string;
  status: string;
}
