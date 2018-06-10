# BlockChat 

The goal of this project is to create a decentralized microblogging and messaging service, where each user can chat with each other and follow their tweets. 

## Getting Started 

### Prerequisites

1.  [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
2.  [NodeJS + NPM](https://nodejs.org/en/download/package-manager/)
3.  Truffle

```
npm install -g truffle@4.1.11
```

4.  [MetaMask](https://metamask.io/) 

### Installation

#### Terminal 1 - first Server

Navigate to server folder 
```
cd server.1
```
Install dependencies 
```
npm install
```

Run development build 

```
npm start
```
#### Terminal 2 - second Server

Navigate to server folder 
```
cd server.2
```
Install dependencies 
```
npm install
```

Run development build 

```
npm start
```

#### Terminal 3 - Blockchain 

Navigate to client folder 
```
cd client 
```
Install dependencies 

```
npm install 
```

Run local blockchain 

```
truffle develop
```

#### Terminal 4 - Client 

Open new terminal window to deploy smart contracts on local blockchain 

```
cd client
truffle migrate
```

Run application in browser 

```
npm run dev
```

#### Terminal 5 - Setup demo Users 

```
cd client
node dummy.js 
```

#### List Of Demo Users you can use to login 

```
John.eth
Peter.eth
Trump.eth
Benny.eth
Karl.eth
```

### Initial ENS Setup   (depreceated use Setup Demo Users)

Register a Ethereum ID first 
```
http://localhost:8080/#/registerDomain

```

you can register with that ID now 

```
http://localhost:8080/#/register

```


## Built With

* [Truffle](http://truffleframework.com/)
* [Solidity](https://solidity.readthedocs.io/en/v0.4.23/)
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](http://expressjs.com/de/)
* [VueJs](https://vuejs.org)
* [Webpack](https://webpack.js.org)
* [MongoDB](https://www.mongodb.com)

## Project Structure (Abstract)

```
├── client
│   ├── src
│   │    ├── components (UI components)
│   │    ├── App.vue (root component)
│   │    ├── main.js (injects root component into page)
│   │    ├── router
│   │    └── store (state of app)
│   └── contracts (smart contracts)
│
|
├── dist (producton build for deployment)
|
├── Intl (text for client)
|
├── server
│   ├── controllers (communication with backend) 
│   ├── models  
│   ├── routes
│   ├── config
│   └── server.js (setup, db connection, startup, ...)
|
├── node_modules
├── README.md
├── package.json
└── .gitignore
```

## Troubleshooting
No changes after migration
* `truffle migrate --reset` to run all migrations from beginning

Contract migration failed
* remove `/build` folder and perform migration again

## Authors

* **Hai Dang**
* **Charul**
* **Antal**
* **Ferhat**



<!-- ## Actors/Roles

## Architecture

## Protocol

## Setup

## Documentation

* [Project documentation](/documentation/documentation.pdf)
* [Initial project presentation](/presentation/presentation-initial.pptx)
* [Final project documentation](/presentation/presentation-final.pptx) -->