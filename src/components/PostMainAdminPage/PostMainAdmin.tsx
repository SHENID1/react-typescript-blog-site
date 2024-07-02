import React, {FC} from 'react';
import {Button, ConfigProvider} from "antd";
import {NavLink} from "react-router-dom";

const PostMainAdmin: FC = () => {
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            /* here is your component tokens */
                        },
                    },
                }}
            >
                <h1>Статьи</h1>
                <br/>
                <NavLink to={"/admin/posts/create"}>
                    <Button type="link">
                        Написать статью
                    </Button>
                </NavLink>
            </ConfigProvider>

        </div>
    );
};

export default PostMainAdmin;