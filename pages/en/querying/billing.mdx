---
title: Billing on the Subgraph Studio
---

### Overview

Invoices are statements of payment amounts owed by a customer and are typically generated on a weekly basis in the system. You’ll be required to pay fees based on the query fees you generate using your API keys. The billing contract lives on the [Polygon](https://polygon.technology/) network. It’ll allow you to:

- Add and remove GRT
- Keep track of your balances based on how much GRT you have added to your account, how much you have removed, and your invoices
- Automatically clear payments based on query fees generated

In order to add GRT to your account, you will need to go through the following steps:

1. Purchase GRT and ETH on an exchange of your choice
2. Send the GRT and ETH to your wallet
3. Bridge GRT to Polygon using the UI

   a) You will receive 0.001 Matic in a few minutes after you send any amount of GRT to the Polygon bridge. You can track the transaction on [Polygonscan](https://polygonscan.com/) by inputting your address into the search bar.

4. Add bridged GRT to the billing contract on Polygon. The billing contract address is: [0x10829DB618E6F520Fa3A01c75bC6dDf8722fA9fE](https://polygonscan.com/address/0x10829DB618E6F520Fa3A01c75bC6dDf8722fA9fE).

   a) In order to complete step #4, you'll need to switch your network in your wallet to Polygon. You can add Polygon's network by connecting your wallet and clicking on "Choose Matic (Polygon) Mainnet" [here.](https://chainlist.org/) Once you've added the network, switch it over in your wallet by navigating to the network pill on the top right-hand side corner. In Metamask, the network is called **Matic Mainnnet.**

At the end of each week, if you used your API keys, you will receive an invoice based on the query fees you have generated during this period. This invoice will be paid using GRT available in your balance. Query volume is evaluated by the API keys you own. Your balance will be updated after fees are withdrawn.

#### Here’s how you go through the invoicing process:

There are 4 states your invoice can be in:

1. Created - your invoice has just been created and not been paid yet
2. Paid - your invoice has been successfully paid
3. Unpaid - there is not enough GRT in your balance on the billing contract
4. Error - there is an error processing the payment

**See the diagram below for more information:**

![Billing Flow](/img/billing-flow.png)

For a quick demo of how billing works on the Subgraph Studio, check out the video below:

<figure className="video-container">
  <iframe
    className="video-iframe"
    src="https://www.youtube.com/embed/UrfIpm-Vlgs"
    title="YouTube video player"
    frameBorder="0"
    allowFullScreen
  ></iframe>
</figure>

### Multisig Users

Multisigs are smart contracts that can exist only on the network they have been created, so if you created one on Ethereum Mainnet - it will only exist on Mainnet. Since our billing uses Polygon, if you were to bridge GRT to the multisig address on Polygon the funds would be lost.

To overcome this issue, we created [a dedicated tool](https://multisig-billing.thegraph.com/) that will help you deposit GRT on our billing contract (on behalf of the multisig) with a standard wallet / EOA (an account controlled by a private key).

You can access our Multisig Billing Tool here: https://multisig-billing.thegraph.com/

This tool will guide you to go through the following steps:

1. Connect your standard wallet / EOA (this wallet needs to own some ETH as well as the GRT you want to deposit)
2. Bridge GRT to Polygon. You will have to wait 7-8 minutes after the transaction is complete for the bridge transfer to be finalized.
3. Once your GRT is available on your Polygon balance you can deposit them to the billing contract while specifying the multisig address you are funding in the `Multisig Address` field.

Once the deposit transaction has been confirmed you can go back to [Subgraph Studio](https://thegraph.com/studio/) and connect with your Gnosis Safe Multisig to create API keys and use them to generate queries.

Those queries will generate invoices that will be paid automatically using the multisig’s billing balance.
