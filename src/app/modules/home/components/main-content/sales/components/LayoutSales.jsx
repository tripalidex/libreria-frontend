import { Outlet } from "react-router-dom"
import HeaderSales from "./HeaderSales"
import CartTab from "./CartTab"

function LayoutSales() {
    return (
        <div>
            {/*Main*/}
            <div className="max-w-full m-auto p-5">
                <HeaderSales/>
                <Outlet />
            </div>
            <CartTab />
        </div>
        
    )
}

export default LayoutSales