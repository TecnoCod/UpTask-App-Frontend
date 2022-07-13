import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Busqueda from './Busqueda';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
	const { handleBuscador, cerrarSesion } = useProyectos();
	const { cerrarSesionAuth } = useAuth();

	const handleCerrarSesion = () => {
		cerrarSesion();
		cerrarSesionAuth();
		localStorage.removeItem('token');
	};
	return (
		<header className='bg-white border-b px-4 py-5'>
			<div className='md:flex md:justify-between'>
				<h2 className='text-4xl text-cyan-800 font-black text-center mb-5 md:mb-0'>
					UpTask
				</h2>

				<div className='flex flex-col md:flex-row items-center gap-4'>
					<button
						type='button'
						className='text-white text-sm bg-cyan-600 p-3 rounded-md flex uppercase items-center font-bold'
						onClick={handleBuscador}
					>
						Buscar Proyecto
					</button>
					<Link
						to='/proyectos'
						className='text-cyan-600 hover:text-cyan-800 font-black uppercase'
					>
						Proyectos
					</Link>
					<button
						type='button'
						className='text-white text-sm bg-cyan-600 p-3 rounded-md flex uppercase items-center font-bold'
						onClick={handleCerrarSesion}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
							/>
						</svg>
						Cerrar Sesion
					</button>
					<Busqueda />
				</div>
			</div>
		</header>
	);
};
export default Header;
