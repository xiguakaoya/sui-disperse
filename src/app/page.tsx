"use client";

import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { ConnectButton } from '@suiet/wallet-kit';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from "@mysten/sui.js";
import TransferForm from '@/compnents/transfer-form';
import { Layout, Card, message } from 'antd';
import styles from './page.module.scss';
import SuiIcon from '@/compnents/sui-icon';
import { Select, Form, Button, Row } from 'antd';




const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  const wallet = useWallet();
  const [form] = Form.useForm();


  const onFinish = async (values: { transaction: Array<{ address: string, amount: number }> }) => {
    const txb = new TransactionBlock();
    values.transaction.forEach(item => {
      const valiCount = item.amount * 10**9; 
      const [coin] = txb.splitCoins(txb.gas, [txb.pure(valiCount)]);
      txb.transferObjects([coin], txb.pure(item.address));
    });

    const res = await wallet.signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });

   if(res.confirmedLocalExecution){
    message.success(<div>disperse success, see detail in <a  target='_blank' href={`https://suiexplorer.com/txblock/${res.digest}?network=devnet`}>sui explorer</a></div>, 60)
   }
  };



  return <Layout className={styles.layout}>

        <Form form={form} onFinish={onFinish}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.icon}><SuiIcon ></SuiIcon></div>
              <h1 >disperse<sup>devnet</sup></h1>
            </div>
            <p className={styles.dsc} >distribute sui or tokens to multiple addresses</p>

            <Card className={styles.card}>
              <h2 className={styles.cardHeader} >connect to wallet</h2>
              < ConnectButton />
            </Card>

            <Card className={styles.card}>
              <h2 className={styles.cardHeader} >choose token</h2>
              <Form.Item name="type" initialValue="sui">
              <Select disabled  options={[{ label: 'sui', value: 'sui' }, { label: 'token', value: 'token' }]}  style={{ width: '160px' }}></Select>
              </Form.Item>
            </Card>


            <Card className={styles.card}>
              <h2 className={styles.cardHeader} >recipients and amounts</h2>
              <p className={styles.para}> enter one address and amount  on each line.</p>
              <TransferForm />
            </Card>


           <div  className={styles.submit}>
              <Button type="primary" htmlType="submit">
                confirm disperse
              </Button>
            </div>


          </div>


         
        </Form>



      <Footer style={{ textAlign: 'center' }} >sui disperse Created by xiguakaoya ©2023</Footer>
    </Layout>


}
