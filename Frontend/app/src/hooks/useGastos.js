import { useRef, useState } from "react";
import { GastosInfoModel, GastosInfoUpdateModel } from "../models";
import { consumServices } from "../contexts/execute";
import { keys } from "../utils";
import { Alerts, Dialog } from "../utils/alerts";

export const useGastos = () => {
  const [loader, setLoader] = useState(true);
  const [productId, setProductId] = useState({});
  const [gastos, setGastos] = useState([]);
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [openState, setOpenState] = useState(false);
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

  const registerGasto = async () => {
    const payload = {
      ...dataRegister,
      type,
      estado: state,
      valordeuda: dataRegister.valordeuda || "0",
    };

    const res = await consumServices(keys.registerGastos, "POST", "", payload);
    if (res.error) return console.error(res)
      
    Alerts('Completado', 'Nuevo gastos registrado con exito')
    setGastos((prev) => [...prev, res.info[0]]);
    form.current?.reset();
  };

  const updateGastoService = async () => {
    const payload = {
      ...dataRegisterUpdate,
      type,
      estado: state,
      valordeuda: state === typeState[0] ? "0" : dataRegisterUpdate.valordeuda,
    };

    const res = await consumServices(keys.updateGasto, "POST", "", payload);
    if (res.error) return console.error(res)

    Alerts('Completado', 'Gastos actualizado con exito')
    setGastos((prev) =>
      prev.map((gasto) => (gasto._id === dataRegisterUpdate.id ? res.info[0] : gasto))
    );
  };

  const deleteGasto = async () => {
    const res = await consumServices(keys.deleteGasto, "DELETE", "", productId);
    console.log(res)
    if (res.error) return console.error(res)

    setGastos((prev) => prev.filter((gasto) => gasto._id !== res.info.product._id));
    Alerts('Completado', 'Gasto eliminado con exito')
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

  const handleIdGastoDelete = async ({ _id }) => {
    setProductId({ id: _id })
    /* await Dialog(deleteGasto) */
  };

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
    handleChangeUpdate
  };
};
