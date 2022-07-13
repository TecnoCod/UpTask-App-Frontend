/* eslint-disable no-useless-return */
import { useState, useEffect, createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import instanceAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const [cargando, setCargando] = useState(true);
	// TODO: revisar si se puede usar useNavigate, esta causando error en el buscador
	// const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setCargando(false);
				return;
			}
			try {
				const { data } = await instanceAxios.get('/usuarios/perfil', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				setAuth(data);
				// navigate('/proyectos');
			} catch (error) {
				setAuth({});
				// localStorage.removeItem('token');
			} finally {
				setCargando(false);
			}
		};
		autenticarUsuario();
	}, []);

	const cerrarSesionAuth = () => {
		setAuth({});
	};

	return (
		<AuthContext.Provider value={{ auth, cargando, setAuth, cerrarSesionAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
