import React, {useState} from "react"
import { Button, IconButton } from "@material-tailwind/react"
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useQuery, QueryClient, useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPagedBranchList } from "../pages/Branch/branchApi"
import { Branch } from './Branch'

export default function Pagination() {
  const [active, setActive] = useState(1);

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["pagedbranchlist", active], 
    queryFn: () => getPagedBranchList(active), 
    keepPreviousData: true
   })

  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "red" : "blue-gray",
      onClick: () => {
        setActive(index)
      },
    })
 
  const next = () => {
    if (active === 5) return
 
    setActive(active + 1)
  }
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1)
  }
 
  return (
    <div>
      <div className="h-[380px]">
      {data?.map(({fullAddress, id}) => (
        <Branch fullAddress={fullAddress} key={id} id={id}  />
      ))}
      </div>

      <div className="flex items-center gap-4 mt-8">

        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          {/* <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton> */}
        </div>

        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === 5}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>

      </div>
    </div>

  );
}