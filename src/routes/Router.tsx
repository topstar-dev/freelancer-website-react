import React, { useEffect } from "react";
import { useRoutes, Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { Box } from "@mui/material";

//layout
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";

//auth
import SignIn from "../pages/auth/signin/SignIn";
import Info from "../pages/auth/signup/Info";
import Password from "../pages/auth/signup/Password";
import Email from "../pages/auth/signup/Email";
import Code from "../pages/auth/signup/Code";
import EnterEmail from "../pages/auth/resetPassword/Email";
import VerifyCode from "../pages/auth/resetPassword/Code";
import SetNewPassword from "../pages/auth/resetPassword/Password";

import HomePage from "../pages/home/Home";
import ContactUs from "../pages/contactUs/ContacUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import Privacy from "../pages/policies/Privacy";
import Terms from "../pages/policies/Terms";
import AuthGuard from "../pages/auth/AuthGuard";
import NotFound from "../pages/error/NotFound";
import TawkProvider from "../components/TawkProvider";

// apply-freelancer
import Skills from "../pages/applyFreelancer/Skills";
import NamePhoto from "../pages/applyFreelancer/NamePhoto";
import Experience from "../pages/applyFreelancer/Experience";
import Education from "../pages/applyFreelancer/Education";
import Languages from "../pages/applyFreelancer/Languages";
import AboutMe from "../pages/applyFreelancer/AboutMe";

//settings
import Settings from "../pages/settings/Settings";
import Personal from "../pages/settings/Personal";
import Security from "../pages/settings/Security";
import Currency from "../pages/settings/Currency";

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
            path: `${baseUrl}/settings/personal`,
            element: <Settings><Personal /></Settings>,
          },
          {
            path: `${baseUrl}/settings/security`,
            element: <Settings><Security /></Settings>,
          },
          {
            path: `${baseUrl}/settings/currency`,
            element: <Settings><Currency /></Settings>,
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


export const useRounxNavigate = () => {
  const navigate = useNavigate();

  return (url: string, options: any = {}) => {
    const lang = `${localStorage.getItem('i18nextLng')}`;
    const baseUrl = lang === 'en' ? '/' : `/${lang}`;

    if (!url || url === '/') {
      navigate(`${baseUrl}`);
    } else {
      if (baseUrl === '/') {
        navigate(`${baseUrl}${url.startsWith('/') ? url.slice(1) : url}`, options);
      } else {
        navigate(`${baseUrl}${url}`, options);
      }
    }
  }
}
