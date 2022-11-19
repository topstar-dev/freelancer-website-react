import * as React from 'react';
import './form.css';

const Form = ({ className, children, ...rest }: any) => {
    return (
        <form className={`rounx-form ${className ? className : ''}`} {...rest}>
            {children}
        </form>
    )
}

export default Form;