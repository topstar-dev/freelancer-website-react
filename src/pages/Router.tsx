import React, { useEffect } from "react";
import { useRoutes, RouteObject, Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { Box } from "@mui/material";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import SignIn from "./auth/signin/SignIn";
import Info from "./auth/signup/Info";
import Password from "./auth/signup/Password";
import Email from "./auth/signup/Email";
import Code from "./auth/signup/Code";
import ResetPassword from "./auth/resetPassword/ResetPassword";

import Settings from "./settings/Settings";
import Personal from "./settings/personalInfo/Personal";
import Security from "./settings/security/Security";
import Currency from "./settings/currency/Currency";

import HomePage from "./home/Home";
import ContactUs from "./contactUs/ContacUs";
import AboutUs from "./aboutUs/AboutUs";
import Privacy from "./policies/Privacy";
import Terms from "./policies/Terms";
import AuthGuard from "./auth/AuthGuard";
import ErrorPage from "./404/ErrorPage";
import TawkProvider from "./TawkProvider";

interface RoutesInterface {
  isHeader: boolean,
  protectedRoute: boolean
}
const CustomRouter = ({ isHeader, protectedRoute }: RoutesInterface) => {
  const isWeb = useMediaQuery({ query: '(min-width: 901px)' });

  useEffect(() => {
    document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
  })

  const content = <TawkProvider>
    {isHeader && <Header />}
    <Box style={{
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
      height: `calc(100% - ${!isHeader ? 0 : (isWeb ? 72 : 73)}px)`,
    }}>
      <Box style={{
        padding: isWeb ? '24px 16%' : '24px',
        minHeight: `calc(100% - ${useMediaQuery({ query: '(min-width: 901px)' }) ? 72 : 119}px`
      }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  </TawkProvider>

  return protectedRoute ? <AuthGuard>{content}</AuthGuard> : content;
}

export default function Router() {
  const router: RouteObject[] = [
    {
      element: <CustomRouter isHeader={false} protectedRoute={false} />,
      children: [
        {
          path: "/sign-in",
          element: <SignIn />
        },
        {
          path: "/sign-up",
          children: [
            {
              path: "/sign-up",
              element: <Info />,
            },
            {
              path: "/sign-up/set-password",
              element: <Password />,
            },
            {
              path: "/sign-up/email",
              element: <Email />,
            },
            {
              path: "/sign-up/code",
              element: <Code />,
            },
          ]
        },
        {
          path: "/reset-password",
          element: <ResetPassword />
        }
      ],
    },
    {
      path: "/",
      element: <CustomRouter isHeader={true} protectedRoute={false} />,
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
          element: <Privacy />
        },
        {
          path: "terms",
          element: <Terms />,
        }
      ],
    },
    {
      path: "/settings",
      element: <CustomRouter isHeader={true} protectedRoute={true} />,
      children: [
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
        }
      ]
    },
    {
      path: "*",
      element: <CustomRouter isHeader={true} protectedRoute={false} />,
      children: [
        {
          path: "*",
          element: <ErrorPage />
        }
      ]
    }
  ];

  return useRoutes(router);
}
