import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    color?: 'white' | 'blue' | 'red'
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        color, className,
        ...restProps
    }
) => {
    const finalClassName = `${color ? s[color] : s.default} ${s.default}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

