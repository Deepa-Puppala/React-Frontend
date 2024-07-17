import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../EmployeeList/EmployeeList.scss";
import apiClient from "../../Services/apiClient";
import { Employee } from "../EmployeeList/EmployeeList";
import CustomButton from "../../Custom/Button";

interface Props {
  onEditClose?: () => void;
  isEdit: boolean;
  employee?: Employee | null;
  alter?: boolean;
  updateAlter?: () => void;
}
const EmployeeForm: React.FC<Props> = ({
  isEdit,
  onEditClose,
  employee,
  updateAlter,
}) => {
  const [name, setName] = useState("");
  const [employeetype, setemployeetype] = useState("");
  const [industry, setIndustry] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && employee) {
      // Populate form fields with employee data when in edit mode
      setName(employee.name);
      setemployeetype(employee.employeetype);
      setIndustry(employee.industry);
    }
  }, [isEdit, employee]);

  const handleDownload = () => {
    apiClient
      .get("/employee/generateReport", {
        responseType: "blob",
      })
      .then((response) => {
        console.log(response);
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );

        // Create an anchor element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.pdf"); // Specify the file name
        document.body.appendChild(link);
        link.click();

        // Clean up
        link?.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading report :", error);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare data to send
    const formData = {
      name: name,
      employeetype: employeetype,
      industry: industry,
    };

    if (!isEdit) {
      // POST request using Axios
      apiClient
        .post("/api/employees", formData)
        .then((response) => {
          console.log(response);
          alert("Data sent successfully");
          setName("");
          setemployeetype("");
          setIndustry("");

          updateAlter && updateAlter();
        })
        .catch((error) => {
          if (error.response.status == 403) {
            navigate("/login");
            console.error("Error sending data:", error);
          }
        });
    } else {
      apiClient
        .put(`/api/employees/${employee?.id}`, formData)
        .then((response) => {
          console.log(response);
          alert("Data updated successfully");
          setName("");
          setemployeetype("");
          setIndustry("");
          onEditClose && onEditClose();
          updateAlter && updateAlter();
        })
        .catch((error) => {
          if (error.response.status == 403) {
            navigate("/login");
            console.error("Error sending data:", error);
          }
        });
    }
  };

  const download = {
    display: "flex",
    justifyContent: "end",
  };

  return (
    <div>
      {isEdit ? (
        <h1>Edit Employee details</h1>
      ) : (
        <h1>Enter Employee details</h1>
      )}

      <div style={download}>
        <button className="btn float-right" onClick={handleDownload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-download"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
        </button>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="employeetype">employeetype:</label>
          <input
            type="employeetype"
            id="employeetype"
            value={employeetype}
            onChange={(e) => setemployeetype(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="btns">
          <CustomButton variant="primary" type="submit" size="sm">
            Submit
          </CustomButton>

          {isEdit && (
            <CustomButton
              onClick={onEditClose}
              variant="secondary"
              type="button"
            >
              Close
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
