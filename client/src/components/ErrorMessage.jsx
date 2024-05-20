import React from 'react'

function ErrorMessage(props) {
    const { value, className } = props
    return (
        <>
            <div className={`text-red-500 text-nowrap text-[0.75rem] text-start ${className}`}>{value}</div>
        </>
    )
}

export default ErrorMessage