import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for making HTTP requests

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = ({ setIsAuthenticated }) => {
  const [buckets, setBuckets] = useState([]); // Initialize buckets state with an empty array
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch buckets data from MongoDB when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/buckets'); // Replace with your backend API endpoint
        setBuckets(response.data); // Set buckets state with the fetched data
      } catch (error) {
        console.error('Error fetching buckets:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchData(); // Call fetchData function
  }, []);

  const handleEdit = (id) => {
    const bucket = buckets.find((bucket) => bucket.id === id);
    setSelectedBucket(bucket);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.delete(`/api/buckets/${id}`); // Replace with your backend API endpoint
          const updatedBuckets = buckets.filter((bucket) => bucket.id !== id);
          setBuckets(updatedBuckets);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `Bucket has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error('Error deleting bucket:', error);
          // Handle error (e.g., show error message)
        }
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            buckets={buckets}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          setBuckets={setBuckets}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedBucket={selectedBucket}
          setBuckets={setBuckets}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
