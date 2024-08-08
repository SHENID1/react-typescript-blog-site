import React, {FC} from 'react';
import {Helmet} from "react-helmet";

interface Props {
    title?: string;
    description?: string;
    imageUrl?: string;
}

const MetaComponent: FC<Props> = ({title, description, imageUrl}) => {
    return (
        <Helmet>
            <title>Все Закупки | {title}</title>
            <meta name="description"
                  content={description}/>
            <meta property="og:description"
                  content={description}/>
            <meta property="og:title" content={title}/>
            {imageUrl ? <meta property="og:image" content={imageUrl}/> :
                <meta property="og:image" content="https://vsezakup.ru/logo-color.png"/>
            }
        </Helmet>

    );
};

export default MetaComponent;