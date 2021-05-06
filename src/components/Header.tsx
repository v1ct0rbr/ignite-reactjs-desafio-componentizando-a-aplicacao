import { Genre } from '../@types/Genre';

interface HeaderProps {
	selectedGenre: Genre;
}

export function Header(props: HeaderProps) {
	return (
		<header>
			<span className="category">
				Categoria:<span> {props.selectedGenre.title}</span>
			</span>
		</header>
	);
}
