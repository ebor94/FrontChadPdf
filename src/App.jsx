import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    while(chats.length > 0){
      chats.pop(); 
}
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("https://lilix.ceramicaitalia.com:3000/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        "sourceId": "src_PE7O2TQYieZuuaizWQ2GG",
         "messages": chats
    }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setMessage("");
        msgs.push(data);
        console.log(data)
        let losiento = data.content.search("Lo siento,");
        if(losiento !== 0){
          console.log("chat 1")
          setChats(msgs);
          setIsTyping(false);
        }else{
          console.log("chat 2")
          await chatPact(message);  
        }
         
      })
      .catch((error) => {
        console.log(error);
      });
      
        
  };

  const chatPact = async (message) => {
    console.log("ingreso al chat pacto")

    while(chats.length > 0){
      chats.pop(); 
    }
    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);
    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);


    fetch("https://lilix.ceramicaitalia.com:3000/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        "sourceId": "src_aIxlNT4wppNZ4BShZlUHB",
         "messages": chats
    }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        msgs.push(data);
        //console.log(data)
        setChats(msgs);
         setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <main>
      <h1>ITALBOT</h1>

      <section>
        {chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role}</b>
                </span>
                <span>answer: </span>
                <span>{chat.content}</span>
              </p>
            ))
          }
          
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;