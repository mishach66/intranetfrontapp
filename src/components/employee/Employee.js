import React, { forwardRef } from "react";

export const Employee = forwardRef(({ employee, index }, ref) => {
  //console.log("employee is: ", employee);
  let isEven = index % 2 === 0;

  const employeeContent = (
    <>
      <div
        className="flex items-center justify-between h-24"
        style={{ backgroundColor: isEven && "#F5F6F7" }}
      >
        <div>
          <div className="ml-3 font-bold">
            {employee.givenname} {employee.surname}
          </div>
          <div className="ml-3">{employee.position}</div>
        </div>

        <div className="mr-2">
          <img
            src={`${employee.imageName}`}
            alt="img" 
            className="border-0 rounded-full mr-2"
            width="72"
            height="auto"
          />
        </div>
      </div>
    </>
  );

  const content = ref ? (
    <article className="article" ref={ref}>
      {employeeContent}
    </article>
  ) : (
    <article className="article">{employeeContent}</article>
  );
  return content;
});
