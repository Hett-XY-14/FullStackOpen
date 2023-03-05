import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef( (props, refs) => {
    const [visible, setVisible] = useState(false)
    const shownWhenVisibleIsTrue = { display : visible ? '' : 'none' }
    const hiddenWhenVisibleIsTrue = { display : visible ? 'none' : '' }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    }
    )

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={ hiddenWhenVisibleIsTrue }>
                <button onClick={ toggleVisibility }>{ props.buttonLabel }</button>
            </div>
            <div style={ shownWhenVisibleIsTrue }>
                { props.children }
                <button onClick={ toggleVisibility }>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable