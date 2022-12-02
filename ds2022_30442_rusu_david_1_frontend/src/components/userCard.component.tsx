import { Paper } from "@mui/material";
import User from "../dtos/user.dto";

interface Props {
    user: User,
    setSelectedUser: React.Dispatch<React.SetStateAction<User>>,
}


const UserCard = (props: Props) => {

    const selectedCard = () => {
        props.setSelectedUser(props.user);
    }
    
    return(
        <div style={{ paddingRight:"15px"}} onClick={selectedCard}>
            <Paper elevation={4} >
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"200px", width:"200px"}}>
                    <h1>{props.user.email}</h1>
                    <h2>{props.user.id}</h2>
                    <h3>{props.user.role}</h3>
                </div>
            </Paper>
        </div>
    );
}

export default UserCard;