import { TypeOptions, toast } from "react-toastify";

async function showToast(mensagem: string, tipo: TypeOptions | undefined) {
  toast(mensagem, {
    position: toast.POSITION.TOP_CENTER,
    type: tipo,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
  });

  return toast;
}
export default showToast;