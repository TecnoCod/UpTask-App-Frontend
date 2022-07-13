import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
	const { auth } = useAuth();
	return (
		<aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
			<p className='text-xl font-bold'>Hola: {auth.nombre}</p>
			<Link
				to='crear-proyecto'
				className='text-white text-sm bg-cyan-600 p-3 rounded-md flex uppercase items-center font-bold mt-5 text-center'
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
						d='M12 4v16m8-8H4'
					/>
				</svg>
				Nuevo Proyectos
			</Link>
		</aside>
	);
};
export default Sidebar;
