import React from "react";
import { useRoutes, RouteObject, Outlet } from "react-router-dom";
import SignIn from "./auth/signIn/SignIn";
import SignUp from "./auth/signUp/SignUp";
import EmailVerification from "./auth/emailVarification/EmailVerification";
import ClientProfile from './pages/profile/ClientProfile';
import FreelancerProfile from "./pages/profile/Freelancerprofile";
import HomePage from "./pages/homepage/HomePage";
import PrivacyPolicy from "./pages/homepage/PrivacyPolicy";
import TermsOfService from "./pages/homepage/TermsOfService";
import ContactUs from "./pages/homepage/ContacUs";
import AboutUs from "./pages/homepage/AboutUs";
import Header from "../content/layout/Header";
import Footer from "../content/layout/Footer";
import Settings from "./pages/settings";
import Personal from "./pages/settings/Personal";
import Security from "./pages/settings/Security";
import Currency from "./pages/settings/Currency";
import Submit from "./pages/freelancer/Submit";
import HOC from "./HOC";
import ResetPassword from "./auth/resetPassword/ResetPassword";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <HOC>
      {/* <AuthGuard /> */}
      <Header />
      <Box marginBottom='100px'>
        <Outlet />
      </Box>
      <Footer />
    </HOC>
  );
}
function SignLayout() {
  return (
    <HOC>
      {/* <AuthGuard /> */}
      <Outlet />
      <Footer />
    </HOC>
  );
}

export default function Router() {
  const router: RouteObject[] = [
    {
      element: <SignLayout />,
      children: [
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/verification-email",
          element: <EmailVerification />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        }
      ]
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms",
          element: <TermsOfService />,
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
        {
          path: "/users/client",
          element: <ClientProfile />
        },
        {
          path: "/users/freelancer",
          element: <FreelancerProfile />
        },
        {
          path: "/about",
          element: <AboutUs />
        },
        {
          path: "/settings",
          element: <Settings />,
          children: [
            {
              path: "personal",
              element: <Personal />,
            },
            {
              path: "security",
              element: <Security />,
            },
            {
              path: "currency",
              element: <Currency />,
            }
          ]
        },
        {
          path: "/apply-freelancer",
          element: <Submit />
        }
      ],
    },
  ];

  return useRoutes(router);
}
