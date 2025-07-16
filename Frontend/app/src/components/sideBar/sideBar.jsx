import { Sidebar } from "primereact/sidebar";
import { } from '@primer/octicons-react'

export function SideBar({ visible, setVisible, children, position = "left", isVentas=false }) {
    return (
        <div>
            <Sidebar style={{width: isVentas ? '30%' : ''}} position={position} visible={visible} onHide={() => setVisible(false)}>
                {
                    children
                }
            </Sidebar>
        </div>
    )
}