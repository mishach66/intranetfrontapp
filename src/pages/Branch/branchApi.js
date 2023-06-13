// ---------------------------------- Get all Cities -----------------------------------
export const getAllCities = async () => {
    const response = await fetch('https://localhost:7071/api/City/allCities');
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    return await response.json()
}
// ---------------------------------- Get all Cities -----------------------------------


// ---------------------------------- Create Branch ------------------------------------
export const createBranch = async (data) => {
  const response = await fetch('https://localhost:7071/api/Branch/createBranch', {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})

if(!response.ok) {
  throw new Error(response.json().message)
}

return await response.json()
}
// ---------------------------------- Create Branch ------------------------------------


// ---------------------------------- Branch List Pagination----------------------------
export const getPagedBranchList = async (pageNumber) => {
  const response = await fetch(`https://localhost:7071/api/Branch/allBranches?PageNumber=${pageNumber}`);
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return await response.json()
}
// ---------------------------------- Branch List Pagination----------------------------

// ---------------------------------- Edit Branch ------------------------------------
export const editBranch = async (data) => {
  console.log('api data is ', data)
  const response = await fetch(`https://localhost:7071/api/Branch/editBranch/${data.id}`, {
  method: "PUT",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})

if(!response.ok) {
  throw new Error(response.json().message)
}

return await response.json()
}
// ---------------------------------- Edit Branch ------------------------------------
