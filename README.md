# **Jambhalucid**
Jambhalucid demonstrates a functioning frontend user interface for interacting with various sample Cardano smart contracts.

It serves as a comprehensive demo application containing off-chain code for a variety of validators, leveraging shared components and utility code. The goal is to make it easy to differentiate the unique aspects of each contract, versus those that can be abstracted and reused across multiple contracts. Using a component-based library that emphasizes composability is ideal to achieve this, as opposed to presenting a series of independent examples written in vanilla JavaScript/TypeScript.

Jambhalucid's primary *raison d'être* is a companion project to **[Jambhala](https://github.com/iburzynski/jambhala)**, a feature-rich education and development suite to facilitate building full-stack applications on Cardano. This larger project is under development as an instructional tool for training Cardano developers.

However, Jambhalucid is maintained as a standalone project and can be run on any system without installing Nix or Jambhala. The only dependency required for standalone installation is the `pnpm` package manager.

### **Tech Stack**
Jambhalucid is built with the following tools:

* **[Next.js](https://nextjs.org/)**: an opinionated React-based framework for developing both dynamic (SPA) and server-side rendered (SSR) websites. React was selected due to its popularity and emphasis on functional programming patterns. Next.js was chosen due to its popularity and because it provides built-in support for routing (making it easy to present multiple contracts as separate pages) and Webpack configuration (required by Lucid).
* **[TypeScript](https://www.typescriptlang.org/)**: Cardano developers should value type safety and write well-typed programs! While providing an example UI built with JavaScript might be more accessible, TypeScript isn't difficult to learn and makes development much easier. If you aren't using TypeScript already, learn it and use it!
* **[Lucid](https://lucid.spacebudz.io/)**: a library for writing off-chain (transaction-building) code for Cardano contracts in JavaScript/TypeScript, developed by SpaceBudz.
* **[use-cardano](https://use-cardano.alangaming.com/)**: provides additional context, hook, and components, which make it easier to build applications with React/Lucid by providing persistent wallet connection and other conveniences. Many thanks to **[Alan Smithee](https://github.com/GGAlanSmithee)** for providing this additional tooling and the **[starter kit](https://github.com/use-cardano/cardano-starter-kit)** that served as the foundation for this project.

  >**Note:** at the time of writing `use-cardano` is using an outdated version of Lucid. The dependency constraint has been relaxed in `package.json` so we can follow Lucid's current API, which doesn't appear to cause any issues.

***
## **Installation**
Jambhalucid requires minimal to no installation, depending on whether it is used as part of Jambhala or as a **[Standalone Install](#standalone-install)**.

### **Jambhala:**
If you're using Jambhalucid inside **[Jambhala](https://github.com/iburzynski/jambhala)**'s Nix environment, `pnpm` is already installed and available (you can run `pnpm -v` to verify). Jambhala's `setup` wizard installs all of the dependencies required by Jambhalucid using `pnpm`.

#### **Configure Blockfrost**
Jambhalucid requires a Blockfrost API key (called a "project ID"), as it uses Blockfrost as a node provider to query the blockchain and submit transactions. This ID must be stored as a private environment variable so it can be imported by Next.js and used to connect to Blockfrost.

The Jambhala `setup` wizard generates two files for storing environment variables: `.env` (located in the project root directory) and `.env.local` (located in the `/jambhalucid` directory). The `/jambhalucid/.env.local` file should not be modified manually: it simply references variables contained in the `.env` file, which is used elsewhere in Jambhala.

Confirm that the `/jambhalucid/.env.local` exists and contains the following contents:

```sh
TESTNET_NAME=$TESTNET_NAME
BLOCKFROST_PROJECT_ID_PREPROD=$BLOCKFROST_PROJECT_ID_PREPROD
BLOCKFROST_PROJECT_ID_PREVIEW=$BLOCKFROST_PROJECT_ID_PREVIEW
```

If you've already created a Blockfrost account and stored your project ID in the `.env` file during installation of Jambhala, no further project configuration is required: you can proceed to **[Set Up a Testnet Wallet](#set-up-a-testnet-wallet)** and then run the `jlucid` command to launch the dev server and start interacting with the sample contracts.

Otherwise, follow the steps below to configure Blockfrost:
1. Visit **[blockfrost.io](https://blockfrost.io/)** and click the blue **`BUILD APPS NOW`** button in the top right corner to create a free account.
2. Once your account is created, you'll be taken to the **`DASHBOARD`**. Click **`+ADD PROJECT`** to create a new project.
3. Enter anything you like in the **`Project name`** field (i.e. "jambhala").
4. In the **`Network`** dropdown, select the Cardano testnet your project is using (**`Cardano preview`** or **`Cardano preprod`**). By default Jambhala is configured to use **`Cardano preview`**. You can run the following command in your Jambhala environment at any time to confirm which testnet you're using:

    ```sh
    echo $TESTNET_NAME
    ```

5. Once your project is created, you'll be taken to the project's page. Find the **`PROJECT ID`** field and click the copy icon to copy your ID.
6. Open the `.env` file in the root directory of your Jambhala project and replace the placeholder value for the corresponding variable with your project ID (paste it immediately after the equals sign):

    ```sh
    BLOCKFROST_PROJECT_ID_PREVIEW=previewProjectID
    ```

    or...

    ```sh
    BLOCKFROST_PROJECT_ID_PREPROD=preprodProjectID
    ```
7. Save the file and run `direnv allow` in your terminal session to make the new variable available.
8. Run an `echo` command to confirm that the variable is available:

    ```sh
    echo $BLOCKFROST_PROJECT_ID_PREVIEW
    ```

    or...

    ```sh
    echo $BLOCKFROST_PROJECT_ID_PREPROD
    ```

***
### **Standalone Install**

1. **[Install `pnpm`](https://pnpm.io/installation)** using your method of choice.

2. Clone or fork/clone this repository and enter the project directory (`/jambhalucid`).

3. Install the project dependencies by running `pnpm install` inside the `/jambhalucid` directory:

    ```sh
    pnpm install
    ```

4. Next.js uses a file called `.env.local` to reference sensitive environment variables (like API keys and passwords). This file should not be committed to your repository and hence is included in the `.gitignore` file.

    Copy the contents of `.env.local.template` file to `.env.local` with the following command:

    ```sh
    cp .env.local.template .env.local
    ```

#### **Configure Blockfrost**
If you haven't already created a Blockfrost account, follow the steps below.

1. Visit **[blockfrost.io](https://blockfrost.io/)** and click the blue **`BUILD APPS NOW`** button in the top right corner to create a free account.
2. Once your account is created, you'll be taken to the **`DASHBOARD`**. Click **`+ADD PROJECT`** to create a new project.
3. Enter anything you like in the **`Project name`** field (i.e. "jambhalucid").
4. In the **`Network`** dropdown, select the Cardano testnet your project is using (**`Cardano preview`** or **`Cardano preprod`**). By default Jambhalucid is configured to use **`Cardano preview`**, but you can also use the preprod network. Find the following entry in `/jambhalucid/.env.local` and change `preview` to `preprod`:

    ```sh
    TESTNET_NAME=preview
    ```

5. Once your project is created, you'll be taken to the project's page. Find the **`PROJECT ID`** field and click the copy icon to copy your ID.
6. Open the `.env.local` file and replace the placeholder value for the corresponding variable with your project ID (paste it immediately after the equals sign):

    ```sh
    BLOCKFROST_PROJECT_ID_PREVIEW=previewProjectID
    ```

    or...

    ```sh
    BLOCKFROST_PROJECT_ID_PREPROD=preprodProjectID
    ```

You can now **[Set Up a Testnet Wallet](#set-up-a-testnet-wallet)** and then launch the dev server (by running `pnpm dev` inside the `/jambhalucid` directory) to start interacting with the sample contracts.

***
### **Set Up a Testnet Wallet**
Jambhalucid currently works with the following Cardano wallets:

* **[Nami](https://namiwallet.io/)**
* **[Eternl]()**
* **[GeroWallet](https://gerowallet.io/)**
* **[Flint](https://flint-wallet.com/)**

Instructions are provided for **Nami** wallet because it has a very simple interface that is easy to configure for testing. Feel free to use any of the other options instead.

#### **Configure Nami Wallet**
1. On the **[Nami website](https://namiwallet.io/)**, click the logo corresponding to your browser of choice, which takes you to the associated store website to download the extension.
2. Click the button to add to your browser, and agree to the permissions popup to add the extension.
3. Click the app in the extensions section of your browser menu and click the `New Wallet` button.
4. Check `I accept the Terms of use` and click `Continue`.
5. Write down the **Seed Phrase** values in case you need to restore the wallet later. Since you'll be using the wallet on the testnet you don't need to worry about keeping this information secure, so you can store it electronically in a text file (but never do this for a real wallet!).
6. Check `I've stored the seed phrase in a secure place` and click `Next`.
7. Verify the seed phrase by entering the missing words.
8. In the **Create Account** window, enter a name for your account and an 8+ character spending password. Write the spending password down, then click `Create`. A confirmation screen will instruct you to close the tab.
9. Click the app in the extensions section of your browser menu again. Then click the avatar icon in the top right of the wallet and select `Settings`.
10. Select `Network` and select `Preview` or `Preprod`, depending on which testnet you selected when you created your Blockfrost project ID.

Your Nami wallet is now ready to use, but you'll need to fund the wallet with Test Ada (t₳) to interact with the Jambhalucid contracts.

You can use the **[Testnets Faucet](https://docs.cardano.org/cardano-testnet/tools/faucet)** to provide initial funds. Click the `Receive` button in your wallet, which opens a popup containing your wallet address. Clicking the address will copy it to the clipboard, which you can paste into the `Address` field of the faucet form. Complete the CAPTCHA and click `REQUEST FUNDS` to receive the funds.

You can also supply your wallet with Test Ada by using Jambhalucid's **Gift** contract to claim funds locked at the "always succeeds" script address.

***
## **Launch Dev Server**
Before interacting with the contracts, make sure you've followed the instructions above for configuring Blockfrost and setting up a testnet wallet. You'll need a valid connection to Blockfrost's API and a wallet connected to the corresponding testnet to submit transactions.

### **Jambhala:**
Run the `jlucid` command from inside the project root directory (`/jambhala` for **Learning Mode** or `/your-project-name` for **Development Mode**):

```sh
jlucid
```

### **Standalone Install:**
Run `pnpm dev` inside the `/jambhalucid` directory:

```sh
pnpm dev
```