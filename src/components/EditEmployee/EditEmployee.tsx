import React from "react";

import "./EditEmployee.scss";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import Employee from "../EmployeeList/EmployeeList";

interface EditEmployeeProps {
  onClose: () => void;
  employee: Employee | null;
  updateAlter: () => void;
}
const EditEmployee: React.FC<EditEmployeeProps> = ({
  onClose,
  employee,
  updateAlter,
}) => {
  return (
    <div className="container">
      <div className="box">
        <EmployeeForm
          isEdit={true}
          updateAlter={updateAlter}
          onEditClose={onClose}
          employee={employee}
        />
      </div>
    </div>
  );
};

export default EditEmployee;
