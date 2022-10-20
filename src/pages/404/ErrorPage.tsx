import * as React from 'react';

export default function ErrorPage() {
    React.useEffect(() => {
        document.title = "Sign in - Rounx"
    })
    return (
        <>
            <h1>404 - Page not found</h1>
        </>
    )
}