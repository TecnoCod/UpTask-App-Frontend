import { formatearFecha } from '../helpers/formatearFecha';
import useAdmin from '../hooks/useAdmin';
import useProyectos from '../hooks/useProyectos';

const Tareas = ({ tarea }) => {
	const { handleModalEditarTarea, hanledModalEliminarTarea, completarTarea } =
		useProyectos();
	const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = tarea;
	const admin = useAdmin();

	return (
		<div className='border-b p-5 flex justify-between items-center'>
			<div className='flex flex-col items-start'>
				<p className='mb-1 text-xl'>{nombre}</p>
				<p className='mb-1 text-sm text-gray-600 uppercase'>{descripcion}</p>
				<p className='mb-1 text-xl'>{formatearFecha(fechaEntrega)}</p>
				<p className='mb-1 text-gray-600'>
					<span className='font-bold'>Prioridad: </span>
					{prioridad}
				</p>
				{estado === 'true' && (
					<p className='text-xs bg-green-600 uppercase p-1 rounded-lg text-white'>
						Completada por : {tarea.completado.nombre}
					</p>
				)}
			</div>
			<div className='flex flex-col lg:flex-row gap-4'>
				{!admin && (
					<button
						type='button'
						className='transition-colors uppercase mt-2.5 font-bold py-3 px-5 rounded-lg text-sm w-full md:w-auto text-center text-white bg-gray-500 hover:bg-lime-800'
						onClick={() => handleModalEditarTarea(tarea)}
					>
						Editar
					</button>
				)}

				<button
					type='button'
					className={`transition-colors uppercase mt-2.5 font-bold py-3 px-5 rounded-lg text-sm w-full md:w-auto text-center text-white ${
						estado === 'true' ? 'bg-blue-800' : 'bg-gray-500'
					} hover:bg-blue-800`}
					onClick={() => completarTarea(_id)}
				>
					{estado === 'true' ? 'Completa' : 'Incompleta'}
				</button>

				{!admin && (
					<button
						type='button'
						className='transition-colors uppercase mt-2.5 font-bold py-3 px-5 rounded-lg text-sm w-full md:w-auto text-center text-white bg-gray-500 hover:bg-red-800'
						onClick={() => hanledModalEliminarTarea(tarea)}
					>
						Eliminar
					</button>
				)}
			</div>
		</div>
	);
};

export default Tareas;
