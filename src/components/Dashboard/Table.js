import React from 'react';

const Table = ({ employees, handleEdit, handleDelete, handleView }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Bucket Name</th>
            <th>Type</th>
            {/* <th>Email</th> */}
            {/* <th>Salary</th> */}
            <th>Date</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                {/* <td>{employee.email}</td> */}
                {/* <td>{formatter.format(employee.salary)}</td> */}
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleView(employee.id)}
                    className="button muted-button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
