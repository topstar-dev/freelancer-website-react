import React from "react";
import { useRoutes, RouteObject, Outlet } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./signUp/SignUp";
import EmailVerification from "./EmailVerification";
import ClientProfile from './profile/ClientProfile';
import FreelancerProfile from "./profile/Freelancerprofile";
import HomePage from "./homepage/HomePage";
import PrivacyPolicy from "./homepage/PrivacyPolicy";
import TermsOfService from "./homepage/TermsOfService";
import ContactUs from "./homepage/ContacUs";
import AboutUs from "./homepage/AboutUs";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Settings from "./settings";
import Personal from "../components/settings/Personal";
import Security from "../components/settings/Security";
import Currency from "../components/settings/Currency";
import Submit from "./freelancer/Submit";
import HOC from "../components/HOC";
import ResetPassword from "./resetPassword/ResetPassword";
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
