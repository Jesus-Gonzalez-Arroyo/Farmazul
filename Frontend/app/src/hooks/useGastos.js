import { useRef, useState } from "react";
import { GastosInfoModel, GastosInfoUpdateModel } from "../models";
import { consumServices } from "../contexts/execute";
import { keys } from "../utils";

export const useGastos = () => {
  const [loader, setLoader] = useState(true);
  const [productId, setProductId] = useState({});
  const [gastos, setGastos] = useState([]);
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [infoAlert, setInfoAlert] = useState({ show: false, message: "", type: "success", error: false });

  const form = useRef();

  const types = ["Pago", "Compra"];
  const typeState = ["Pagado", "En deuda"];

  const [dataRegister, setDataRegister] = useState(new GastosInfoModel());
  const [dataRegisterUpdate, setDataRegisterUpdate] = useState(new GastosInfoUpdateModel({}));

  const handleSelect = (value) => {
    setType(value);
    setOpen(false);
  };

  const handleSelectState = (value) => {
    setState(value);
    setOpenState(false);
  };

  const updateInfoAlert = (message, type = "success", error=false) => {
    setInfoAlert({ show: true, message, type, error });
    setTimeout(() => {
      setInfoAlert((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const registerGasto = async () => {
    const payload = {
      ...dataRegister,
      type,
      estado: state,
      valordeuda: dataRegister.valordeuda || "0",
    };

    const res = await consumServices(keys.registerGastos, "POST", "", payload);
    if (res.error) return updateInfoAlert("Ha ocurrido un error", "danger", true);

    setGastos((prev) => [...prev, res.info[0]]);
    form.current?.reset();
    updateInfoAlert("Se ha añadido un nuevo gasto con éxito");
  };

  const updateGastoService = async () => {
    const payload = {
      ...dataRegisterUpdate,
      type,
      estado: state,
      valordeuda: state === typeState[0] ? "0" : dataRegisterUpdate.valordeuda,
    };

    const res = await consumServices(keys.updateGasto, "POST", "", payload);
    if (res.error) return updateInfoAlert("Ha ocurrido un error", "danger", true);

    setGastos((prev) =>
      prev.map((gasto) => (gasto._id === dataRegisterUpdate.id ? res.info[0] : gasto))
    );
    updateInfoAlert("Se ha actualizado un gasto con éxito");
  };

  const deleteGasto = async () => {
    const res = await consumServices(keys.deleteGasto, "DELETE", "", productId);
    if (res.error) return updateInfoAlert("Ha ocurrido un error", "danger", true);

    setGastos((prev) => prev.filter((gasto) => gasto._id !== res.info.product._id));
    updateInfoAlert("Se ha eliminado un gasto con éxito");
  };

  const updateGasto = (info) => {
    setType(info.type);
    setState(info.estado);
    setDataRegisterUpdate(new GastosInfoUpdateModel(info));
  };

  const handleChange = ({ target: { name, value } }) =>
    setDataRegister((prev) => ({ ...prev, [name]: value }));

  const handleChangeUpdate = ({ target: { name, value } }) =>
    setDataRegisterUpdate((prev) => ({ ...prev, [name]: value }));

  const handleIdGastoDelete = ({ _id }) => setProductId({ id: _id });

  return {
    loader,
    gastos,
    types,
    typeState,
    open,
    openState,
    form,
    type,
    state,
    dataRegisterUpdate,
    infoAlert,
    setLoader,
    setGastos,
    setOpen,
    setOpenState,
    handleSelect,
    handleSelectState,
    handleIdGastoDelete,
    registerGasto,
    updateGastoService,
    deleteGasto,
    updateGasto,
    handleChange,
    handleChangeUpdate,
  };
};
