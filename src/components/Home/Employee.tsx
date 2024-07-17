import React, { useState, useEffect, Suspense, lazy } from "react";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { useNavigate } from "react-router-dom";
interface Props {
  // Define props if needed
}

const EmployeeList = lazy(() => import("../EmployeeList/EmployeeList"));

const Employee: React.FC<Props> = () => {
  const [alter, setAlter] = useState<boolean>(false);
  const navigate = useNavigate();
  const updateAlter = () => {
    setAlter(!alter);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <EmployeeForm isEdit={false} updateAlter={updateAlter} />
          <Suspense fallback={<div>Loading...</div>}>
            <EmployeeList alter={alter} updateAlter={updateAlter} />
          </Suspense>
        </div>
      </div>
    </>
  );
};
export default Employee;
