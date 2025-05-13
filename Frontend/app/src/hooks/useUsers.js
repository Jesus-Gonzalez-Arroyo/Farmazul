import { useRef, useState } from "react"
import { consumServices } from "../contexts/execute"
import { NewUser, NewUserUpdate } from "../models"
import { keys } from "../utils"

export const UseUsers = () => {
    const [users, setUsers] = useState([])
    const [resumeVentas, setResumenVentas] = useState([])
    const [loader, setLoader] = useState(true)
    const [rol, setRol] = useState("")
    const [open, setOpen] = useState(false)
    const [dataNewUser, setDataNewUser] = useState(new NewUser())
    const [dataUpdateUser, setDataUpdateUser] = useState(new NewUserUpdate({}))
    const [productID, setProductID] = useState({})
    const roles = ["Admin", "Usuario"]
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

        setUsers((prev) => [...prev, registerUser.info[0]])
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
    }

    const deleteUser = async () => {

        const res = await consumServices(keys.deleteUser, 'DELETE', '', productID)

        if (res.error) return console.error(res)

        console.log(res)

        setUsers((prev) => prev.filter((user) => user._id !== res.info._id))
    }

    async function getUsers() {
        const res = await consumServices(keys.getUsers, 'GET')
        const resVentas = await consumServices(keys.getVentas, 'GET')

        if (res.error || resVentas.error) return console.error(res.error ? res : resVentas)

        setUsers(res.info)
        setResumenVentas(resVentas.info)
        setTimeout(() => {
            setLoader(false)
        }, 500);
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
        handleSelect,
        handleChangeNewUser,
        handleChangeUpdateUser,
        updateInfoUser,
        deleteUser,
        registerUser,
        getIdUser,
        getInfoUserUpdate,
        getUsers,
        setOpen
    }
}