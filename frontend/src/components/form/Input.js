import React, {forwardRef, useId} from 'react'

function Input({
    label,
    className = "from-group",
    type = "text",
    ...props
}, ref) {
    
    const id = useId();
  return (
    <div>
        {label && (<label htmlFor={id}>{label}</label>)}
        <input type={type}
            className={className}
            {...props} 
            ref={ref}
            id={id}
        />
    </div>
  )
}

export default forwardRef(Input);