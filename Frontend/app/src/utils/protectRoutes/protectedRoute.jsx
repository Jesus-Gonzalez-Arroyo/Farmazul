import { Navigate, Outlet } from 'react-router'

export default function ProtectRoute ({active, redirect = '/'}) {
    if(!active) {
        return <Navigate to={redirect} replace />
    }

    return <Outlet /> 
}