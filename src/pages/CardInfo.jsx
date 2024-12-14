import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { enumConfig } from "../config/config";
import { DotLoader } from "react-spinners";

const CardInfo = () => {
  const [userInfoData, setUserInfoData] = useState({});
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(userInfoData);
  return (
    <>
      <div className="flex justify-center  relative items-center  font-sans   h-screen  ">
        {loading ? (
          <DotLoader
            color="#6a5b5b"
            cssOverride={{}}
            loading
            speedMultiplier={1}
          />
        ) : (
          <div className="max-w-[450px] w-full min-w-60 flex flex-col  mt-[30%] md:mt-[20%] gap-8 p-5 ">
            {/* Card header */}
            <div className="w-full max-w-sm bg-[white]      relative  rounded-lg   ">
              <div className="flex flex-col items-center pb-7 bg-white rounded-lg customCardShadow ">
                <img
                  className="w-32 h-32 mb-3 relative mt-[-25%] rounded-full object-cover shadow-lg  p-1  ring-2 ring-gray-300 dark:ring-gray-500"
                  src={`${userInfoData?.fields?.profilePicture}`}
                  alt="User image"
                />

                <div className="flex flex-col items-center mt-8">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                    {`${userInfoData?.fields?.name}  ${userInfoData?.fields?.surname}`}
                  </h5>

                  <span className="text-sm  ">
                    {userInfoData?.fields?.workAddress}
                  </span>
                </div>
              </div>
            </div>
            {/* Card header end */}

            <div className="flex flex-col gap-3">
              <h2 className="text-gray-400">Information</h2>

              <div className="ps-3">
                <p className="font-semibold">
                  Mobile: <span>{userInfoData?.fields?.phone}</span>
                </p>
                <p className="font-semibold">
                  Email: <span>{userInfoData?.fields?.email}</span>
                </p>
              </div>
            </div>
            {/* Social networks section */}
            <div className=" flex flex-col gap-4">
              <h2 className="text-gray-400">Social profiles</h2>

              <div className="grid grid-cols-4 items-center justify-center ps-3 gap-2">
                {userInfoData?.fields?.socialNetworks?.map((network, index) => (
                  <div
                    className="flex flex-col items-center gap-2 mt-3 "
                    key={index}
                  >
                    <div
                      className="  justify-center cursor-pointer items-center p-[10px]    md:h-20 md:max-h-20   rounded-md bg-slate-300"
                      onClick={() => openSocialLink(network.url)}
                    >
                      <img
                        src={network?.icon}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <p className="capitalize text-sm">{network.name}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Social network section end */}
          </div>
        )}
      </div>
    </>
  );
};

export default CardInfo;
