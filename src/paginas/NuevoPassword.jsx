import { useState, useEffect } from 'react';
import funtionAlerta from '../helpers/Alerta';
import { Link, useParams } from 'react-router-dom';
import instanceAxios from '../config/clienteAxios';

const NuevoPassword = () => {
	const [tokenValido, setTokenValido] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordModificado, setPasswordModificado] = useState(false);

	// validar el password
	const params = useParams();
	const { token } = params;

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await instanceAxios(`/usuarios/recuperar_password/${token}`);
				setTokenValido(true);
			} catch (error) {
				funtionAlerta({
					msg: error.response.data.msg,
					tipo: 'error',
					position: 'top-right',
				});
			}
		};
		comprobarToken();
	}, []);

	const handleNuevoPassword = async e => {
		e.preventDefault();

		if (password.length < 6) {
			funtionAlerta({
				msg: 'El password debe tener al menos 6 caracteres',
				tipo: 'error',
				position: 'top-right',
			});
		}

		try {
			const { data } = await instanceAxios.post(
				`/usuarios/recuperar_password/${token}`,
				{
					password,
				}
			);
			if (data) {
				funtionAlerta({
					msg: data.msg,
					tipo: 'success',
					position: 'top-right',
				});
			}
			setPasswordModificado(true);
			setTokenValido(false);
		} catch (error) {
			funtionAlerta({
				msg: error.response.data.msg,
				tipo: 'error',
				position: 'top-right',
			});
		}
	};

	return (
		<>
			<h1 className='text-cyan-600 font-black text-6xl capitalize'>
				Reestablece tu Password y recupera los{' '}
				<span className='text-slate-700'>Proyectos</span>
			</h1>
			{tokenValido && (
				<form
					className='my-10 bg-white shadow rounded-lg p-10'
					onSubmit={handleNuevoPassword}
				>
					<div className='my-5 '>
						<label
							htmlFor='password'
							className='uppercase text-gray-700 block text-xl font-bold'
						>
							Nuevo Password
						</label>
						<input
							type='password'
							id='password'
							placeholder='Escribe tu nuevo Password'
							className='mt-3 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<input
						type='submit'
						value='Guardar Nuevo Password'
						className='mt-5 mb-5 bg-cyan-600 text-white font-bold py-3 w-full rounded-lg uppercase hover:cursor-pointer hover:bg-cyan-800 transition-colors'
					/>
				</form>
			)}
			{passwordModificado && (
				<div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
					<Link
						to='/'
						className='block text-center uppercase text-sm my-16 bg-cyan-600 rounded-full px-4 py-2 text-white'
					>
						Inicia Sesión
					</Link>
				</div>
			)}
		</>
	);
};

export default NuevoPassword;
