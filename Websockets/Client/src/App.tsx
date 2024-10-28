import React, { useEffect } from "react";

const App = () => {
  const [ws, setWS] = React.useState<null | WebSocket>(null);
  const [data, setData] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | "">("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:9000");

    socket.onopen = () => {
      console.log("Connected to server");
      setWS(socket);
    };

    socket.onmessage = (message) => {
      console.log("Received message: ", message.data);
      setData((prev) => [...prev, message.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!ws) {
    return <h1>Connecting...</h1>;
  }

  return (
    <div>
      <h1>Websocket client</h1>
      <div>
        {data?.map((chatMessage, index) => {
          return <p key={index}>{chatMessage}</p>;
        })}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => ws.send(message)}>chat</button>
    </div>
  );
};

export default App;
