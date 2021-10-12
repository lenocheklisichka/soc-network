import React from "react";
import ProfileInfo, {PhotosType} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/types";

export type ProfilePropsType = {
    profile: ProfileType | null
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
}
export default Profile;
