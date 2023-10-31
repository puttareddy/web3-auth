import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Import the ABI and contract address
import FullABI from "./abis/FullABI.json";
/* import FullABI from './abis/FullABI.json';
import FullABI from './abis/FullABI.json';
// import ProjectsABI from './abis/ProjectsABI.json';
import FullABI from './abis/ProjectResourceABI.json'; */
import EducationComponent from "./Education";

// const MLRegistryAddress = '0xA0d78fDD058f12A31355A656dCFF6F03bF9Deef9';
const MLRegistryAddress = "0x213D9aA11549f6e0dcE520A09938ed7BfB7c9EE3";

const MyComponent = () => {
  const [contractInstance, setContractInstance] = useState(null);
  const [userData, setUserData] = useState();
  const [workData, setWorkData] = useState();
  const [role, setRole] = useState();
  const [connectedAddress, setConnectedAddress] = useState("");
  const [nft, setNft] = useState();

  const [allUsersData, setAllUsersData] = useState();
  const userAddress = "0x025D7505032235DB82aE46B8d9d6c4E84ef33A69";
  // const nft = 1;
  useEffect(() => {
    const connectToContract = async () => {
      // Connect to the Ethereum provider (e.g., MetaMask)
      await window.ethereum.enable();

      // Create a new ethers.js provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Create an instance of the main contract
      const contract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        provider.getSigner()
      );
      setContractInstance(contract);
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        provider
      );
      const owner = await userInfoContract.isAdmin(address);
      console.log("is owner", owner);
      if (owner) {
        setRole("Admin");
        await getAllUsers();
      } else {
        await getSingleUser();
      }

      setConnectedAddress(address);
    };

    connectToContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to interact with the contract
  const getSingleUser = async () => {
    if (contractInstance) {
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider
      );

      // Call the method on the delegate contract
      const userInfo = await userInfoContract.getUserInfo(connectedAddress);
      let transformedInfo = Object.fromEntries(userInfo[1]);
      transformedInfo = { tokenId: userInfo[0].toNumber(), ...transformedInfo };
      console.log({ rawData: userInfo, transromed: transformedInfo });

      setRole(transformedInfo.role);
      setNft(userInfo[0].toNumber());
      setUserData(transformedInfo);
    }
  };

  const getAllUsers = async () => {
    if (contractInstance) {
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider
      );

      // Call the method on the delegate contract
      const userInfo = await userInfoContract.getAllUserRecords();
      const transformedData = userInfo.map(
        ([proxyAddress, tokenId, attributeInfo]) => ({
          proxyAddress,
          tokenId: tokenId.toNumber(),
          data: attributeInfo.reduce((obj, { attribute, info }) => {
            obj[attribute] = info;
            return obj;
          }, {}),
        })
      );

      /* let transformedInfo = userInfo.map((item)=> Object.fromEntries(item.attributeInfo));
      console.log({rawData: userInfo, transromed: transformedInfo}); */

      console.log({ transformedData: transformedData, rawData: userInfo });
      setAllUsersData(transformedData);
    }
  };

  const addAttribute = async () => {
    if (contractInstance) {
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await userInfoContract.addUserAttribute("first_name");
      console.log({ attributeAdded: res });
    }
  };

  const setUserInfo = async () => {
    if (contractInstance) {
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await userInfoContract.setUserInfo(3, [["age", "30"]]);
      console.log({ infoAdded: res });
    }
  };

  const minUser = async () => {
    if (contractInstance) {
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await userInfoContract.mintUser(userAddress, [
        ["first_name", "Ubaid"],
        ["last_name", "Ullah"],
        ["industry", ""],
        ["current_position", ""],
        ["education", ""],
        ["country", ""],
        ["city", ""],
        ["email", "ubaid.ullah@mobilelive.ca"],
        ["phone_number", ""],
        ["dob", ""],
        ["role", "admin"],
      ]);
      console.log({ minted: res });
    }
  };

  const setProxyAddress = async () => {
    if (contractInstance) {
      const userInfoContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await userInfoContract.setUserIdProxyAddress(userAddress);
      console.log({ prxyset: res });
    }
  };

  // Work Experience CRUD

  const getWorkExperience = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider
      );

      // Call the method on the delegate contract
      const workExp = await workExpContract.getAllWorkExperienceRecords(1);

      let transformedData = []; // workData.map(item => Object.fromEntries(item));

      workExp.forEach((element) => {
        transformedData.push(Object.fromEntries(element));
      });

      console.log({ rawData: workExp, worktransromed: transformedData });
      setWorkData(transformedData);
    }
  };

  const addWorkExpAttribute = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await workExpContract.addFileAttribute("ipfsHash");
      console.log({ attributeWorkAdded: res });
    }
  };

  const setWorkExperienceProxyAddress = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await workExpContract.setWorkExperienceIdProxyAddress(
        connectedAddress
      );
      console.log({ prxysetWork: res });
    }
  };

  const setWorkExpInfo = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      console.log("nft for jawwad", nft);
      // Call the method on the delegate contract
      const res = await workExpContract.addWorkExperience(4, [
        ["title", "Sr. Software Engineer"],
        ["employment_type", "Permanent"],
        ["company_name", "Telus"],
        ["location", "Lahore"],
        ["location_type", "Hybrid"],
        ["is_currently", "true"],
        ["start_date", "2021"],
        ["end_date", "2022"],
        ["description", ""],
      ]);
      console.log({ infoAdded: res });
    }
  };

  const updateWorkExpInfo = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await workExpContract.updateWorkExperience(nft, 0, [
        ["title", "Sr. Software Engineer"],
        ["employment_type", "Contractor"],
        ["company_name", "MobileLIVE"],
      ]);
      console.log({ workUpdated: res });
    }
  };

  const deleteWorkExpInfo = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const res = await workExpContract.deleteWorkExperience(nft, 0);
      console.log({ workdeleted: res });
    }
  };

  const getWorkExperienceByIndex = async () => {
    if (contractInstance) {
      const workExpContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider
      );

      // Call the method on the delegate contract
      const workExp = await workExpContract.getWorkExperienceByIndex(nft, 0);
      console.log({ rawData: workExp });
    }
  };

  const getAllProjectResources = async () => {
    if (contractInstance) {
      const projectResourceContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider
      );

      // Call the method on the delegate contract
      const project =
        await projectResourceContract.getAllProjectResourceRecords(1);
      // const project = await UserInfo.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000',userAddress);
      console.log({ rawDataProjectResources: project });
    }
  };

  const getAllProjects = async () => {
    if (contractInstance) {
      const projectDetailsContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider
      );

      // Call the method on the delegate contract
      const project = await projectDetailsContract.getAllProjectDetailsRecords(
        0
      );
      console.log({ rawDataProjectDetailss: project });
    }
  };

  const assignProjectResources = async () => {
    if (contractInstance) {
      const resourceContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const project = await resourceContract.addProjectResource(1, [
        ["resource_token", "0x0A3033f227E728F431377E43020e3c0540F58035"],
        ["resource_name", "Vik Bil"],
        ["allocation_type", "full_time"],
        ["allocated_by", "0"],
      ]);
      // const project = await UserInfo.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000',userAddress);
      console.log({ rawDataProjectResources: project });
    }
  };

  const deleteProjectResource = async () => {
    if (contractInstance) {
      const projectResourceContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const project = await projectResourceContract.deleteProjectResource(0, 1);
      console.log({ rawDataProjectResources: project });
    }
  };

  const addFile = async () => {
    if (contractInstance) {
      const projectResourceContract = new ethers.Contract(
        MLRegistryAddress,
        FullABI,
        contractInstance.provider.getSigner()
      );

      // Call the method on the delegate contract
      const project = await projectResourceContract.addFile(0, [
        ["fileName", "12.png"],
        ["userAddress", "0x6cbf9CbF0Ae5bafd2D7f702555E0123732f910a7"],
      ]);
      console.log({ rawDataProjectResources: project });
    }
  };

  return (
    <div>
      <h1>Your Role is {role}</h1>
      <h2>All Users Data</h2>
      <table>
        <thead>
          <tr>
            <th>Token ID</th>
            <th>Address</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Age</th>
            <th>Designation</th>
            <th>Department</th>
            <th>DOB</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allUsersData?.map((item, index) => (
            <tr key={index}>
              <td>{item.tokenId}</td>
              <td>{item.proxyAddress}</td>
              <td>
                {item.data.first_name} {item.data.last_name}
              </td>
              <td>{item.data.email}</td>
              <td>{item.data.role}</td>
              <td>{item.data.age}</td>
              <td>{item.data.designation}</td>
              <td>{item.data.department}</td>
              <td>{item.data.dob}</td>
              <td>{item.data.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <p>{JSON.stringify(allUsersData)}</p> */}
      <br />
      <br />
      <button onClick={getAllUsers}>Get All Users</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>User Data</h2>
      <p>{JSON.stringify(userData)}</p>
      <br />
      <br />
      <button onClick={getSingleUser}>Get Single User</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={addAttribute}>Add User Attribute</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={setProxyAddress}>Set Proxy Address</button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={minUser}>Min User</button>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={setUserInfo}>Set User Info</button>
      <br />
      <br />
      <h2>Work Exp Ops</h2>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={addWorkExpAttribute}>
        Add Work Experience Attribute
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={setWorkExperienceProxyAddress}>
        Set Proxy Address for Address
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={setWorkExpInfo}>Set Work Experience</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={updateWorkExpInfo}>Update Work Experience</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={getWorkExperienceByIndex}>
        Get Work Experience By Index
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={getWorkExperience}>Get Work Experience</button>
      <h4>Work Data of {userData?.name}</h4>
      <p>{JSON.stringify(workData)}</p>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={deleteWorkExpInfo}>Delete Work Experience</button>
      <EducationComponent
        contractInstance={contractInstance}
        MLRegistryAddress={MLRegistryAddress}
        nft={nft}
        connectedAddress={connectedAddress}
        userAddress={userAddress}
        userData={userData}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={assignProjectResources}>Add Project Resources</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={getAllProjects}>Get All Project</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={addFile}>Add File</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MyComponent;
