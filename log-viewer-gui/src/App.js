import SignIn from "./components/SignIn";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import jwt_decode from "jwt-decode";

function DecodeSessionAndJWT(session) {
  if (session == null) return null;
  var decodedHeaderSession = jwt_decode(session, { header: true });
  var decodedJwt = jwt_decode(decodedHeaderSession.token);
  return decodedJwt;
}

function App() {
  const [session, setSession] = useState(DecodeSessionAndJWT(Cookies.get('my-session') || null));

  const showLoginOrDashboard = () => {
    if (session == null)
      return (<SignIn setSession={setSession} />);
    if (session != null)
      if (session.roles.includes("Admin") || session.roles.includes("User"))
        return (<Dashboard userData={session} setSession={setSession} />);
  }

  return (
    <div className="App">
      {showLoginOrDashboard()}
    </div>
  );
}

export default App;
