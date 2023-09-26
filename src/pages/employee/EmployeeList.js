import React, { useEffect } from "react";
import { Employee } from "../../components/employee";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getAllEmployees } from "../../api/employeeapi";
import * as Loader from "react-loader-spinner";
import { useInView } from "react-intersection-observer";
import {
  Card,
  Input,
  Checkbox,
  Button as MTButton,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export const EmployeeList = () => {
  const { ref, inView } = useInView();
  const LIMIT = 10;

  const queryClient = useQueryClient();

  // ----------------------- INFINITE QUERY START ---------------------
  const {
    data: infiniteQueryData,
    isSuccess,
    isError: infiniteQueryIsError,
    error: infiniteQueryError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: infiniteQueryDataisLoading,
  } = useInfiniteQuery({
    queryKey: ["allemployees"],
    queryFn: ({ pageParam = 1 }) => getAllEmployees(pageParam, LIMIT),
    //...options,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === LIMIT ? allPages.length + 1 : undefined;
      //console.log("nextPage", nextPage);
      return nextPage;
    },
  });

  const content =
    isSuccess &&
    infiniteQueryData.pages.map((page) =>
      page.map((employee, i) => {
        //console.log("ინდექსი: ", i, "გვარი: ", employee.surname)
        //if (page.length === i + 1) {
        if (page.length >= 3 && page.length - 3 === i) {
          return <Employee ref={ref} key={employee.id} employee={employee} index={i} />;
        }
        return <Employee key={employee.id} employee={employee} index={i} />;
      })
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (infiniteQueryDataisLoading) {
    return (
      <div className="flex justify-center mt-16">
        <Loader.ThreeCircles color="red" height="100" width="100" />
      </div>
    );
  }
  if (infiniteQueryIsError) {
    return <span>Error: {infiniteQueryError.message}</span>;
  }
  // ----------------------- INFINITE QUERY END ---------------------

  return (
    <>
      <div>
        <div className="mx-auto w-4/5 ">
          <Card color="transparent" shadow={false} className="mt-2">
            <Typography variant="h4" color="blue-gray" className="mb-3">
              თანამშრომლების სია
            </Typography>
            {content}
          </Card>
        </div>
      </div>
    </>
  );
};
