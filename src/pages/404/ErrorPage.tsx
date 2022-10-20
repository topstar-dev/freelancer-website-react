import * as React from 'react';
import { Helmet } from "react-helmet";

export default function ErrorPage() {
    return (
        <>
            <Helmet>
                <title>Sign in - Rounx</title>
            </Helmet>
            <h1>404 - Page not found</h1>
        </>
    )
}