import "./App.css";
import Forget from "./components/mainContents/Forget.tsx";
import Login from "./components/mainContents/Login.tsx";
import SignUp from "./components/mainContents/SignUp.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./components/page/Home.tsx";

function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/forget" element={<Forget/>}></Route>
      </Routes>

    </>
  );
}

export default App;
