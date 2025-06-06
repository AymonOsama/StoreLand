// src/routers/AppRouters.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/login";
import CreateAcc from "../pages/Auth/createAcc";
import ForgetPass from "../pages/Auth/forgetPass";
import ForgetPasswordCode from "../pages/Auth/forgetPasswordCode";
import ResetPassword from "../pages/Auth/resetPassword";
import Home from "../pages/home";
import About from "../pages/about";
import Products from "../pages/products";
import PrivateRoute from "../components/loginComponents/PrivateRoute";
import PrivateLayout from "../Layouts/PrivateLayout";
import Support from "../pages/support";
import SuccessStory from "../pages/SuccessStory";
import UserStrategy from "../pages/userStrategy";
import ProductPage from "../pages/productPage";
import UserProfile from "../pages/userProfile";
import CartPage from "../pages/cart";
import KnowOurTeam from "../pages/KnowOurTeam";
import DownloadAppPage from "../pages/downloadApp";
// import NotFound from "../pages/NotFound";

export default function AppRouters() {
    return (
    <BrowserRouter>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<CreateAcc />} />
            <Route path="/forgetpass" element={<ForgetPass />} />
            <Route path="/forgetpasswordcode" element={<ForgetPasswordCode />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            {/* Private Routes Layout */}
            <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contactsupport" element={<Support/>} />
                <Route path="/successstory" element={<SuccessStory/>} />
                <Route path="/userstrategy" element={<UserStrategy/>} />
                <Route path="/productpage/:id" element={<ProductPage/>} />
                <Route path="/userprofile" element={<UserProfile/>} />
                <Route path="/cartpage" element={<CartPage/>} />
                <Route path="/knowourteam" element={<KnowOurTeam/>} />
                <Route path="/downloadapp" element={<DownloadAppPage/>} />
            </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </BrowserRouter>
    );
}
