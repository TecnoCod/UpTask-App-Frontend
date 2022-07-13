import { useState } from 'react';
import { Link } from 'react-router-dom';
import instanceAxios from '../config/clienteAxios';
import funtionAlerta from '../helpers/Alerta';

const OlvidePassword = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		if (email === '') {
			funtionAlerta({
				msg: 'El campo email es obligatorio',
				tipo: 'error',
				position: 'top-right',
			});
			return;
		}

		try {
			const { data } = await instanceAxios.post(
				`/usuarios/recuperar_password`,
				{
					email,
				}
			);
			if (data) {
				funtionAlerta({
					msg: data.msg,
					tipo: 'success',
					position: 'top-right',
				});
			}
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
				Recupera tu acceso y no pierdas tus{' '}
				<span className='text-slate-700'>Proyectos</span>
			</h1>
			<form
				className='my-10 bg-white shadow rounded-lg p-10'
				onSubmit={handleSubmit}
			>
				<div className='my-5 '>
					<label
						htmlFor='email'
						className='uppercase text-gray-700 block text-xl font-bold'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						placeholder='Email de Registro'
						className='mt-3 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<input
					type='submit'
					value='Enviar Email'
					className='mt-5 mb-5 bg-cyan-600 text-white font-bold py-3 w-full rounded-lg uppercase hover:cursor-pointer hover:bg-cyan-800 transition-colors'
				/>
			</form>
			<nav className='lg:flex lg:justify-between'>
				<Link
					className='block text-center lg:inline-block lg:mt-0 text-cyan-600 hover:text-cyan-800'
					to='/'
				>
					Ya tienes una cuenta? Inicia Sesión
				</Link>
				<Link
					className='block text-center lg:inline-block lg:mt-0 text-cyan-600 hover:text-cyan-800'
					to='/registrar'
				>
					No tienes una cuenta? Regístrate
				</Link>
			</nav>
		</>
	);
};

export default OlvidePassword;
