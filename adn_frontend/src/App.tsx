import "./App.css";
import Login from "./components/mainContents/Login.tsx";
import SignUp from "./components/mainContents/SignUp.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>

    </>
  );
}

export default App;
