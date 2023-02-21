import { useRoutes, useNavigate as useReactNavigate } from "react-router-dom";

//layout
import CustomRouter from "./RouteLayout";

//auth
import SignIn from "../pages/auth/signin/SignIn";
import Info from "../pages/auth/signup/Info";
import Password from "../pages/auth/signup/Password";
import Email from "../pages/auth/signup/Email";
import Code from "../pages/auth/signup/Code";
import EnterEmail from "../pages/auth/resetPassword/Email";
import VerifyCode from "../pages/auth/resetPassword/Code";
import SetNewPassword from "../pages/auth/resetPassword/Password";

//normal pages
import HomePage from "../pages/home/Home";
import ContactUs from "../pages/contactUs/ContacUs";
import AboutUs from "../pages/aboutUs/AboutUs";
// import Privacy from "../pages/policies/Privacy";
// import Terms from "../pages/policies/Terms";
import NotFound from "../pages/error/NotFound";

// apply-freelancer
import Skills from "../pages/applyFreelancer/Skills";
import NamePhoto from "../pages/applyFreelancer/NamePhoto";
import Experiences from "../pages/applyFreelancer/Experiences";
import Educations from "../pages/applyFreelancer/Educations";
import Languages from "../pages/applyFreelancer/Languages";
import AboutMe from "../pages/applyFreelancer/AboutMe";

//profile
import Profile from "../pages/profile/Profile";

//settings
import Settings from "../pages/settings/Settings";
import Personal from "../pages/settings/Personal";
import Security from "../pages/settings/Security";
import Currency from "../pages/settings/Currency";
import { languages } from "../i18n/i18nextConf";
import ApplicationStatus from "../pages/applyFreelancer/applicationStatus";
import ComingSoon from "../pages/error/ComingSoon";

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
            element: <ComingSoon />
          },
          {
            path: `${baseUrl}/terms`,
            element: <ComingSoon />
          },
          {
            path: `${baseUrl}/contact`,
            element: <ContactUs />,
          },
          {
            path: `${baseUrl}/about`,
            element: <AboutUs />
          },
          {
            path: `${baseUrl}/blog`,
            element: <ComingSoon />
          },
          {
            path: `${baseUrl}/help`,
            element: <ComingSoon />
          }
        ],
      },
      {
        element: <CustomRouter isHeader={true} protectedRoute={true} />,
        children: [
          {
            path: `${baseUrl}/apply-freelancer/skills`,
            element: <Skills />
          },
          {
            path: `${baseUrl}/apply-freelancer/status`,
            element: <ApplicationStatus />
          },
          {
            path: `${baseUrl}/apply-freelancer/name-photos`,
            element: <NamePhoto />
          },
          {
            path: `${baseUrl}/apply-freelancer/experiences`,
            element: <Experiences />
          },
          {
            path: `${baseUrl}/apply-freelancer/educations`,
            element: <Educations />
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

  let routeList: any = []
  languages.forEach(lang => {
    routeList = [...routeList, ...routesWithBaseUrl(returnLangLabel(lang))]
  })
  const profileRoutes: any = languages.map((lang) => {
    return {
      element: <CustomRouter isHeader={true} protectedRoute={false} />,
      children: [
        {
          path: `${returnLangLabel(lang)}/:username`,
          element: <Profile />
        }
      ]
    }
  })
  return useRoutes([
    ...routeList,
    ...profileRoutes,
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

export const returnUrlByLang = (pageUrl: string) => {
  return languages.map(lang => {
    const langLabel = returnLangLabel(lang) ? `/${returnLangLabel(lang)}` : '';
    const url = `${langLabel}${pageUrl}`;
    return url ? url : '/';
  })
}

export const normalizeUrl = (pageUrl: string) => {
  let newUrl = pageUrl;
  languages.forEach(lang => {
    if (pageUrl.startsWith(`/${lang}`)) {
      newUrl = pageUrl.replace(`/${lang}`, '');
    }
  })
  return newUrl;
}

export const returnLangLabel = (lang: string) => {
  return lang === 'en' ? '' : lang;
}

export const useNavigate = () => {
  const navigate = useReactNavigate();

  return (url: string, options: any = {}) => {
    const lang = `${localStorage.getItem('i18nextLng')}`;
    const baseUrl = `/${returnLangLabel(lang)}`;

    if (!url || url === '/') {
      navigate(`${baseUrl}`, options);
    } else {
      if (baseUrl === '/') {
        navigate(`${baseUrl}${url.startsWith('/') ? url.slice(1) : url}`, options);
      } else {
        navigate(`${baseUrl}${url}`, options);
      }
    }
  }
}