import '../App.css';
import PageWrapper from './PageWrapper';
import Pelicula from './Pelicula';
//import PeliculasJson from './peliculas.json';
import Paginacion from './Paginacion';
import { useEffect, useState } from 'react';



function ListadoPeliculas() { 

	const [paginaActual, setPaginaActual] = useState(1);
	const [peliculas, setPeliculas] = useState([]);
	const TOTAL_POR_PAGINA = 7;

	useEffect(() => {
		buscarPeliculas();
	}, []);

	//let peliculas = PeliculasJson;

	const buscarPeliculas = async () => {
		let url = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/jaito789/json/main/peliculas.json'
		




		let respuesta = await fetch(url, {
			"method": 'GET',
			"headers" : {
				"Accept": 'application/json',
				"Content-Type": 'application/json',
				"Origin": 'https://raw.githubusercontent.com/'
				

			}
		});
		let json = await respuesta.json();
		setPeliculas(json);
		//alert(json);
	}

	//buscarPelicula();
	

	  const getTotalPaginas = () => {
		let cantidadTotalDePeliculas = peliculas.length;
		return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
	  }

	  //cargarPeliculas();

	  //<button onClick={buscarPeliculas}>prueba</button>

	  let peliculasPorPagina = peliculas.slice(
		(paginaActual - 1) * TOTAL_POR_PAGINA,
		paginaActual * TOTAL_POR_PAGINA
	  );

  return (
	<>
	<PageWrapper>
	

	{peliculasPorPagina.map (pelicula => 
		<Pelicula titulo={pelicula.titulo} calificacion={pelicula.calificacion}
		director={pelicula.director} actores={pelicula.actores} fecha_lanzamiento={pelicula.fecha_lanzamiento} duracion={pelicula.duracion}
		img={pelicula.img}>
		{pelicula.descripcion}
		</Pelicula>

	)}
	<Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />
	</PageWrapper>
	</>
  );
}

export default ListadoPeliculas;

