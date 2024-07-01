import React, {useEffect} from 'react';
import cl from "./style.module.css"
import Categories from "../../models/categories";
import CategoriesApi from "../../api/categoriesApi";
import {Button, Form, Input} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

function removeItemAll(arr: any[], value: any) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

const CategoriesDashboardComponent = () => {
    const [categories, setCategories] = React.useState<Categories[]>([])
    const [loading, setLoading] = React.useState<boolean>(false);
    const [FormRef] = Form.useForm()
    useEffect(() => {
        CategoriesApi.getAllCategories().then((data) => {
            setCategories(data);
        }).catch()
    }, []);


    const deleteCategories = (cat: Categories) => {
        setLoading(true)
        CategoriesApi.delete(cat._id).then(() => {
            setLoading(false);
            removeItemAll(categories, cat)
        }).catch(() => setLoading(false));
    }
    const createCategories = (obj: Categories) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === obj.name) {
                return;
            }
        }
        setLoading(true)

        CategoriesApi.create(obj.name).then(cat => {
            setLoading(false);
            FormRef.resetFields();
            categories.push(cat);
        }).catch(() => setLoading(false))
    }

    return (
        <div>
            <h1>Категории</h1>
            <div className={cl.cont}>
                <Form
                    name="normal_login"
                    initialValues={{remember: true}}
                    onFinish={createCategories}
                    form={FormRef}
                >
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Пожалуйста, укажите имя!'}]}
                    >
                        <Input
                            placeholder="Название категории"
                            autoComplete={"on"}/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Создать категорию
                        </Button>
                    </Form.Item>
                </Form>
                {categories.map((category) => <div className={cl.item} key={category._id}>
                    <span className={cl.mr}>{category.name}</span>
                    {/*<Button icon={<EditOutlined/>} onClick={showModal} className={cl.mr} loading={loading}>Изменить</Button>*/}
                    <Button icon={<DeleteOutlined/>} onClick={() => deleteCategories(category)}
                            loading={loading}>Удалить</Button>
                </div>)}
            </div>

        </div>

    );
};

export default CategoriesDashboardComponent;