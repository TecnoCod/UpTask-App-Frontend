import useProyectos from '../hooks/useProyectos';

const Colaboradores = ({ colaborador }) => {
	const { nombre, email } = colaborador;
	const { hanledModalEliminarColaborador } = useProyectos();

	return (
		<div className='border-b p-5 flex justify-between items-center'>
			<div>
				<p className='mb-1 text-xl'>{nombre}</p>
				<p className='mb-1 text-sm text-gray-600'>{email}</p>
			</div>
			<div>
				<button
					type='button'
					className='transition-colors uppercase mt-2.5 font-bold py-3 px-5 rounded-lg text-sm w-full md:w-auto text-center text-white bg-gray-500 hover:bg-red-800'
					onClick={() => hanledModalEliminarColaborador(colaborador)}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Colaboradores;
