import ReactGA from "react-ga4";

export const eventTracker = (category: string, action: string, label?: string) => {
    return ReactGA.event({ category, action, label });
}

export const pageView = (path: string) => {
    return ReactGA.send({ hitType: "pageview", page: path });
}