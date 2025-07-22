import { useRef, useState } from "react"
import { consumServices } from "../contexts/execute"
import { NewUser, NewUserUpdate } from "../models"
import { keys } from "../utils"
import { Alerts } from "../utils/alerts"
import { FilterMatchMode } from "primereact/api"

export const UseUsers = () => {
    const roles = ["Admin", "Usuario"]
    const [users, setUsers] = useState([])
    const [resumeVentas, setResumenVentas] = useState([])
    const [loader, setLoader] = useState(true)
    const [rol, setRol] = useState("")
    const [open, setOpen] = useState(false)
    const [dataNewUser, setDataNewUser] = useState(new NewUser())
    const [dataUpdateUser, setDataUpdateUser] = useState(new NewUserUpdate({}))
    const [productID, setProductID] = useState({})
    const [totalPages, setTotalPages] = useState([])
    const [totalPagesUser, setTotalPagesUser] = useState([])
    const [filters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        rol: { value: null, matchMode: FilterMatchMode.EQUALS }
    })
    const form = useRef()

    const handleSelect = (value) => {
        setRol(value)
        setOpen(false)
    };

    const handleChangeNewUser = (e) => {
        const { name, value } = e.target;
        setDataNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeUpdateUser = (e) => {
        const { name, value } = e.target;
        setDataUpdateUser((prev) => ({ ...prev, [name]: value }));
    };

    function getInfoUserUpdate(info) {
        setDataUpdateUser(new NewUserUpdate(info))
        setRol(info.rol)
    }

    const getIdUser = (user) => {
        setProductID({
            id: user._id
        })
    }

    async function registerUser() {
        dataNewUser.rol = rol

        const registerUser = await consumServices(keys.registerUser, 'POST', '', dataNewUser)
        if (registerUser.error) return console.error(registerUser)

        setUsers((prev) => [registerUser.info[0], ...prev])
        Alerts('Completado', 'Nuevo usuario agregado con exito')
        form.current.reset()
    }

    async function updateInfoUser() {
        dataUpdateUser.rol = rol

        const resUpdate = await consumServices(keys.updateUser, 'POST', '', dataUpdateUser)
        if (resUpdate.error) return console.error(resUpdate)

        setUsers((prev) =>
            prev.map((user) =>
                user._id === dataUpdateUser.id ? resUpdate.info[0] : user
            )
        );
        Alerts('Completado', 'Usuario actualizado con exito')
        form.current.reset()
    }

    const deleteUser = async () => {
        const res = await consumServices(keys.deleteUser, 'DELETE', '', productID)
        if (res.error) console.error(res)

        setUsers((prev) => prev.filter((user) => user._id !== res.info._id))
        Alerts('Completado', 'Usuario eliminado con exito')
    }

    return {
        users,
        resumeVentas,
        loader,
        open,
        roles,
        rol,
        dataUpdateUser,
        form,
        totalPages,
        totalPagesUser,
        filters,
        setTotalPages,
        setTotalPagesUser,
        handleSelect,
        handleChangeNewUser,
        handleChangeUpdateUser,
        updateInfoUser,
        deleteUser,
        registerUser,
        getIdUser,
        getInfoUserUpdate,
        setOpen,
        setUsers,
        setResumenVentas,
        setLoader
    }
}