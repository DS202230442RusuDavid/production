import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        margin: theme.spacing(1),
    },
  })
);

interface Props {
    onSubmit: (text: string) => void;
}

export const ChatInput = (props: Props) => {
    const [value, setValue] = useState("");
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Type your message here"
                className={classes.wrapText}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={()=>{
                props.onSubmit(value);
                setValue("");
            }} variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



