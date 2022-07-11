import SignIn from "./components/SignIn";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";



function App() {
  const [session, setSession] = useState((Cookies.get('my-session') ? true : false) || null);
  const [userData, setUserData] = useState(null);


  const setUserCookie = (userData) => {
    Cookies.set('user-session', JSON.stringify(userData), { expires: 0.5, path: '' })
    setUserData(userData);
  }

  useEffect(() => {
    var userCookie = Cookies.get('user-session') || null;
    if (userCookie != null) setUserData(JSON.parse(userCookie));

    if (session == null && userCookie != null) {
      Cookies.remove('user-session');
      setUserData(null);
    }

    if (session && userCookie == null) {
      Cookies.remove('my-session');
      setSession(null);
    }
  }, [])

  const showLoginOrDashboard = () => {
    if (session == null && userData == null)
      return (<SignIn setSession={setSession} setUserCookie={setUserCookie} />);
    if (session != null && userData != null)
      if (userData.roles.includes("Admin") || userData.roles.includes("User"))
        return (<Dashboard userData={userData} setSession={setSession} setUserData={setUserData} />);
  }

  return (
    <div className="App">
      {showLoginOrDashboard()}
    </div>
  );
}

export default App;
