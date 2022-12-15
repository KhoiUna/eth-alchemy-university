import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import server from "./server";

const { data: balances } = await server.get("/generate-balances");
const Balance = () => {
  return (
    <div className="balances">
      <u>
        <h3>Test balances</h3>
      </u>

      <div>
        {balances.map(({ privateKey, publicKey, address }) => (
          <div className="balance_container">
            <p>
              <b>Private key:</b> {privateKey}
            </p>
            <p>
              <b>Public key:</b> {publicKey}
            </p>
            <p>
              <b>Address: </b>
              {address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [balance, setBalance] = useState(0);
  const [signature, setSignature] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={signature}
        setAddress={setSignature}
      />
      <Transfer setBalance={setBalance} address={signature} />
      <Balance />
    </div>
  );
}

export default App;
