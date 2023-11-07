// ---------------------------------- Get all Employees ------------------------------------

import axios from "axios";

//
export const getAllEmployees = async (pageNumber, LIMIT) => {
  // const response = await fetch('https://localhost:7071/api/Employee/allEmployees');
  const response = await fetch(
    `https://localhost:7071/api/Employee/allEmployees?PageNumber=${pageNumber}&PageSize=${LIMIT}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return await response.json();
};
// ---------------------------------- Get all Employees ------------------------------------

// ---------------------------------- Create Employee ------------------------------------
export const createEmployee = async (data) => {
  //console.log("employee API data is: ", data);
  //console.log("employee API data.empl is: ", data.empl);
  //console.log("employee API data.empl.Givenname is: ", data.empl.Givenname);
  console.log("employee API data is: ", data.empl);

  // const response = await fetch(
  //   "https://localhost:7071/api/Employee/createEmployee",
  //   {
  //     method: "POST",
  //     // headers: {
  //     //   // "Content-Type": "multipart/form-data",
  //     //   // "Content-Type": "application/json",
  //     // },
  //     body: JSON.stringify(data.empl),
  //     //body: data,
  //   }
  // );
  // if (!response.ok) {
  //   throw new Error(response.json().message);
  // }
  // return await response.json();

  try {
    const response = await axios.post(
      "https://localhost:7071/api/Employee/createEmployee",
      data.empl,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response is:", response);
    return response;
  } catch (error) {
    console.log("catched error status code:", error.response.status);
    throw new Error(error);
  }
};
// ---------------------------------- Create Employee ------------------------------------


// ---------------------------------- Get Languages ------------------------------------
export const getLanguages = async () => {
  const response = await fetch(
    `https://localhost:7071/api/LanguageСlassifier/allLanguageСlassifiers`
  );
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return await response.json();
};
// ---------------------------------- Get Languages ------------------------------------
