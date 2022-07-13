import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ListarProyectos = ({ proyecto }) => {
	const { auth } = useAuth();
	const { nombre, _id, cliente, creador } = proyecto;

	return (
		<div className='border-b p-5 flex'>
			<div className='flex items-center gap-2 justify-between'>
				<p>
					{nombre}
					<span className='text-sm text-gray-500 uppercase ml-3'>
						{' '}
						{cliente}
					</span>
				</p>

				{auth._id !== creador && (
					<p className='p-1 text-xs rounded-lg text-white bg-indigo-700 font-bold'>
						Colaborador
					</p>
				)}
			</div>

			<Link
				to={`${_id}`}
				className='bg-slate-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded-full ml-auto'
			>
				Ver Proyecto
			</Link>
		</div>
	);
};

export default ListarProyectos;
