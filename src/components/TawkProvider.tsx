import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
const TawkMessengerReact = require('@tawk.to/tawk-messenger-react');

export const positionChatWidget = (isTabOrMobile: boolean) => {
    try {
        const chatWidgetVisible = document.querySelector('.widget-visible')
        if (chatWidgetVisible) {
            const ifr = chatWidgetVisible.querySelector('iframe');
            if (ifr) {
                ifr.style.bottom = isTabOrMobile ? '143px' : '86px';
            }
        }
    } catch (err) { }
}

const TawkProvider = ({ isHeader }: any) => {
    const isTabOrMobile = useMediaQuery({ query: '(max-width: 1000.99px)' });
    const tawkMessengerRef = React.useRef<any | null>(null);
    const location = useLocation();

    React.useEffect(() => {
        try {
            if (tawkMessengerRef.current) {
                if (isHeader && ['/contact', '/zh-CN/contact'].includes(location.pathname)) {
                    tawkMessengerRef.current.showWidget();
                } else {
                    tawkMessengerRef.current.hideWidget();
                }
            }
        } catch (err) { }
    }, [location.pathname, isHeader, tawkMessengerRef])

    React.useEffect(() => {
        try {
            if (tawkMessengerRef.current) {
                positionChatWidget(isTabOrMobile)
            }
        } catch (err) { }
    }, [isTabOrMobile, tawkMessengerRef])

    return (
        <TawkMessengerReact
            propertyId="60d7fbc17f4b000ac039bd84"
            widgetId="1ggn2lnfe"
            ref={tawkMessengerRef}
            customStyle={{
                visibility: {
                    desktop: {
                        xOffset: '24',
                        yOffset: isTabOrMobile ? '143' : '86',
                        position: 'br'
                    }
                }
            }}
            onLoad={() => {
                if (tawkMessengerRef.current) {
                    if (isHeader && ['/contact', '/zh-CN/contact'].includes(location.pathname)) {
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