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


// ---------------------------------- All Branch List -------------------------------
export const getBranchList = async () => {
  const response = await fetch('https://localhost:7071/api/Branch/allBranchesWithoutPagination');
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return await response.json()
}
// ---------------------------------- All Branch List -------------------------------


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


// ---------------------------------- Remove Branch ------------------------------------
export const removeBranch = async (id) => {
  const response = await fetch(`https://localhost:7071/api/Branch/deleteBranch/${id}`, {method: "DELETE"})
        
  if(!response.ok) {
    throw new Error(response.json().message)
  }

  return true
}
// ---------------------------------- Remove Branch ------------------------------------

