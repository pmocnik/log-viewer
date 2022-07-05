import SignIn from "./components/SignIn";

import Cookies from 'js-cookie'

const sid = Cookies.get('my-session') || '';

console.log(sid);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignIn/>
      </header>
    </div>
  );
}

export default App;
