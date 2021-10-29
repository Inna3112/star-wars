import React from 'react';
import s from './Pagination.module.css'
import cn from 'classnames'


type PropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (page: number) => void
}

export const Pagination: React.FC<PropsType> = React.memo(({totalItemsCount, pageSize, currentPage,
                                          onPageChanged}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div className={s.paginator}>
            {pages.map((p, index) => {
                    return <span key={index}
                                 className={cn({
                                     [s.selectedPage] : currentPage === p
                                 }, s.page)}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }}
                    >{p}</span>
                })}
        </div>
    )
})

