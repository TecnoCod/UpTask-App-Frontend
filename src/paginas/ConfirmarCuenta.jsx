import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import funtionAlerta from '../helpers/Alerta';
import instanceAxios from '../config/clienteAxios';

const ConfirmarCuenta = () => {
	const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

	const params = useParams();
	const { id } = params;

	useEffect(() => {
		const validarCuenta = async () => {
			try {
				const { data } = await instanceAxios.get(`/usuarios/confirmar/${id}`);
				funtionAlerta({
					msg: data.msg,
					tipo: 'success',
					position: 'top-right',
				});
				setCuentaConfirmada(true);
			} catch (error) {
				funtionAlerta({
					msg: error.response.data.msg,
					tipo: 'error',
					position: 'top-right',
				});
			}
		};
		validarCuenta();
	}, []);

	return (
		<>
			<h1 className='text-cyan-600 font-black text-6xl capitalize'>
				Confirma tu cuenta y comienza a crear tus{' '}
				<span className='text-slate-700'>Proyectos</span>
			</h1>
			{cuentaConfirmada && (
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

export default ConfirmarCuenta;
