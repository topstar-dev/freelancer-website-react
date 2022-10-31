import * as React from 'react';
import { useLocation } from 'react-router-dom';
const TawkMessengerReact = require('@tawk.to/tawk-messenger-react');
const TawkContext = React.createContext<any>(null);

const TawkProvider = (props: any) => {
    const tawkMessengerRef = React.useRef<any>();

    const location = useLocation();
    React.useEffect(() => {
        tawkMessengerRef.current.hideWidget()
    }, [location])

    return (
        <TawkContext.Provider value={tawkMessengerRef}>
            {props.children}
            <TawkMessengerReact
                propertyId="60d7fbc17f4b000ac039bd84"
                widgetId="1ggn2lnfe"
                ref={tawkMessengerRef}
            />
        </TawkContext.Provider>
    )
}

const useTawkRef = () => {
    const ref = React.useContext(TawkContext);
    return ref.current ? ref.current : {};
}

export default TawkProvider;
export { useTawkRef };