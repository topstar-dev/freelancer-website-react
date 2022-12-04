import React, { useEffect } from "react";
import { useRoutes, Outlet, Navigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { Box } from "@mui/material";

//layout
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";

//auth
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
import NotFound from "./error/NotFound";
import TawkProvider from "../components/TawkProvider";

// apply-freelancer
import Skills from "./applyFreelancer/Skills";
import NamePhoto from "./applyFreelancer/NamePhoto";
import Experience from "./applyFreelancer/Experience";
import Education from "./applyFreelancer/Education";
import Languages from "./applyFreelancer/Languages";
import AboutMe from "./applyFreelancer/AboutMe";

//settings
import Settings from "./settings/Settings";
import Personal from "./settings/Personal";
import Security from "./settings/Security";
import Currency from "./settings/Currency";

interface RoutesInterface {
  isHeader: boolean,
  protectedRoute: boolean
}
const CustomRouter = ({ isHeader, protectedRoute }: RoutesInterface) => {
  const isWeb = useMediaQuery({ query: '(min-width: 1001px)' });

  useEffect(() => {
    document.documentElement.lang = localStorage.getItem('i18nextLng') || 'en';
  })

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
        minHeight: `calc(100% - ${useMediaQuery({ query: '(min-width: 1001px)' }) ? 72 : 119}px`
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
  const routesWithBaseUrl = (baseUrl: string) => {
    return [
      {
        element: <CustomRouter isHeader={false} protectedRoute={false} />,
        children: [
          {
            path: `${baseUrl}/sign-in`,
            element: <SignIn />
          },
          {
            path: `${baseUrl}/sign-up`,
            element: <Info />,
          },
          {
            path: `${baseUrl}/sign-up/set-password`,
            element: <Password />,
          },
          {
            path: `${baseUrl}/sign-up/email`,
            element: <Email />,
          },
          {
            path: `${baseUrl}/sign-up/code`,
            element: <Code />,
          },
          {
            path: `${baseUrl}/reset-password`,
            element: <EnterEmail />,
          },
          {
            path: `${baseUrl}/reset-password/code`,
            element: <VerifyCode />,
          },
          {
            path: `${baseUrl}/reset-password/set-password`,
            element: <SetNewPassword />,
          },
        ],
      },
      {
        element: <CustomRouter isHeader={true} protectedRoute={false} />,
        children: [
          {
            path: `${baseUrl}`,
            element: <HomePage />,
          },
          {
            path: `${baseUrl}/privacy`,
            element: <Privacy />,
          },
          {
            path: `${baseUrl}/terms`,
            element: <Terms />,
          },
          {
            path: `${baseUrl}/contact`,
            element: <ContactUs />,
          },
          {
            path: `${baseUrl}/about`,
            element: <AboutUs />
          }
        ],
      },
      {
        element: <CustomRouter isHeader={true} protectedRoute={true} />,
        children: [
          {
            path: `${baseUrl}/apply-freelancer`,
            element: <Skills />
          },
          {
            path: `${baseUrl}/apply-freelancer/info`,
            element: <NamePhoto />
          },
          {
            path: `${baseUrl}/apply-freelancer/experience`,
            element: <Experience />
          },
          {
            path: `${baseUrl}/apply-freelancer/education`,
            element: <Education />
          },
          {
            path: `${baseUrl}/apply-freelancer/languages`,
            element: <Languages />
          },
          {
            path: `${baseUrl}/apply-freelancer/about-me`,
            element: <AboutMe />
          }
        ]
      },
      {
        element: <CustomRouter isHeader={true} protectedRoute={true} />,
        children: [
          {
            path: `${baseUrl}/settings`,
            element: <Settings />,
            children: [
              {
                path: ``,
                element: <Navigate to={`${baseUrl}/settings/personal`} />,
              },
              {
                path: `${baseUrl}/settings/personal`,
                element: <Personal />,
              },
              {
                path: `${baseUrl}/settings/security`,
                element: <Security />,
              },
              {
                path: `${baseUrl}/settings/currency`,
                element: <Currency />,
              }
            ]
          }
        ]
      }
    ];
  }

  return useRoutes([
    ...routesWithBaseUrl('zh-CN'),
    ...routesWithBaseUrl(''),
    {
      path: "*",
      element: <CustomRouter isHeader={true} protectedRoute={false} />,
      children: [
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ])

}

export const getBaseUrl = () => {
  const lang = `${localStorage.getItem('i18nextLng')}`;
  return lang === 'en' ? '' : lang;
}
