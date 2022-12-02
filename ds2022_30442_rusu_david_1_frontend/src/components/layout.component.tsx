import DeviceConsumptionPopUp from "./deviceConsumptionPopUp.component";
import NavBar from "./navbar.component";

const Layout = (props: any) => {
    return (
        <div >
            <DeviceConsumptionPopUp/>
            <NavBar/>
            <div style={{display:"flex",  height:"80vh", alignItems:"center", flexDirection:"column"}}>
                {props.children}
            </div>
        </div>


    );
}

export default Layout;