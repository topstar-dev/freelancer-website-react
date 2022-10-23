import React from "react";
import { useRoutes, RouteObject, Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { Box } from "@mui/material";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import SignIn from "./auth/signin/SignIn";
import SignUp from "./auth/signup/SignUp";
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
import AuthGuard from "./auth/AuthGuard";
import ErrorPage from "./404/ErrorPage";

interface RoutesInterface {
  isHeader: boolean,
  protectedRoute: boolean
}
const CustomRouter = ({ isHeader, protectedRoute }: RoutesInterface) => {
  const isWeb = useMediaQuery({ query: '(min-width: 901px)' });

  const content = <>
    {isHeader && <Header />}
    <Box style={{
      overflow: 'auto',
      position: 'relative',
      minHeight: `calc(100% - ${isWeb ? 72 : 73}px)`,
    }}>
      <Box style={{ padding: isWeb ? '24px 16%' : '24px', }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  </>

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
          element: <PrivacyPolicy />
        },
        {
          path: "terms",
          element: <TermsOfService />,
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
