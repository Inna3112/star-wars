import React, {ChangeEvent, useState} from 'react'
import style from './Main.module.css'
import {PeopleType, starWarsAPI} from '../../dal/api'
import {People} from './People/People'
import {Pagination} from './Pagination/Pagination'
import {SuperButton} from '../common/SuperButton/SuperButton'


export const Main = () => {
    const [peoples, setPeoples] = useState<PeopleType[] | null>([])
    const [people, setPeople] = useState<PeopleType | undefined>(undefined)
    const [name, setName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [isCurrentPeople, setIsCurrentPeople] = useState(false)

    const [totalItemsCount, setTotalItemsCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const onNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('')
        setName(e.currentTarget.value)
    }

    const getPeoples = async () => {
        if (name.length === 1) {
            setErrorMessage('Name must be longer, then 1 symbol')
        } else {
            try{
                const res = await starWarsAPI.getPeoples(undefined, undefined, name)
                const peoplesResponse = res.data.results
                setPeoples(peoplesResponse)
                setTotalItemsCount(res.data.count)
                try{
                    if (!peoplesResponse?.length) {
                        setErrorMessage('The hero does not exist!')
                    }
                }catch(e){
                    // throw new Error('Some error occurred...')
                }
            } catch(e){
                    throw new Error('Some error occurred...')
                }
            // starWarsAPI.getPeoples(undefined, undefined, name)
            //     .then((res) => {
            //         const peoplesResponse = res.data.results
            //         setPeoples(peoplesResponse)
            //         setTotalItemsCount(res.data.count)
            //         return peoplesResponse
            //     })
            //     .then((peoplesResponse) => {
            //         if (!peoplesResponse?.length) {
            //             setErrorMessage('The hero does not exist!')
            //         }
            //     })
            //     .catch(() => {
            //         throw new Error('Some error occurred...')
            //     })
        }
    }
    const getPeopleItem = (peopleNumber: number) => () => {
        const currentPeople = peoples?.find((p, index) => index === peopleNumber - 1)
        setPeople(currentPeople)
        setIsCurrentPeople(true)
    }
    const onCloseClickHandler = () => {
        setPeople(undefined)
        setIsCurrentPeople(false)
    }
    const onPageChangedHandler = async (curPage: number) => {
        try{
            setPeoples(null)
            setCurrentPage(curPage)
            const res = await starWarsAPI.getPeoples(undefined, curPage)
            setPeoples(res.data.results)
        } catch (e){
            throw new Error('Some error occurred...')
        }
    }

    return (
        <div className={style.mainContainer}>
            {!isCurrentPeople
                ? <div className={style.mainBlock}>
                    <div className={style.mainHeader}>
                        <input type="text" value={name} placeholder={'Enter a name of the hero'}
                               onChange={onNameChangeHandler}/>
                        <SuperButton color={"blue"} onClick={getPeoples}>Search heroes</SuperButton>
                        <div className={style.errorMessage}>{errorMessage && errorMessage}</div>
                        <h2>You are greeted by the heroes of Star Wars!</h2>
                    </div>
                    <div className={style.peoplesList}>
                        {peoples && peoples.map((p, index) => {
                            return <div className={style.peopleItem} key={index}>
                                <span>🤖</span>
                                <span onClick={getPeopleItem(index + 1)}>{p.name}</span>
                            </div>
                        })}
                    </div>
                    {peoples?.length === 10 && <Pagination pageSize={10}
                                                           totalItemsCount={totalItemsCount}
                                                           currentPage={currentPage}
                                                           onPageChanged={onPageChangedHandler}/>}
                </div>
                : <People people={people} onCloseClickHandler={onCloseClickHandler}/>}
        </div>
    )
}

