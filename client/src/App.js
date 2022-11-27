import { Route, Router, Routes } from "react-router-dom";
import AdminNavigation from "./Admin/components/AdminNavigation";
import SideBar from "./Admin/components/SideBar";
import AdminPanel from "./Admin/Page/AdminPanel";
import Completed from "./Admin/Page/Completed";
import Deactivated from "./Admin/Page/Deactivated";
import OnGoing from "./Admin/Page/OnGoing";
import RegisterProduct from "./Admin/Page/RegisterProduct";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

        <Route
          path="/admin"
          element={
            <AdminPanel>
              <p>Welcome to admin</p>
            </AdminPanel>
          }
        ></Route>

        <Route
          path="/admin/ongoing"
          element={
            <AdminPanel>
              <OnGoing />
            </AdminPanel>
          }
        ></Route>

        <Route
          path="/admin/deactivated"
          element={
            <AdminPanel>
              <Deactivated />
            </AdminPanel>
          }
        ></Route>

        <Route
          path="/admin/completed"
          element={
            <AdminPanel>
              <Completed />
            </AdminPanel>
          }
        ></Route>

        <Route
          path="/admin/register"
          element={
            <AdminPanel>
              <RegisterProduct />
            </AdminPanel>
          }
        ></Route>

        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
