import { useState, useEffect } from "react";
import { ChatMessage, User, JoinRequest } from "../chatService/chat_pb";
import { ChatServiceClient } from "../chatService/chat_pb_service";
import { getLoggedInUser } from '../services/user.service';
import { ChatInput } from "./chatInput.component";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./message.component";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Role from "../dtos/role.dto";


const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "800px",
      maxHeight: "800px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

function HelpChat() {
  const [messages, setMessages] = useState([{ from: "Admin", msg: "Welcome to ECOGreen Chat! Please wait for an agent to join your chat." , time: ""}]);
  const [waiting, setWaiting] = useState(true);

  const client = new ChatServiceClient("http://grpcproxy.duckdns.net:8081");
  //const client = new ChatServiceClient("http://localhost:8081");
  const loggedInUser = getLoggedInUser();
  const user = new User();
  ////////TODO: UNCOMMENT THIS FOR PRODUCTION
  user.setId(new String(loggedInUser.id).toString());
  user.setRole(loggedInUser.role);
  user.setRoom(-1);

  useEffect(() => {
    // Subscribe to the stream of incoming messages
    const joinRequest = new JoinRequest();
    joinRequest.setId(user.getId());
    joinRequest.setRole(user.getRole());

    const receiveMessageStream = client.subscribeToMessages(joinRequest);
    console.log("Subbed to receiveMessageStream");
    receiveMessageStream.on('end',()=> {console.log("Ended chat stream");});
    receiveMessageStream.on('status',(status)=> {console.log("Chat stream status: " + status);});
    receiveMessageStream.on("data", (message: ChatMessage) => {
      //First message gives us the room, and indicates that we are connected to the room
      if (waiting) {
        setWaiting(false);
        user.setRoom(message.getUser()?.getRoom() || -1);
      }
      console.log(message);
      // Add the new message to the list of messages
      setMessages(messages => [
        ...messages,
        {
          from: message.getUser()?.getRole() || "Unknown",
          msg: message.getMsg(),
          time: message.getTime()
        },
      ]);
    });
  },[]);

  const handleSendMessage = (message: string) => {
    // Create a new ChatMessage and send it to the server
    const chatMessage = new ChatMessage();
    chatMessage.setUser(user);
    chatMessage.setMsg(message);
    chatMessage.setTime(new Date().toISOString());

    client.sendMessage(chatMessage, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  const classes = useStyles();

  return (
    <div>
      <div>
        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Paper id="style-1" className={classes.messagesBody}>
              {messages.map((message, index) => {
                if (message.from === "Admin") {
                  return <MessageLeft
                    message={message.msg}
                    timestamp={''}
                    photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                    displayName="Admin"
                    avatarDisp={true}
                  />
                } else {
                  return <MessageRight
                    message={message.msg}
                    timestamp=""
                    photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                    displayName={message.from}
                    avatarDisp={true}
                  />
                }
              })}
            </Paper>
            {waiting ?
              <div>Please wait for an {user.getRole() == "User"?"admin":'user'} to join.</div>
              :
              <ChatInput onSubmit={handleSendMessage} />}
          </Paper>
        </div>
      </div>
    </div>
  );
}


export default HelpChat;
