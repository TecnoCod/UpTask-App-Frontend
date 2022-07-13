import { useState, useEffect, createContext } from 'react';
import instanceAxios from '../config/clienteAxios';
import funtionAlerta from '../helpers/Alerta';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

let socket;

const ProyectoContext = createContext();

const ProyectoProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [proyecto, setProyecto] = useState({});
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
	const [tarea, setTarea] = useState({});
	const [modalEliminarTarea, setModalEliminarTareas] = useState(false);
	const [colaborador, setColaborador] = useState({});
	const [modalEliminarColaborador, setModalEliminarColaborador] =
		useState(false);
	const [buscador, setBuscador] = useState(false);

	const navigate = useNavigate();
	const { auth } = useAuth();

	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL);
	}, []);

	useEffect(() => {
		const obtenerProyectos = async () => {
			try {
				const token = localStorage.getItem('token');
				const { data } = await instanceAxios('/proyectos', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				setProyectos(data);
			} catch (error) {
				console.log(error);
			}
		};
		obtenerProyectos();
	}, [auth]);

	const submitProyectos = async proyecto => {
		if (proyecto.id) {
			await editarProyecto(proyecto);
		} else {
			await crearProyecto(proyecto);
		}
	};

	const editarProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			// eslint-disable-next-line no-useless-return
			if (proyecto) {
				const { data } = await instanceAxios.put(
					`/proyectos/${proyecto.id}`,
					proyecto,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const proyectosActualizados = proyectos.map(proyectoState =>
					proyectoState._id === data._id ? data : proyectoState
				);

				setProyectos(proyectosActualizados);

				funtionAlerta({
					msg: 'Proyecto Editado Correctamente',
					tipo: 'success',
					position: 'bottom-right',
				});
				setTimeout(() => {
					navigate('/proyectos');
				}, 2000);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const crearProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			// eslint-disable-next-line no-useless-return
			if (proyecto) {
				const { data } = await instanceAxios.post('/proyectos', proyecto, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				setProyectos([...proyectos, data]);
				funtionAlerta({
					msg: 'Proyecto Creado Correctamente',
					tipo: 'success',
					position: 'bottom-right',
				});
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const obtenerProyecto = async id => {
		setCargando(true);
		try {
			if (id) {
				const token = localStorage.getItem('token');
				const { data } = await instanceAxios(`/proyectos/${id}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				setProyecto(data);
			}
		} catch (error) {
			navigate('/proyectos');
			console.log(error);
		} finally {
			setCargando(false);
		}
	};

	const eliminarProyecto = async id => {
		setCargando(true);
		try {
			if (id) {
				const token = localStorage.getItem('token');
				const { data } = await instanceAxios.delete(`/proyectos/${id}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				const proyectosActualizados = proyectos.filter(
					proyectoState => proyectoState._id !== id
				);

				setProyectos(proyectosActualizados);
				funtionAlerta({
					msg: data.msg,
					tipo: 'info',
					position: 'bottom-right',
				});

				setTimeout(() => {
					navigate('/proyectos');
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setCargando(false);
		}
	};

	const handleModalTarea = () => {
		setModalFormularioTarea(!modalFormularioTarea);
		setTarea({});
	};

	const submitTarea = async tarea => {
		if (tarea?.id) {
			await editarTarea(tarea);
		} else {
			await crearTarea(tarea);
		}
	};

	const handleModalEditarTarea = tarea => {
		setTarea(tarea);
		setModalFormularioTarea(true);
	};

	const crearTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (tarea) {
				const { data } = await instanceAxios.post('/tareas', tarea, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				funtionAlerta({
					msg: 'Tarea Creada Correctamente',
					tipo: 'success',
					position: 'bottom-right',
				});
				setModalFormularioTarea(false);

				// socket
				socket.emit('nueva tarea', data);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const editarTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (tarea) {
				const { data } = await instanceAxios.put(`/tareas/${tarea.id}`, tarea, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				socket.emit('actualizar tarea', data);
				funtionAlerta({
					msg: 'Tarea Actualizada Correctamente',
					tipo: 'success',
					position: 'bottom-right',
				});
				setModalFormularioTarea(false);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const hanledModalEliminarTarea = tarea => {
		setTarea(tarea);
		setModalEliminarTareas(!modalEliminarTarea);
	};

	const eliminarTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (tarea) {
				await instanceAxios.delete(`/tareas/${tarea._id}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				socket.emit('eliminar tarea', tarea);
				funtionAlerta({
					msg: 'Tarea Eliminada Correctamente',
					tipo: 'info',
					position: 'bottom-right',
				});
				setModalEliminarTareas(false);
				setTarea({});
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const submitColaborador = async email => {
		setCargando(true);
		try {
			const token = localStorage.getItem('token');
			if (email) {
				const { data } = await instanceAxios.post(
					'/proyectos/colaboradores',
					{ email },
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setColaborador(data);
				funtionAlerta({
					msg: 'Colaborador Encontrado',
					tipo: 'info',
					position: 'bottom-right',
				});
			}
		} catch (error) {
			funtionAlerta({
				msg: error.response.data.msg,
				tipo: 'error',
				position: 'bottom-right',
			});
		} finally {
			setCargando(false);
		}
	};

	const agregarColaborador = async email => {
		try {
			const token = localStorage.getItem('token');
			if (email) {
				const { data } = await instanceAxios.post(
					`/proyectos/colaboradores/${proyecto._id}`,
					email,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				funtionAlerta({
					msg: data.msg,
					tipo: 'info',
					position: 'bottom-right',
				});
				setColaborador({});
			}
		} catch (error) {
			funtionAlerta({
				msg: error.response.data.msg,
				tipo: 'error',
				position: 'bottom-right',
			});
		}
	};

	const hanledModalEliminarColaborador = colaborador => {
		setColaborador(colaborador);
		setModalEliminarColaborador(!modalEliminarColaborador);
	};

	const eliminarColaborador = async colaborador => {
		try {
			const token = localStorage.getItem('token');

			if (colaborador) {
				const { data } = await instanceAxios.post(
					`/proyectos/eliminar-colaborador/${proyecto._id}`,
					{ id: colaborador._id },
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				// actualizacion del state al eliminar un colaborador
				const proyectoActualizado = { ...proyecto };
				proyectoActualizado.colaboradores =
					proyectoActualizado.colaboradores.filter(
						colaboradorState => colaboradorState._id !== colaborador._id
					);

				setProyecto(proyectoActualizado);

				funtionAlerta({
					msg: data.msg,
					tipo: 'success',
					position: 'bottom-right',
				});
				setColaborador({});
				setModalEliminarColaborador(false);
			}
		} catch (error) {
			funtionAlerta({
				msg: error.response.data.msg,
				tipo: 'error',
				position: 'bottom-right',
			});
		}
	};

	const completarTarea = async id => {
		try {
			const token = localStorage.getItem('token');
			if (tarea) {
				const { data } = await instanceAxios.post(
					`/tareas/estado/${id}`,
					{},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				socket.emit('completar tarea', data);
				setTarea({});
				if (data.estado === 'true') {
					funtionAlerta({
						msg: 'Tarea Completada',
						tipo: 'success',
						position: 'bottom-right',
					});
				} else {
					funtionAlerta({
						msg: 'Tarea No Completada',
						tipo: 'info',
						position: 'bottom-right',
					});
				}
			}
		} catch {
			console.log('error');
		}
	};

	const handleBuscador = () => {
		setBuscador(!buscador);
	};

	// Socket io, function create

	const submitTareasProyectos = tarea => {
		// agregar tarea al state
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = [...proyecto.tareas, tarea];

		setProyecto(proyectoActualizado);
	};

	const eliminarTareasProyectos = tarea => {
		// eliminar tarea al state
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
			tareaState => tareaState._id !== tarea._id
		);
		setProyecto(proyectoActualizado);
	};

	const actualizarTareaProyecto = tarea => {
		// editar tarea al state
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
			tareaState._id === tarea._id ? tarea : tareaState
		);
		setProyecto(proyectoActualizado);
	};

	const completarTareaProyecto = tarea => {
		const proyectoActualizado = { ...proyecto };
		proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
			tareaState._id === tarea._id ? tarea : tareaState
		);
		setProyecto(proyectoActualizado);
	};

	// cerrar sesion
	const cerrarSesion = () => {
		setProyecto({});
		setProyectos([]);
	};

	return (
		<ProyectoContext.Provider
			value={{
				proyectos,
				proyecto,
				cargando,
				modalFormularioTarea,
				tarea,
				modalEliminarTarea,
				colaborador,
				modalEliminarColaborador,
				buscador,
				submitProyectos,
				obtenerProyecto,
				eliminarProyecto,
				handleModalTarea,
				submitTarea,
				editarTarea,
				handleModalEditarTarea,
				hanledModalEliminarTarea,
				eliminarTarea,
				submitColaborador,
				agregarColaborador,
				eliminarColaborador,
				hanledModalEliminarColaborador,
				completarTarea,
				handleBuscador,
				submitTareasProyectos,
				eliminarTareasProyectos,
				actualizarTareaProyecto,
				completarTareaProyecto,
				cerrarSesion,
			}}
		>
			{children}
		</ProyectoContext.Provider>
	);
};

export { ProyectoProvider };
export default ProyectoContext;
