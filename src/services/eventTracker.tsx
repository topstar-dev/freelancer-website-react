import ReactGA from "react-ga";

const eventTracker = (category: string, action: string, label?: string) => {
    return ReactGA.event({ category, action, label });;
}
export default eventTracker;