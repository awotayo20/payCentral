import React, { useEffect, useState } from "react";
import Account_typePage from "./SignUpPages/Account_type";
import JobStatusPage from "./SignUpPages/Job_status";
import IndustryPage from "./SignUpPages/Industry";
import PersonalDetailsPage from "./SignUpPages/PersonalDetails";
import SignupHeader from "./SignUpPages/SignupHeader";
import axios from "axios";

export default function SignUpForm() {
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({
    account_type: "",
    job_status: "",
    employment_type: "",
    job_role: "",
    country: "",
    industry_type: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    agree: false,
  });


  const titles = ["account_type", "job_Status", "industry", "personal_details"];

  const pageDisplay = () => {
    if (page == 0) {
      return <Account_typePage details={details} setDetails={setDetails} />;
    } else if (page == 1) {
      return <JobStatusPage details={details} setDetails={setDetails} />;
    } else if (page == 2) {
      return <IndustryPage details={details} setData={setDetails} />;
    } else {
      return <PersonalDetailsPage details={details} setDetails={setDetails} />;
    }
  };

  // api request
  let data = JSON.stringify({
    account_type: `${details.account_type}`,
    job_status: `${details.job_status}`,
    job_role: `${details.job_role}`,
    employment_type: `${details.employment_type}`,
    country: `${details.country}`,
    industry: `${details.industry}`,
    first_name: `${details.first_name}`,
    last_name: `${details.last_name}`,
    email: `${details.email}`,
    password: `${details.password}`,
    agree: details.agree  
  });

  let config = {
    method: 'POST',
    url: 'https://davidinmichael.pythonanywhere.com/account/register/',
    headers: { 
      'accept': 'application/json', 
      'Content-Type': 'application/json', 
      'X-CSRFToken': 'AleZdqHdzjgYO9ZXdzBedZxkQDwrEe9pMqyPk3oAYJVAhV9EWJTZ5N3c6pmsgnZE'
    },
    data : data
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(data)

    try {
      const response = await axios.post('https://davidinmichael.pythonanywhere.com/account/register/', {data:data});
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  console.log(details.industry)
  console.log(details.employment_type)

  return (
    <>
      <div className="w-[1024px] mx-auto">
        <SignupHeader />

        <form>
          <div className="w-[608px] mx-auto">{pageDisplay()}</div>

          {page == titles.length - 1 ? (
            <div className="w-[660px] mx-auto flex my-[24px] justify-center">
              <button
                onClick={handleSubmit}
                className="bg-black w-[608px] text-[20px] py-[8px] text-white ml-[50px]"
              >
                Join PayCentral
              </button>
            </div>
          ) : (
            <div className="w-[560px] mx-auto flex justify-between my-[24px]">
              <button className="w-[117px]"> </button>

              <button
                onClick={(e) => {
                  e.preventDefault();

                  if (page == titles.length - 1) {
                    alert("submitted");
                  } else {
                    setPage((currentPage) => currentPage + 1);
                  }
                }}
                className="w-[128px] h-[40px] bg-[#151515] flex justify-center items-center cursor-pointer text-white text-[20px] font-[500] text-center"
              >
                Next
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
