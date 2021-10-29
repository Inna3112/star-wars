import React from 'react'
import {PeopleType} from '../../../dal/api'
import style from './People.module.css'

type PropsType = {
    people: PeopleType | undefined
    onCloseClickHandler: () => void
}
export const People: React.FC<PropsType> = React.memo(({people, onCloseClickHandler}) => {
    return (
        <div className={style.peopleBlock}>
            <span className={style.closeSpan} onClick={onCloseClickHandler}>x</span>
            <ul className={style.peoplesList}>
                <li>name: <b>{people?.name}</b></li>
                <li>height: <b>{people?.height}</b></li>
                <li>mass: <b>{people?.mass}</b></li>
                <li>hair-color: <b>{people?.hair_color}</b></li>
                <li>skin-color: <b>{people?.skin_color}</b></li>
                <li>eye-color: <b>{people?.eye_color}</b></li>
                <li>birth-year: <b>{people?.birth_year}</b></li>
                <li>gender: <b>{people?.gender}</b></li>
            </ul>
        </div>
    )
})