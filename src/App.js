import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import { createContext, useCallback, useEffect, useState } from "react";
import AddPost from "./components/AddPost/AddPost";
import AllPost from "./components/AllPost/AllPost";
import MyAllPost from "./components/MyPosts/MyPosts";
import EditPost from "./components/EditPost/EditPost";
import HomeWrapper from './pages/HomeWrapper';


export const userContext = createContext();



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const changeUser = useCallback((newUser) => {
    setCurrentUser(newUser);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/signin");
    }
  }, [currentUser]);

  return (
    <div className="App">
      <userContext.Provider value={currentUser}>
          <Routes>
              <Route path="/" element={<HomeWrapper />}>
                  <Route index element={<AllPost />} />
                  <Route path="createpost" element={<AddPost />} />
                  <Route path="myposts">
                    <Route index element={<MyAllPost />} />
                    <Route path="edit/:id" element={<EditPost />} />
                  </Route>
              </Route>
              <Route path="/auth">
                  <Route path="signin" element={<SignIn {...{ changeUser }} />} />
                  <Route path="signup" element={<SignUp />} />
              </Route>
              <Route path="*" element={<h1>404 Error</h1>} />
          </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
