import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
  return (
    <div>
        {label && <label htmlFor={id}>{label}</label>}
        <select id={id} ref={ref} className={className} {...props}>
            {
                options.map((item) => (<option key={item} value={item}>{item}</option>))
            }
        </select>
    </div>
  )
}


export default forwardRef(Select);