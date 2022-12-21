import { useMediaQuery } from "react-responsive";

const useBreakpoint = () => {
    return {
        isMobile: useMediaQuery({ query: '(max-width: 1000.99px)' }),
        isDesktop: useMediaQuery({ query: '(min-width: 1001px)' })
    }
}

export default useBreakpoint;