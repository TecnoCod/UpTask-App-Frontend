import { useState } from 'react';
import { Link } from 'react-router-dom';
import funtionAlerta from '../helpers/Alerta';
import instanceAxios from '../config/clienteAxios';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		if ([nombre, email, password, repetirPassword].includes('')) {
			funtionAlerta({
				msg: 'Todos los campos son obligatorios',
				tipo: 'error',
				position: 'top-right',
			});
			return;
		}

		if (password !== repetirPassword) {
			funtionAlerta({
				msg: 'Las contraseñas no coinciden',
				tipo: 'error',
				position: 'top-right',
			});
			return;
		}
		if (password.length < 6) {
			funtionAlerta({
				msg: 'La contraseña debe tener al menos 6 caracteres',
				tipo: 'error',
				position: 'top-right',
			});
			return;
		}

		// Creando

		try {
			const { data } = await instanceAxios.post('/usuarios', {
				nombre,
				email,
				password,
			});
			if (data) {
				funtionAlerta({
					msg: data.msg,
					tipo: 'success',
					position: 'top-right',
				});
			}
			setNombre('');
			setEmail('');
			setPassword('');
			setRepetirPassword('');
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
				Crea tu Cuenta y administra tus{' '}
				<span className='text-slate-700'>Proyectos</span>
			</h1>
			<form
				className='my-10 bg-white shadow rounded-lg p-10'
				onSubmit={handleSubmit}
			>
				<div className='my-5 '>
					<label
						htmlFor='nombre'
						className='uppercase text-gray-700 block text-xl font-bold'
					>
						Nombre
					</label>
					<input
						type='text'
						id='nombre'
						placeholder='Nombre de Usuario'
						className='mt-3 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>
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
				<div className='my-5 '>
					<label
						htmlFor='password'
						className='uppercase text-gray-700 block text-xl font-bold'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						placeholder='Password de Registro'
						className='mt-3 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='my-5 '>
					<label
						htmlFor='password2'
						className='uppercase text-gray-700 block text-xl font-bold'
					>
						Repetir Password
					</label>
					<input
						type='password'
						id='password2'
						placeholder='Repetir tu Password'
						className='mt-3 p-3 border-2 border-gray-200 rounded-xl bg-gray-50 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-600'
						value={repetirPassword}
						onChange={e => setRepetirPassword(e.target.value)}
					/>
				</div>

				<input
					type='submit'
					value='Crear Cuenta'
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
					to='/olvide-password'
				>
					Olvide Mi Password
				</Link>
			</nav>
		</>
	);
};

export default Registrar;
