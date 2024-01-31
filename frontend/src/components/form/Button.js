import React, { forwardRef } from 'react'


const Button = forwardRef(function({
    children,
    className = "",
    type = "button",
    ...props
}, ref) {
    return (
        <button className={`${className}`} {...props} ref={ref}>{children}</button>
    )
})

export default Button;
