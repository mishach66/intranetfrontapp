import React, {useState} from "react"
import { Button, IconButton } from "@material-tailwind/react"
import { ArrowRightIcon, ArrowLeftIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
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
        if (active > (data?.count/data?.pageSize) + 1) return
        setActive(index)
      },
    })
 
  const next = () => {
    if (active === data?.count/data?.pageSize) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1)
  }

  const end = () => {
        
    setActive(Math.ceil(data?.count/data?.pageSize))
  }

  const beginning = () => {
 
    setActive(1)
  }
 
  return (
    <div>
      <div className="h-[380px]">
      {data?.branches.map(({fullAddress, id, address, cityId }) => (
        <Branch fullAddress={fullAddress} key={id} id={id} address={address} cityId={cityId}/>
      ))}
      </div>
        
      <div className="flex items-center  mt-8">

        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center "
          onClick={beginning}
          disabled={active === 1}
        >
          <ChevronDoubleLeftIcon strokeWidth={2} className="h-4 w-4" /> 
          {/* Begining */}
        </Button>

        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center "
          onClick={prev}
          disabled={active === 1}
        >
          <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" /> 
          {/* Previous */}
        </Button>

        <div className="flex items-center gap-1">

          {
            active <= 3 &&
            <>
              <IconButton {...getItemProps(1)}>1</IconButton>
              <IconButton {...getItemProps(2)}>2</IconButton>
              <IconButton {...getItemProps(3)}>3</IconButton>
              . . .
              <IconButton {...getItemProps(Math.ceil(data?.count/data?.pageSize))}>{ Math.ceil(data?.count/data?.pageSize) }</IconButton>
            </>
          }
          {
            active > 3 && active < (Math.ceil(data?.count/data?.pageSize)) &&
            <>
              <IconButton {...getItemProps(active - 2)}>{active - 2}</IconButton>
              <IconButton {...getItemProps(active - 1)}>{active - 1}</IconButton>
              <IconButton {...getItemProps(active)}>{active}</IconButton>
              . . .
              <IconButton {...getItemProps(Math.ceil(data?.count/data?.pageSize))}>{ Math.ceil(data?.count/data?.pageSize) }</IconButton>
            </>
          }
          {
            active === (Math.ceil(data?.count/data?.pageSize)) &&
            <>
              <IconButton {...getItemProps(active - 2)}>{active - 2}</IconButton>
              <IconButton {...getItemProps(active - 1)}>{active - 1}</IconButton>
              <IconButton {...getItemProps(active)}>{active}</IconButton>
            </>
          }

        </div>

        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center "
          onClick={next}
          disabled={active >= data?.count/data?.pageSize}
        >
          {/* Next */}
          <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>

        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center "
          onClick={end}
          disabled={active >= data?.count/data?.pageSize}
        >
          {/* End */}
          <ChevronDoubleRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>

      </div>
    </div>

  );
}
