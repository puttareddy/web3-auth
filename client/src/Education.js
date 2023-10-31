import React, { useState } from 'react';
import { ethers } from 'ethers';

// Import the ABI and contract address
import FullABI from './abis/EducationDetailABI.json';

const EducationComponent = (props) => {
    const [educationData, setEducationData] = useState();
    const contractInstance = props.contractInstance;
    const MLRegistryAddress = props.MLRegistryAddress;
    const nft = props.nft;
    const userAddress = props.userAddress; 
    const userData = props.userData;
     // Educational Details CRUD

    const getEducationalDetails = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider);

        // Call the method on the delegate contract
        const education = await educationContract.getAllEducationalDetailsRecords(nft);

        let transformedData =[]; 
        
        education.forEach(element => {
            transformedData.push(Object.fromEntries(element));
        });
        
        console.log({rawData: education,educationtransromed: transformedData});
        setEducationData(transformedData);
        }
    };


    const addEducationAttribute = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider.getSigner());

        // Call the method on the delegate contract
        const res = await educationContract.addEducationalDetailsAttribute('major');
        console.log({attributeEducationAdded:res});
        }
    };

    const setEducationalDetailsProxyAddress = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider.getSigner());

        // Call the method on the delegate contract
        const res = await educationContract.setEducationalDetailsIdProxyAddress(userAddress);
        console.log({prxysetEducation:res});
        }
    };

    const setEducationInfo = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider.getSigner());

        // Call the method on the delegate contract
        const res = await educationContract.addEducationalDetails(nft, [["institute","University of South Asia, Lahore"],["degree","BSCS"],["major","Computer Science"]]);
        console.log({infoAdded:res});
        }
    };

    const updateEducationInfo = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider.getSigner());

        // Call the method on the delegate contract
        const res = await educationContract.updateEducationalDetails(nft,1, [["institute","University of South Asia, Lahore"],["degree","BScs"],["major","Computer Science"]]);
        console.log({workUpdated:res});
        }
    };

    const deleteEducationInfo = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider.getSigner());

        // Call the method on the delegate contract
        const res = await educationContract.deleteEducationalDetails(nft,1);
        console.log({educationdeleted:res});
        }
    };

    const getEducationalDetailsByIndex = async () => {
        if (contractInstance) {

        const educationContract = new ethers.Contract(MLRegistryAddress, FullABI, contractInstance.provider);

        // Call the method on the delegate contract
        const education = await educationContract.getEducationalDetailsByIndex(nft,0);
        console.log({rawData: education});
        
        }
    };

    return (
        <div>
            <h1>Educational Details</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={addEducationAttribute}>Add Educational Detail Attribute</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={setEducationalDetailsProxyAddress}>Set Proxy Address for Address</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={setEducationInfo}>Set Educational Detail</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={updateEducationInfo}>Update Educational Detail</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={getEducationalDetailsByIndex}>Get Educational Detail By Index</button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={getEducationalDetails}>Get Educational Detail</button>
            <h4>Educational Data of {userData?.name}</h4>
            <p>{JSON.stringify(educationData)}</p>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={deleteEducationInfo}>Delete Educational Detail</button>
        </div>
    );
}

export default EducationComponent;