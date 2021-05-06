import { Genre } from '../@types/Genre';
import { Movie } from '../@types/Movie';
import { MovieCard } from './MovieCard';

interface ContentProps {
	movies: Movie[];
}

export function Content(props: ContentProps) {
	return (
		<main>
			<div className="movies-list">
				{props.movies.map((movie) => (
					<MovieCard
						key={movie.imdbID}
						title={movie.Title}
						poster={movie.Poster}
						runtime={movie.Runtime}
						rating={movie.Ratings[0].Value}
					/>
				))}
			</div>
		</main>
	);
}
