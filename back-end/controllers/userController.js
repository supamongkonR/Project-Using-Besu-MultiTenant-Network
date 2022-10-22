
const dotenv =require('dotenv')
dotenv.config({ path: '../.env' }) // warning when don't forget path when in complex directory
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
const fs = require("fs")
const path = require('path');

const signup = async (req, res) => {
    // recipt request
    const{username, node, privateKey, endpoint, privacyGroupId, token, enclave} = req.body;
    res.status(200).json({message: username})
    console.log("Recive! From Client")
    console.log("username:",username)
    console.log("enclave:",privacyGroupId)
    console.log("endpoint:",endpoint)
    console.log("Besu node:",node)
}
    // const{createHttpProvider} = require('./helper')
    // // import binary file
    // const binary = fs.readFileSync(
    //     path.join(__dirname, "../contract/information_bin.bin")
    //   );
    
    // const node1 = new Web3Quorum(
    //     new Web3(createHttpProvider(token,endpoint))
    // )

    // const contractOptions = {
    //     data: `0x${binary}`,
    //     privateFrom: enclave,
    //     privacyGroupId: privacyGroupId,
    //     privateKey: privateKey,
    // }
    // const createInformationContract = (privacyGroupId) => {
    //     contractOptions
    //     return node1.priv.generateAndSendRawTransaction(contractOptions);
    // }
    // const getPrivateContractAddress = (transactionHash) => {
    //     return node1.priv
    //       .waitForTransactionReceipt(transactionHash)
    //       .then((privateTransactionReceipt) => {
    //         return privateTransactionReceipt.contractAddress;
    //       });
    //   };

    // const contractAddress = await createInformationContract(
    //     privacyGroupId
    // ).then((res) => {
    //     return getPrivateContractAddress(res);
    // });
    //   console.log(
    //     `now you have to run:\n export CONTRACT_ADDRESS=${contractAddress}`
    //   )
    //   console.log(
    //     ` export PRIVACY_GROUP_ID=${privacyGroupId}`
    //   )
    // }
    
    // if (require.main === module) {
    //   module.exports();
    // } 


const signin = async (req, res) => {
    //set username password variable from respond body
    const{username, password} = req.body;

    try{
        //check username 
        const existingUser = await userModel.findOne({username : username});
        if(! existingUser){
            return res.status(404).json({message:"User not found"})
        }

        //check password 
        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if(!comparePassword){
             return res.status(400).json({message : "Invalid Password"})
        }
        // Token payload
        const userPayload = {
            permission: ["*;*"],
            privacyPublicKey: process.env.tesseraNode1,
            exp: 1600899999002
        }
        // create token and get respond in json form and rerurn 201 create success
        const token = jwt.sign({userPayload},process.env.userRSA);
        res.status(201).json({ user: existingUser, token: token })



    }catch(err){
        console.log(err);
        res.status(500).josn({message: "something went wrong"})

    }    

}

module.exports = {signup, signin};