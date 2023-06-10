"use client";

import { Form, Input, InputNumber, Button, Space, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useWallet } from '@suiet/wallet-kit';


export default function TransferForm() {
    const [form] = Form.useForm();
    const wallet = useWallet();

   


    return<>
        <Form.List
            initialValue={[{ address: '', amount: null }]}
            name="transaction">
            {
                (fields, { add, remove }, { errors }) => (

                    <>
                        {
                            fields.map(({ key, name, ...restField }, index) => (
                                <Row key={key} style={{ display: 'flex', marginBottom: 8 }} >
                                    <Col span={16}>
                                    <Form.Item  rules={[{ required: true, message: '请填写地址' }]} label="address"  {...restField} name={[name, 'address']} >
                                        <Input />
                                    </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                    <Form.Item rules={[{ required: true, message: '请填写数量' }]}   label="amount"  {...restField} name={[name, 'amount']} >
                                    <InputNumber></InputNumber>
                                    </Form.Item>
                                    </Col>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(name)}
                                        />
                                    ) : null}
                                </Row>
                            ))
                        }

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                
                            </Button>
                        </Form.Item>


                    </>
                )
            }

        </Form.List>


        </>
   




}