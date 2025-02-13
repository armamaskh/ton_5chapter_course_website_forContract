import { TonConnectButton } from '@tonconnect/ui-react';
import './App.css'
import { useMainContract } from './hooks/useMainContract';
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from '@ton/core';

function App() {

  const {  contract_address, number, recent_address, owner_address, balance, sendIncrement, sendDeposite, sendWithdrawal  } = useMainContract();
  const {connected} = useTonConnect();

  return (
    <div>
        <div>
          <TonConnectButton />
        </div>
        <div>
            <div className='Card'> <b>Out contract address</b> </div>
            <div className='Hint'>{contract_address }</div>

            <div className='Card'> <b>The address of the last sender of the contract message</b> </div>
            <div className='Hint'>{recent_address?.toString()}</div>

            <div className='Card'> <b>The address of the contract owner</b> </div>
            <div className='Hint'>{owner_address?.toString()}</div>

            
            <b>Out contract balance</b>
            <div className='Hint'>{fromNano(balance?.toString(10) ?? "0") }</div>
        </div>
        <div className='Card'>
          <b>Counter</b>
          <div>{number ?? "Loading..."}</div>
        <div className='Card'>
        {
            connected && (
              <a onClick={ () => { sendIncrement()} }>
                  [Increment by 2]
              </a>
            )
          }
          <br/>
          {
            connected && (
              <a onClick={() => { sendDeposite() }}>
                  [Send deposite to this contract]
              </a>
            )
          }
          <br/>
          {
            connected && ( 
              <a onClick={ () => {sendWithdrawal()} }>
                  [Send Withdrawal 0.02 TON from this contract]
              </a>
             )
          }

        </div>
        </div>
    </div>
  );
}

export default App
