
export const eventTracker = (category: string, action: string, label?: string) => {
    const windowObj: any = window;
    windowObj.gtag("event", "event", {
        category,
        action,
        label
    });
}

export const pageView = (path: string) => {
    const windowObj: any = window;
    windowObj.gtag("event", "page_view", {
        page_path: path,
    });
}