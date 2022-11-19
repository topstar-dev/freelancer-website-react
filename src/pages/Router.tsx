import React, { useEffect, useState } from "react";
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
import EnterEmail from "./auth/resetPassword/Email";
import VerifyCode from "./auth/resetPassword/Code";
import SetNewPassword from "./auth/resetPassword/Password";

import HomePage from "./home/Home";
import ContactUs from "./contactUs/ContacUs";
import AboutUs from "./aboutUs/AboutUs";
import Privacy from "./policies/Privacy";
import Terms from "./policies/Terms";
import AuthGuard from "./auth/AuthGuard";
import ErrorPage from "./404/ErrorPage";
import TawkProvider from "../components/TawkProvider";

import Skills from "./applyFreelancer/Skills";
import NamePhoto from "./applyFreelancer/NamePhoto";
import Experience from "./applyFreelancer/Experience";
import Education from "./applyFreelancer/Education";
import Languages from "./applyFreelancer/Languages";
import AboutMe from "./applyFreelancer/AboutMe";

import { refreshToken, setTokens } from "../redux/account/accountApi";
import { updateUserInfo } from "../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOutUser } from "../redux/auth/authActions";

interface RoutesInterface {
  isHeader: boolean,
  protectedRoute: boolean
}
const CustomRouter = ({ isHeader, protectedRoute }: RoutesInterface) => {
  const isWeb = useMediaQuery({ query: '(min-width: 901px)' });

  const [called, setCalled] = useState(false);

  const dispatch = useAppDispatch();
  const { userInfo, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
  })

  useEffect(() => {
    if (isHeader && userInfo && !called && !message) {
      setCalled(true);
      refreshToken().then((res: any) => {
        setTokens(res);
        dispatch(updateUserInfo(res))
      }).catch((err: any) => {
        dispatch(signOutUser());
      })
    }
  }, [isHeader, userInfo, called, message, dispatch])

  const content = <>
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
      <TawkProvider isHeader={isHeader} />
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
          children: [
            {
              path: "/reset-password",
              element: <EnterEmail />,
            },
            {
              path: "/reset-password/code",
              element: <VerifyCode />,
            },
            {
              path: "/reset-password/set-password",
              element: <SetNewPassword />,
            }
          ]
        }
      ],
    },
    {
      path: "/",
      element: <CustomRouter isHeader={true} protectedRoute={false} />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "privacy",
          element: <Privacy />,
        },
        {
          path: "terms",
          element: <Terms />,
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
      path: "/apply-freelancer",
      element: <CustomRouter isHeader={true} protectedRoute={true} />,
      children: [
        {
          path: "/apply-freelancer",
          element: <Skills />
        },
        {
          path: "/apply-freelancer/info",
          element: <NamePhoto />
        },
        {
          path: "/apply-freelancer/experience",
          element: <Experience />
        },
        {
          path: "/apply-freelancer/education",
          element: <Education />
        },
        {
          path: "/apply-freelancer/languages",
          element: <Languages />
        },
        {
          path: "/apply-freelancer/about-me",
          element: <AboutMe />
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
