import { useState, useEffect, useInsertionEffect } from "react";
import { useParams } from 'react-router-dom';
import './CSS/Form.css'
import axios from 'axios';
import useFetch from "./useFetch";
import SmartContractFrom from "./SmartContracFrom";
import Information from "./Information";
import Swal from 'sweetalert2'

const UserContract = () => {
    const [contract, setContract] = useState(null)
    const {id} = useParams()
    const {data: user, isLoading} = useFetch('http://localhost:8000/users/' + id);


    const handleSubmit = (e) => {
        e.preventDefault();
      };

    
    const handleRequest = async () => {
    
        const{data: respond} = await axios.post('http://localhost:8080/users/signup', user)
        console.log("raw res",respond)
        // const etherScan = "https://etherscan.io/address/" + respond.message.toString()
        Swal.fire(   
            'smart contract deploy!!',
            respond.message,
        )
    
        return(setContract(respond))
    }
      
    return (
        <div className='information'>
            <div className="square">
                <div className="contaier">
                    <div className="smartcontract">
                        <h1>User Data</h1>
                    </div>
            {isLoading && <div>Loading...</div>}        
            {user && (
                <article>
                <p>Username : {user.username}</p>
                <p>GroupID : {user.privacyGroupId}</p>
                <p>Node : {user.node}</p>
                <p>Group : {user.tenant}</p>
                <button className="buttonRequest" type="button" onSubmit={handleSubmit} onClick={handleRequest} >send request</button>

                </article>
            )}
                </div>
            </div>
            {contract && <SmartContractFrom data={contract}/>}
            <Information/>
           
        </div>
    );
}
 
export default UserContract
