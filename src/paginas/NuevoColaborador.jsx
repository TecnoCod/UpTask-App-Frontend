import FormularioColaborador from '../components/FormularioColaborador';
import useProyectos from '../hooks/useProyectos';

const NuevoColaborador = () => {
	const { proyecto, colaborador, cargando, agregarColaborador } =
		useProyectos();

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='text-4xl font-black'>
					Añadir Colaborador(a) al{' '}
					<span className='text-blue-800'>Proyecto {proyecto.nombre}</span>
				</h1>
			</div>
			<div className='mt-10 flex justify-center'>
				<FormularioColaborador />
			</div>

			{cargando ? (
				<div className='mt-10 flex justify-center'>Cargando...</div>
			) : (
				colaborador?._id && (
					<div className='mt-10 flex justify-center'>
						<div className='bg-white py-10 px-5 md:w-1/2 w-full rounded-lg shadow'>
							<h2 className='text-center mb-10 text-2xl font-bold'>
								Resultado:{' '}
							</h2>
							<div className='flex justify-between items-center'>
								<p>{colaborador.nombre}</p>

								<button
									type='button'
									className='bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
									onClick={() =>
										agregarColaborador({ email: colaborador.email })
									}
								>
									Agregar al Proyecto
								</button>
							</div>
						</div>
					</div>
				)
			)}
		</>
	);
};

export default NuevoColaborador;
