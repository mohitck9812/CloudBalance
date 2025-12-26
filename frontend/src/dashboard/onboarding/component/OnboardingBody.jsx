import React from "react";
import IndexPointer from "./IndexPointer";
import { Data } from "./CustomerTrustPolicy.js";

const OnboardingBody = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Create an IAM Role</h1>
        <h3 className="text-sm">Create an IAM Role by following these steps</h3>

        <div className="border rounded-xl p-7.5 bg-white shadow-2xl flex flex-col gap-5 p">
          <p className="flex gap-4">
            <IndexPointer num={1} />
            <p className="flex">
              Log into AWS account & &nbsp;<nav> Create an IAM Role.</nav>
            </p>
          </p>
          <p className="flex flex-col gap-4">
            <p className="flex gap-4">
              <IndexPointer num={2} />
              In theTrusted entity typesection, selectCustom trust
              policy.Replace the prefilled policy with the policy provided below
              -
            </p>
            <div className=" ">
              <pre className="border flex text-sm text-primary border-black/20 p-2 rounded-2xl h-50 overflow-auto relative justify-between">
                {Data}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="w-4 h-4"
                  className="border border-black/20 rounded-md sticky top-0 right-0 h-9 p-2 hover:bg-primary hover:text-white transition delay-50 ease-in-out "
                  fill="currentColor"
                >
                  <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
              </pre>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBody;
