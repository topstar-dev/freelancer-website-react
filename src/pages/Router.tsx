import React from "react";
import { useRoutes, RouteObject, Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { Box } from "@mui/material";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import SignIn from "./auth/signin/SignIn";
import SignUp from "./auth/register/SignUp";
import ResetPassword from "./auth/resetPassword/ResetPassword";
import Settings from "./settings/Settings";
import Personal from "./settings/personalInfo/Personal";
import Security from "./settings/security/Security";
import Currency from "./settings/currency/Currency";

import HomePage from "./home/Home";
import ContactUs from "./contactUs/ContacUs";
import AboutUs from "./aboutUs/AboutUs";
import PrivacyPolicy from "./privacy/PrivacyPolicy";
import TermsOfService from "./termsOfService/TermsOfService";

const AuthLayout = () => {
  const isWeb = useMediaQuery({ query: '(min-width: 901px)' });

  return (
    <>
      <Box style={{
        overflow: 'auto',
        height: isWeb ? 'calc(100% - 50px)' : 'calc(100% - 100px)',
      }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

const MainLayout = () => {
  const isWeb = useMediaQuery({ query: '(min-width: 901px)' });

  return (
    <>
      <Box style={{
        overflow: 'auto',
        height: isWeb ? 'calc(100% - 50px)' : 'calc(100% - 100px)',
      }}>
        <Header />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default function Router() {
  const router: RouteObject[] = [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/sign-in",
          element: <SignIn />
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />
        }
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
        {
          path: "/about",
          element: <AboutUs />
        },
        {
          path: "/privacy",
          element: <PrivacyPolicy />
        },
        {
          path: "terms",
          element: <TermsOfService />,
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
      ],
    },
  ];

  return useRoutes(router);
}
