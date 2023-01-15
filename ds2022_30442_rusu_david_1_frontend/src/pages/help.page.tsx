import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/layout.component";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "../components/message.component";
import { ChatInput } from "../components/chatInput.component";
import HelpChat from "../components/helpChat.component";



const HelpPage = () => {

  return (
    <Layout>
        <HelpChat/>        
    </Layout>
  );
}

export default HelpPage;