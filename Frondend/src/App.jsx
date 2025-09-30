import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage2 from "./Pages/HomePage2";
import JobDetailsPage from "./Pages/JobDetailsPage";
import WhilishList from "./Pages/whishlistdata/WhilishList";
import Profilemy from "./Pages/Myprofile/profilemy";
import Login from "./Components/Login/Login";
import SuccessFully from "./Components/Banner/SuccessFully";
import ErrorPage from "./Pages/ErrorPage";
import React, { useEffect } from "react";
import { getAuthData } from "./utils/auth";
import UpdateData from "./Pages/update/UpdateData";
const AddResumePage = React.lazy(() => import("./Pages/AddResumePage"));
function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  const auth = getAuthData();
  const logged = auth?.mobileNo;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/jobDetailsPage/:id" element={<JobDetailsPage />} />
        <Route
          path="/wishlist"
          element={logged ? <WhilishList /> : <Navigate to="/Login" />}
        />
        <Route
          path="/myprofile"
          element={logged ? <Profilemy /> : <Navigate to="/Login" />}
        />
        <Route
          path="/editprofile"
          element={logged ? <UpdateData /> : <Navigate to="/Login" />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Success" element={<SuccessFully />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
