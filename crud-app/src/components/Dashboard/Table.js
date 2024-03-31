import React from 'react';

const Table = ({ buckets, handleEdit, handleDelete, handleView }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Bucket Name</th>
            <th>Region</th> 
            <th>Date</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {buckets.length > 0 ? (
            buckets.map((bucket, index) => (
              <tr key={bucket.id}>
                <td>{index + 1}</td>
                <td>{bucket.bucketName}</td>
                <td>{bucket.region}</td> 
                <td>{bucket.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(bucket.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(bucket.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleView(bucket.id)}
                    className="button muted-button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Buckets</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
