/* eslint-disable react-hooks/exhaustive-deps */
// EmployeeList.jsx
import React, { useCallback, useEffect, useState } from "react";

import apiClient from "../../Services/apiClient";
import EditEmployee from "../EditEmployee/EditEmployee";
export interface Employee {
  id?: string;
  name: string;
  employeetype: string;
  industry: string;
}

interface EmployeeList {
  employees?: Employee[];
}

interface Props {
  onEdit?: (emp: Employee) => void;
  updateAlter?: () => void;
  alter?: boolean;
}
const EmployeeList: React.FC<Props> = ({ updateAlter, alter }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEmp, setSelectedEmployee] = useState<Employee>({
    id: "",
    name: "",
    employeetype: "",
    industry: "",
  });
  const [employeesList, setEmployeesList] = useState<EmployeeList | null>({
    employees: [],
  });

  useEffect(() => {
    apiClient
      .get("/api/getAll")
      .then((response) => {
        console.log("coming ", response);
        setEmployeesList(() => ({
          employees: [...response.data],
        }));
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleEdit = (emp: Employee) => {
    console.log("set ", emp);
    setShowModal(true);
    setSelectedEmployee(emp);
    updateAlter && updateAlter();
  };
  const handleDelete = (emp: Employee) => {
    if (confirm("Are you sure?")) {
      apiClient
        .delete(`/api/employees/${emp.id}`)
        .then((response) => {
          if (response.data.Status === "200") {
            alert(response.data.message);
            updateAlter && updateAlter();
          } else {
            alert("no record found");
          }
        })
        .catch((error) => console.error("Error fetching employees:", error));
    }
  };

  return (
    <>
      {!showModal && (
        <div className="list">
          <h2>Employee List</h2>
          <div className="heading">
            <b>Name</b>
            <b>Employement Type</b>
            <b>Industry</b>
          </div>
          <div>
            {employeesList?.employees?.map((employee: Employee) => (
              <li key={employee.id}>
                <div className="box">
                  <div className="details">
                    <span>{employee.name}</span>
                    <span> {employee.employeetype}</span>
                    <span>{employee.industry}</span>
                  </div>
                  <div className="btns">
                    <button
                      className="btn"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <EditEmployee
          employee={selectedEmp}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default EmployeeList;
