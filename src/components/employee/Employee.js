import React, { forwardRef } from "react";

// export const Employee = ({ id, givenname, surname, index }) => {
//   let isEven = index % 2 === 0;

//   return (
//     <>
// <div
//   className="flex items-center justify-between"
//   style={{ backgroundColor: isEven && "#F5F6F7" }}
// >
//   <div className="flex ml-2">
//     <div className="m-1">{givenname}</div>
//     <div className="m-1">{surname}</div>
//   </div>

//   <div className="mr-2">
//     <img
//       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGfa9cIG5USunpHOXJBzKEkfkQ2wAmmdJPS7C6LSfr_oJg_vHYf2NeJHJJ02OKC3wAWM&usqp=CAU"
//       className="border-0 rounded-full"
//       width="72"
//       height="auto"
//       alt=""
//     />
//   </div>
// </div>
//     </>
//   );
// };

export const Employee = forwardRef(({ employee, index }, ref) => {
  console.log("index is: ", index);
  let isEven = index % 2 === 0;

  const employeeContent = (
    <>
      <div
        className="flex items-center justify-between"
        style={{ backgroundColor: isEven && "#F5F6F7" }}
      >
        <div className="flex ml-2">
          <div className="m-1">{employee.givenname}</div>
          <div className="m-1">{employee.surname}</div>
        </div>

        <div className="mr-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGfa9cIG5USunpHOXJBzKEkfkQ2wAmmdJPS7C6LSfr_oJg_vHYf2NeJHJJ02OKC3wAWM&usqp=CAU"
            className="border-0 rounded-full"
            width="72"
            height="auto"
            alt=""
          />
        </div>
      </div>
    </>
  );

  const content = ref ? (
    <article className="article" ref={ref} style={{ backgroundColor: isEven && "#F5F6F7" }}>
      {employeeContent}
    </article>
  ) : (
    <article className="article">{employeeContent}</article>
  );
  return content;
});
