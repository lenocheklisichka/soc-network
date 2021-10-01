import React from "react";
import classes from "./Header.module.css"

function Header() {
    return(
        <header className={classes.header}>
            <img src="https://arch-sochi.ru/wp-content/uploads/2020/12/img-arso-6268.jpg" alt="logo"/>
        </header>
    );
}
export default Header;
