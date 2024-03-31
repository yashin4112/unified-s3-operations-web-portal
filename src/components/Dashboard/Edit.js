import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ buckets, selectedBucket, setBuckets, setIsEditing }) => {
  const { id } = selectedBucket;

  const [bucketName, setBucketName] = useState(selectedBucket.bucketName);
  const [region, setRegion] = useState(selectedBucket.region);
  const [date, setDate] = useState(selectedBucket.date);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!bucketName || !region || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedBucket = {
      id,
      bucketName,
      region,
      date,
    };

    try {
      // Send a request to update the bucket details
      const response = await axios.put(`/api/buckets/${id}`, updatedBucket);

      // Check if update was successful
      if (response.data.success) {
        const updatedBuckets = buckets.map((bucket) =>
          bucket.id === id ? updatedBucket : bucket
        );

        localStorage.setItem('buckets_data', JSON.stringify(updatedBuckets));
        setBuckets(updatedBuckets);
        setIsEditing(false);

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Bucket "${updatedBucket.bucketName}" has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update bucket. Please try again later.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update bucket. Please try again later.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Bucket</h1>
        <label htmlFor="bucketName">Bucket Name</label>
        <input
          id="bucketName"
          type="text"
          name="bucketName"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
        />
        <label htmlFor="region">Region</label>
        <input
          id="region"
          type="text"
          name="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
