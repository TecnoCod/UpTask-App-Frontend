import { toast } from 'react-toastify';

const funtionAlerta = ({ msg, tipo, position }) => {
	if (tipo === 'error') {
		toast.error(msg, {
			position,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	} else if (tipo === 'success') {
		toast.success(msg, {
			position,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	} else {
		toast.info(msg, {
			position,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	}
	return null;
};

export default funtionAlerta;
