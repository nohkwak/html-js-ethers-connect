const { Wallet, TxType, AccountKeyType } = require("@klaytn/ethers-ext");
const { ethers } = require("ethers");

async function connect() {
  if (typeof window.klaytn !== "undefined") {
    try {
      await klaytn.request( {method: "klay_requestAccounts"} );
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected";
    const accounts = await klaytn.request({ method: "klay_accounts" });
    document.getElementById("accounts").innerHTML = accounts;
    console.log(accounts);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install MetaMask";
  }
}

async function execute() {
  // if (typeof window.ethereum !== "undefined") {
  //   contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //   const abi = [
  //     {
  //       inputs: [
  //         {
  //           internalType: "string",
  //           name: "_name",
  //           type: "string",
  //         },
  //         {
  //           internalType: "uint256",
  //           name: "_favoriteNumber",
  //           type: "uint256",
  //         },
  //       ],
  //       name: "addPerson",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         {
  //           internalType: "string",
  //           name: "",
  //           type: "string",
  //         },
  //       ],
  //       name: "nameToFavoriteNumber",
  //       outputs: [
  //         {
  //           internalType: "uint256",
  //           name: "",
  //           type: "uint256",
  //         },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         {
  //           internalType: "uint256",
  //           name: "",
  //           type: "uint256",
  //         },
  //       ],
  //       name: "people",
  //       outputs: [
  //         {
  //           internalType: "uint256",
  //           name: "favoriteNumber",
  //           type: "uint256",
  //         },
  //         {
  //           internalType: "string",
  //           name: "name",
  //           type: "string",
  //         },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [],
  //       name: "retrieve",
  //       outputs: [
  //         {
  //           internalType: "uint256",
  //           name: "",
  //           type: "uint256",
  //         },
  //       ],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //     {
  //       inputs: [
  //         {
  //           internalType: "uint256",
  //           name: "_favoriteNumber",
  //           type: "uint256",
  //         },
  //       ],
  //       name: "store",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //   ];
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(contractAddress, abi, signer);
  //   try {
  //     await contract.store(42);
  //   } catch (error) {
  //     console.log(error);
  //   }
  if (typeof window.klaytn !== "undefined") {
    const senderAddr = "0xe15cd70a41dfb05e7214004d7d054801b2a2f06b";
    const senderPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
    const senderNewPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

    const provider = new ethers.providers.Web3Provider(window.klaytn);
    const signer = provider.getSigner();

    // 서명은 되지만 트랜잭션으로 전송되고 callback이 없어서 확인이 안됨 
    // const message = 'Hello dapp';
    // const signature = await signer.signMessage(message);
    // console.log( signature );

    try {    
      let tx = {
        type: TxType.AccountUpdate,
        from: senderAddr,
        key: {
          type: AccountKeyType.Public,
          key: ethers.utils.computePublicKey(senderNewPriv, true),
        }
      };

      // 1. 
      // const populatedTx = await signer.populateTransaction(tx);
      // const signedTx = await signer.signTransaction(populatedTx);

      // const sentTx = await this._sendRawTransaction(signedTx);
      // console.log("sentTx", sentTx);

      // 2. 
      // const sentTx = await signer.sendTransaction(tx);
      // console.log("sentTx", sentTx);

      // 3. 
      let params = [
        {
          from: '0x672e7a695066b131cE36842D978Ad9e251A2Df7E',
          to: '0x672e7a695066b131cE36842D978Ad9e251A2Df7E',
          gas: '0x76c0', // 30400
          value: '0x0', // 2441406250
        }
      ]; 

      window.klaytn
        .request({
          method: 'klay_sendTransaction',
          params:params,
        })
        .then((result) => {
          // The result varies by RPC method.
          // For example, this method returns a transaction hash hexadecimal string upon success.
          console.log(result);
        })
        .catch((error) => {
          // If the request fails, the Promise rejects with an error.
          console.log(error);
        });

    } catch (error) {
      console.log(error);
    }

  } else {
    document.getElementById("executeButton").innerHTML =
      "Please install MetaMask";
  }
}

module.exports = {
  connect,
  execute,
};
