import React from 'react';
import {Alert} from "antd";

const SuccessfulUnsubscriptionPage = () => {
    return (
        <div>
            <Alert
                message="Вы успешно отписались"
                description={<span>Расскажите, почему вы решили отписаться<br/>
                <a href={"/"} target={"_blank"} rel="noreferrer">ссылка на форму</a>
            </span>}
                type="success"
                showIcon
            />


            {/*<div>*/}
            {/*    <h1>Спасибо за подписку на получение новых постов для сайта Все Закупки</h1>*/}
            {/*    Если это были не вы, то вы можете отказаться от рассылки перейдя по ссылке ниже:<br/>*/}
            {/*    <a href="${originUrl}/mail/remove/${user._id}">отписаться от рассылки</a>*/}
            {/*</div>*/}
        </div>
    );
};

export default SuccessfulUnsubscriptionPage;