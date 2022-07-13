import useProyectos from '../hooks/useProyectos';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import ModalFormularioTareas from '../components/ModalFormularioTareas';
import Tareas from '../components/Tareas';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Colaboradores from '../components/Colaboradores';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import useAdmin from '../hooks/useAdmin';
import io from 'socket.io-client';

let socket;

const Proyecto = () => {
	const {
		obtenerProyecto,
		proyecto,
		cargando,
		handleModalTarea,
		submitTareasProyectos,
		eliminarTareasProyectos,
		actualizarTareaProyecto,
		completarTareaProyecto,
	} = useProyectos();
	const params = useParams();
	const admin = useAdmin();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
		socket.emit('abrir proyecto', params.id);
	}, []);

	useEffect(() => {
		socket.on('tarea agregada', tareaNueva => {
			if (tareaNueva.proyecto === proyecto._id) {
				submitTareasProyectos(tareaNueva);
			}
		});

		socket.on('tarea eliminada', tareaEliminada => {
			if (tareaEliminada.proyecto === proyecto._id) {
				eliminarTareasProyectos(tareaEliminada);
			}
		});

		socket.on('tarea actualizada', tareaActualizada => {
			if (tareaActualizada.proyecto._id === proyecto._id) {
				actualizarTareaProyecto(tareaActualizada);
			}
		});

		socket.on('tarea completada', tareaCompletada => {
			if (tareaCompletada.proyecto._id === proyecto._id) {
				completarTareaProyecto(tareaCompletada);
			}
		});
	});

	const { nombre } = proyecto;

	return cargando ? (
		<div>Cargando...</div>
	) : (
		<>
			<div className='flex justify-between'>
				<h1 className='font-black text-4xl'>{nombre}</h1>
				{!admin && (
					<div className='flex items-center gap-2 text-gray-400 hover:text-black'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
							<path
								fillRule='evenodd'
								d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
								clipRule='evenodd'
							/>
						</svg>
						<Link
							to={`/proyectos/editar/${params.id}`}
							className='uppercase font-bold'
						>
							Editar
						</Link>
					</div>
				)}
			</div>
			{!admin && (
				<button
					type='button'
					className='transition-colors flex gap-2 justify-center items-center uppercase mt-2.5 font-bold py-3 px-5 rounded-lg text-sm w-full md:w-auto text-center text-white bg-cyan-600 hover:bg-cyan-800'
					onClick={handleModalTarea}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
							clipRule='evenodd'
						/>
					</svg>
					Nueva Tarea
				</button>
			)}
			<p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

			<div className='bg-white shadow mt-10 rounded-lg'>
				{proyecto.tareas?.length ? (
					proyecto.tareas?.map(tarea => (
						<Tareas key={tarea._id} tarea={tarea} />
					))
				) : (
					<p className='text-center my-5 p-10'>
						No hay tareas en este Proyecto
					</p>
				)}
			</div>
			{!admin && (
				<>
					<div className='flex items-center justify-between mt-10'>
						<p className='font-bold text-xl'>Colaboradores</p>
						<Link
							to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
							className='flex items-center uppercase font-bold text-gray-400 hover:text-black gap-2'
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
									d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
								/>
							</svg>
							Añadir
						</Link>
					</div>

					<div className='bg-white shadow mt-10 rounded-lg'>
						{proyecto.colaboradores?.length ? (
							proyecto.colaboradores?.map(colaborador => (
								<Colaboradores
									key={colaborador._id}
									colaborador={colaborador}
								/>
							))
						) : (
							<p className='text-center my-5 p-10'>
								No hay Colaboradores en este Proyecto
							</p>
						)}
					</div>
				</>
			)}

			<ModalFormularioTareas />
			<ModalEliminarTarea />
			<ModalEliminarColaborador />
		</>
	);
};

export default Proyecto;
