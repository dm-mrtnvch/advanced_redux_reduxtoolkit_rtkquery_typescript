import React, {FC} from 'react';
import {IPost} from "../models/IPost";
import {uptime} from "os";

interface PostItemProps {
    post: IPost
    update: (post: IPost) => void
    remove: (post: IPost) => void
}

export const PostItem: FC<PostItemProps> = ({post,remove, update}) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(post)
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const title = prompt() || ""
        update({...post, title})
    }

    return (
        <div onClick={handleUpdate}>
            {post.id}. {post.title}
            <button onClick={handleRemove}>delete</button>
        </div>
    );
};

