import React from 'react';
import {Alert} from "antd";
import cl from "./style.module.css"

const SuccessfulUnsubscriptionPage = () => {
    return (
        <div className={cl.cont}>
            <Alert
                message="Вы успешно отписались"
                description={<span>Теперь вы можете закрыть страницу</span>}

                type="success"
                showIcon
            />
            {/*<iframe*/}
            {/*    id="inlineFrameExample"*/}
            {/*    title="Inline Frame Example"*/}
            {/*    className={cl.iframe}*/}
            {/*    width="100%"*/}
            {/*    height="735px"*/}
            {/*    src="https://docs.google.com/forms/d/e/1FAIpQLSfNFxKvnnmVLKycFgjEbzg7XAK0MFTW5lJKwh8CqK4zAAP4NA/viewform?usp=sharing">*/}
            {/*</iframe>*/}

            {/*<div>*/}
            {/*    <h1>Спасибо за подписку на получение новых постов для сайта Все Закупки</h1>*/}
            {/*    Если это были не вы, то вы можете отказаться от рассылки перейдя по ссылке ниже:<br/>*/}
            {/*    <a href="${originUrl}/mail/remove/${user._id}">отписаться от рассылки</a>*/}
            {/*</div>*/}
        </div>
    );
};

export default SuccessfulUnsubscriptionPage;