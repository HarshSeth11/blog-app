import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// My Components
import Home from "./components/display/Home";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import CreatePost from "./components/display/CreatePost";
import Post from "./components/display/Post";
import Logout from "./components/display/Logout";
import Layout from "./Layout";

function App() {

  return (
    <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="singup" element={<Signup />} />
              <Route path="about" element={<Signup />} />
              <Route path="createpost" element={<CreatePost />} />
              <Route path="post" element={<Post state="hello" />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
