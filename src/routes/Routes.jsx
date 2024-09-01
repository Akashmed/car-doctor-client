import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Checkout from "../pages/checkout/Checkout";
import Booking from "../pages/booking/Booking";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Signup></Signup>
        },
        {
          path:'/checkout/:id',
          element:<PrivateRoute><Checkout></Checkout></PrivateRoute>,
          loader:({params}) => fetch(`https://car-doctor-server-blond-seven.vercel.app/services/${params.id}`)
        },
        {
          path:'/booking',
          element:<PrivateRoute><Booking></Booking></PrivateRoute>
        }
      ]
    },
  ]);

  export default router;