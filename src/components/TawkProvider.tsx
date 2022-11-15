import * as React from 'react';
import { useLocation } from 'react-router-dom';
const TawkMessengerReact = require('@tawk.to/tawk-messenger-react');

const TawkProvider = ({ isHeader }: any) => {
    const tawkMessengerRef = React.useRef<any | null>(null);
    const location = useLocation();

    React.useEffect(() => {
        try {
            if (tawkMessengerRef.current) {
                if (isHeader && location.pathname === '/contact') {
                    tawkMessengerRef.current.showWidget();
                } else {
                    tawkMessengerRef.current.hideWidget();
                }
            }
        } catch (err) { }
    }, [location.pathname, isHeader, tawkMessengerRef])

    return (
        <TawkMessengerReact
            propertyId="60d7fbc17f4b000ac039bd84"
            widgetId="1ggn2lnfe"
            ref={tawkMessengerRef}
            customStyle={{
                visibility: {
                    desktop: {
                        xOffset: '24',
                        position: 'br'
                    }
                }
            }}
            onLoad={() => {
                if (tawkMessengerRef.current) {
                    if (isHeader && location.pathname === '/contact') {
                        tawkMessengerRef.current.showWidget();
                    } else {
                        tawkMessengerRef.current.hideWidget();
                    }
                    setTimeout(() => {
                        const ifr = document.querySelector('iframe');
                        if (ifr) {
                            const divTag: any = ifr?.contentDocument?.body?.querySelector('.tawk-button');
                            if (divTag) {
                                divTag.style.height = '56px';
                                divTag.style.width = '56px';
                            }
                        }
                    }, 100);
                }
            }}
        />
    )
}

export default TawkProvider;