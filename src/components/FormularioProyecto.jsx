import { useState, useEffect } from 'react';
import funtionAlerta from '../helpers/Alerta';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';

const FormularioProyecto = () => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');

	// state global
	const { submitProyectos, proyecto } = useProyectos();

	const params = useParams();

	useEffect(() => {
		if (params.id) {
			setNombre(proyecto.nombre);
			setDescripcion(proyecto.descripcion);
			setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
			setCliente(proyecto.cliente);
		}
	}, [params]);

	const handleSubmit = async e => {
		e.preventDefault();

		if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
			funtionAlerta({
				msg: 'Todos los campos son obligatorios',
				tipo: 'error',
				position: 'bottom-right',
			});
			return;
		}

		await submitProyectos({
			nombre,
			descripcion,
			fechaEntrega,
			cliente,
			id: proyecto._id,
		});
		// setId(null);
		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setCliente('');
	};

	return (
		<form
			className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
			onSubmit={handleSubmit}
		>
			<div className='mb-5'>
				<label
					htmlFor='nombre'
					className='block text-gray-700 text-sm font-bold mb-2 uppercase'
				>
					Nombre Proyecto
				</label>
				<input
					type='text'
					id='nombre'
					className='border-2 w-full p-2 mt-2 rounded-md border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
					placeholder='Nombre del Proyecto'
					value={nombre}
					onChange={e => setNombre(e.target.value)}
				/>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='descripcion'
					className='block text-gray-700 text-sm font-bold mb-2 uppercase'
				>
					Descripción
				</label>
				<textarea
					type='text'
					id='descripcion'
					className='border-2 w-full p-2 mt-2 rounded-md border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
					placeholder='Descripción del Proyecto'
					value={descripcion}
					onChange={e => setDescripcion(e.target.value)}
				/>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='fecha-entrega'
					className='block text-gray-700 text-sm font-bold mb-2 uppercase'
				>
					Fecha de Entrega (dd/mm/aaaa)
				</label>
				<input
					type='date'
					id='fecha-entrega'
					className='border-2 w-full p-2 mt-2 rounded-md border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
					value={fechaEntrega}
					onChange={e => setFechaEntrega(e.target.value)}
				/>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='cliente'
					className='block text-gray-700 text-sm font-bold mb-2 uppercase'
				>
					Nombre del Cliente
				</label>
				<input
					type='text'
					id='cliente'
					className='border-2 w-full p-2 mt-2 rounded-md border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
					placeholder='Escribe el nombre del cliente'
					value={cliente}
					onChange={e => setCliente(e.target.value)}
				/>
			</div>
			<input
				type='submit'
				value={params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
				className='bg-cyan-600 hover:bg-cyan-800 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
			/>
		</form>
	);
};

export default FormularioProyecto;
