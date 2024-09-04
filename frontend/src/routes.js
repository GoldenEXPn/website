import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";


import Home from "./pages/out/home/index";
import News from "./pages/out/news/News"
import Auth from "./pages/auth/Auth";
import FadeWrapper from "./components/wrappers/FadeWrapper";
import LandingLayout from "./Layout/out layout/LandingLayout";
import AppLayout from "./Layout/in layout/AppLayout";

export const AppRouter = () => {
  // const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "",
          element: (
            <FadeWrapper>
              <Home />
            </FadeWrapper>
          ),
          index: true,
        },
        {
          path: "news",
          element: (
            <FadeWrapper>
              <News />
            </FadeWrapper>
          ),
        },
      ],
    },
    {
        path: "/auth",
        element: <Auth/>
    },
    {
      path: "/app",
      element: <AppLayout />,

      // this should match the drawer content
      children: [
        {
          path: "home",
          element: <FadeWrapper>{/* <DashBoard /> */}</FadeWrapper>,
          index: true,
        },
        {
          path: "setting",
          element: (
            <FadeWrapper>
              {/* TODO: change this to settings */}
              <News />
            </FadeWrapper>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

