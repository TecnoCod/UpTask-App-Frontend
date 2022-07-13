/* eslint-disable no-useless-return */
import { useState } from 'react';
import funtionAlerta from '../helpers/Alerta';
import useProyectos from '../hooks/useProyectos';

const FormularioColaborador = () => {
	const [email, setEmail] = useState('');
	const { submitColaborador } = useProyectos();

	const handleSubmit = e => {
		e.preventDefault();

		if (email === '') {
			funtionAlerta({
				msg: 'El campo email es obligatorio',
				tipo: 'error',
				position: 'bottom-right',
			});
			return;
		}
		submitColaborador(email);
	};
	return (
		<form
			className='bg-white shadow rounded-lg px-5 py-10 w-full md:w-1/2'
			onSubmit={handleSubmit}
		>
			<div className='mb-5'>
				<label
					htmlFor='email'
					className='block text-gray-700 text-sm font-bold mb-2 uppercase'
				>
					Email Colaborador
				</label>
				<input
					type='email'
					id='email'
					className='border-2 w-full p-2 mt-2 rounded-md border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
					placeholder='Email del Usuario'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			</div>
			<input
				type='submit'
				value='Buscar Colaborador'
				className='bg-cyan-600 hover:bg-cyan-800 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
			/>
		</form>
	);
};

export default FormularioColaborador;
