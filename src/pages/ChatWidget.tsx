import * as React from 'react';
const TawkMessengerReact = require('@tawk.to/tawk-messenger-react');

const ChatWidget = ({ isHeader }: any) => {
    const tawkMessengerRef = React.useRef<any | null>(null);

    React.useEffect(() => {
        try {
            if (tawkMessengerRef.current) {
                if (!isHeader) {
                    tawkMessengerRef.current?.hideWidget();
                } else {
                    tawkMessengerRef.current?.showWidget();
                }
            }
        } catch (err) { }
    }, [isHeader, tawkMessengerRef])

    return (
        <TawkMessengerReact
            propertyId="60d7fbc17f4b000ac039bd84"
            widgetId="1ggn2lnfe"
            ref={tawkMessengerRef}
            customStyle={{
                visibility: {
                    desktop: {
                        xOffset: '34',
                        position: 'br'
                    }
                }
            }}
            onLoad={() => {
                if (tawkMessengerRef.current) {
                    if (isHeader) {
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
                    }, 200);
                }
            }}
        />
    )
}

export default ChatWidget;