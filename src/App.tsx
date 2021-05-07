import { useEffect, useState } from 'react';
import { api } from './services/api';

import { Genre } from './@types/Genre';
import { Movie } from './@types/Movie';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { Content } from './components/Content';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { AxiosResponse } from 'axios';

//'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
const firstGenre = 'action';

export function App() {
	const [selectedGenreId, setSelectedGenreId] = useState(0);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

	useEffect(() => {
		api.get<Genre[]>('genres').then((response) => {
			setGenres(response.data);
		});
		api.get<Genre[]>(`genres/?name=${firstGenre}`).then((response) => {
			if (response?.data) {
				setSelectedGenre(response.data[0]);
				setSelectedGenreId(response.data[0].id);
			}
		});
	}, []);

	useEffect(() => {
		if (selectedGenreId > 0)
			api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
				setMovies(response.data);
			});
	}, [selectedGenreId]);

	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}

	return (
		<div className="wrapper">
			<SideBar genres={genres} handleClickButton={handleClickButton} selectedGenreId={selectedGenreId} />

			<div className="container">
				<Header selectedGenre={selectedGenre} />
				<Content movies={movies} />
			</div>
		</div>
	);
}
