import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { enumConfig } from "../config/config";

const CardInfo = () => {
  const [userInfoData, setUserInfoData] = useState({});
  const { id } = useParams();
  const openSocialLink = (url) => {
    const fallbackTimeout = setTimeout(() => {
      window.open(url, "_blank"); 
    }, 1000);
  
    window.location.href = url; 
    clearTimeout(fallbackTimeout);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const resposne = await fetch(
          `${enumConfig.BASE_URL}api/v1/qrcode/${id}`
        );

        const data = await resposne.json();

        if (data.success) {
          setUserInfoData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(userInfoData);
  return (
   
    <div className="flex justify-center items-center   shadow-lg  h-screen  " >
      <div className="w-full max-w-sm bg-[#00668c] text-[#f5f4f1] font-mono border   border-gray-200 relative  rounded-lg shadow-2xl shadow-slate-700 dark:bg-gray-800 dark:border-gray-700 p-5">
        <div className="flex flex-col items-center pb-10  ">
          <img
            className="w-36 h-36 mb-3 relative mt-[-25%] rounded-full object-cover shadow-lg  p-1  ring-2 ring-gray-300 dark:ring-gray-500"
            src={`${userInfoData?.fields?.profilePicture}`}
            alt="User image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {`${userInfoData?.fields?.name}  ${userInfoData?.fields?.surname}` }
          </h5>
          
          <span className="text-sm  dark:text-gray-400">
            {userInfoData?.fields?.workAddress}
          </span>
      
          <span className="text-sm  dark:text-gray-400">
            {userInfoData?.fields?.workName}
          </span>
          
        </div>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex justify-between flex-wrap">
            <p >Email </p>
            <p>{userInfoData?.fields?.email}</p>
          </div>
          <div className="flex justify-between flex-wrap">
            <p>Phone</p>
            <p>{userInfoData?.fields?.phone}</p>
          </div>
    {userInfoData?.fields?.local&&(

          <div className="grid grid-cols-2 ">
            <p>Local adress</p>
            <p>{userInfoData?.fields?.localAddress}</p>
          </div>

    )}
            <div className="flex  flex-wrap gap-7 justify-center mt-8">


          {userInfoData?.fields?.socialNetworks?.map((network, index) => (
            
              <div className="flex gap-2 items-center cursor-pointer " 
              onClick={()=>openSocialLink(network.url)}
              >
                <div className="w-10  h-10 min-w-10 min-h-10 rounded-full">
                  <img
                    className="rounded-full object-cover shadow-lg  p-1  ring-2 ring-gray-300 dark:ring-gray-500"
                    src={network.icon}
                    alt=""
                  />
                </div>
                <p className="capitalize hover:text-gray-500 transition-all " >
                  {network.name}
                </p>
              </div>
          ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
