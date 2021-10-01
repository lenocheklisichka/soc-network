import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div className={classes.sochi}>
            </div>
            <div className={classes.profile}>
                <div>
                    <img src="https://cs8.pikabu.ru/post_img/big/2017/11/21/8/151127099913557940.jpg" alt="photo"/>
                </div>
                <div>
                    <div>
                        <h1>Elena K.</h1>
                    </div>
                    <div>Date of Birth: 11 september</div>
                    <div>City: Sochi</div>
                    <div>Education: Higher education</div>
                    <div>Profession: frontend developer</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;