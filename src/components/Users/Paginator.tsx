import React, {useState} from "react";
import classes from "./Paginator.module.css"

export type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            totalUsersCount, pageSize,
                                                            currentPage, onPageChanged,
                                                            portionSize = 15
                                                        }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={classes.paginator}>
            {
                portionNumber > 1 &&
                <button className={classes.btn} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} className={currentPage === p ? classes.selectedPage : ""}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }}>{p}</span>

                })}
            {
                portionCount > portionNumber &&
                <button className={classes.btn} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>
            }
        </div>
    )
}