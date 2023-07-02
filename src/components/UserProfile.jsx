import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { useNavigate } from "react-router";

const UserProfile = ({handleLogout}) => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
 
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        {localStorage.getItem("userId") && (
          <>
            <img
              className="rounded-full h-24 w-24"
              src={avatar}
              alt="user-profile"
            />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200">
                {" "}
                {localStorage.getItem("userName")}{" "}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                Volunteer{" "}
              </p>
              <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                {" "}
                {localStorage.getItem("userEmail")}{" "}
              </p>
            </div>{" "}
          </>
        )}
      </div>
      <div></div>
      <div className="mt-5">
        {!localStorage.getItem("userRole") ? (
          <div className="ml-auto flex gap-4">
            <Button
              color="white"
              bgColor={currentColor}
              text="Login"
              borderRadius="10px"
              width="full"
              onClick={() => {
                navigate("/login");
              }}
            />
            <Button
              color="white"
              bgColor={currentColor}
              text="Signup"
              borderRadius="10px"
              width="full"
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        ) : (
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
            onClick={()=>{handleLogout()}}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
