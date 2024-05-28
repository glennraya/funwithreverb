import { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500' +
                className
            }
            ref={input}
        />
    )
})
