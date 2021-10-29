import React, {useEffect, useState} from 'react';
import {postAPI} from "../services/PostService";
import {PostItem} from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(100)
    const {data: posts, isLoading, error, refetch, } = postAPI.useFetchAllPostsQuery(limit, {
        // pollingInterval: 1000
    })
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()

    useEffect(() => {
        // setTimeout(() => {
        //     setLimit(3)
        // }, 1000)
    }, [])

    const handleCreate = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div>
            <button onClick={handleCreate}>add new post</button>
            {/*<button onClick={() => refetch()}>refetch</button>*/}
            {isLoading && <h1>loading...</h1>}
            {error && <h1>error...</h1>}
            {posts && posts.map(post =>
                <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate}/>
            )}
        </div>
    );
};

export default PostContainer;