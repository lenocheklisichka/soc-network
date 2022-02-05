import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {PostType} from "../../../types/types";
import {connect} from "react-redux";
import {AppDispatch, AppRootState} from "../../../redux/redux-store";

type MapStateToPropsType = {
    posts: Array<PostType>
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppRootState): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer