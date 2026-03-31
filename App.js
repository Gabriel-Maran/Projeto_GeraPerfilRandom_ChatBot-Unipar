import { useState } from "react";
import { ChatBot } from "./pages/ChatBot";
import { RandomUser } from "./pages/RandomUser";

export default function App() {
  const [isChatBot, setIsChatBot] = useState(true);
  if (isChatBot) {
    return <ChatBot />;
  }
  return <RandomUser />;
}
