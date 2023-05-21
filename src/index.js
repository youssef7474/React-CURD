import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";
import RootLayOut from "./pages/RootLayOut";
import IndexFirst from "./pages/IndexFirst.jsx";

//import ErrorPage from "./pages/ErrorPage.jsx";
import WithGurd from "./components/WithGurd";
import AuthPage from "./pages/AuthPage";


const AddPage = React.lazy(() => import("./pages/AddPage.jsx"));
const EditPage = React.lazy(() => import("./pages/EditPage.jsx"));
const Details = React.lazy(() => import("./pages/Details.jsx"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage.jsx"));


const postParamHandler= ({params})=>{
  if(isNaN(params.id))
  {
    throw new Response("bad request",{statusText:"please insert valied id" ,status:400})
  }
}

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<RootLayOut></RootLayOut>,
      errorElement:<ErrorPage></ErrorPage>,
      children:
      [
        {
          index:true,element:
          <IndexFirst></IndexFirst>
        }
        ,
        {
          path:'post',element:<IndexFirst></IndexFirst>
        }
        ,
        {
          path:'/loginPage',element:<AuthPage></AuthPage>
        }
        ,
        {
          path:'post/add',
          element:
          <Suspense fallback="loading please wait">
            <WithGurd>
              <AddPage></AddPage>
            </WithGurd>
          </Suspense>
         
        }
        ,
        {
          path:'post/:id/edit',element:
          <Suspense fallback="loading please wait">
            <WithGurd>
              <EditPage></EditPage>
            </WithGurd>
          </Suspense>
           
          ,
          loader:postParamHandler
        }
        ,
        {
          path:'post/:id',element:
          
         <Suspense fallback="loading please wait">
          <WithGurd>
            <Details></Details>
          </WithGurd>
       </Suspense>
          ,
          loader:postParamHandler
        }

      ]
    }
  ]
)



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);
