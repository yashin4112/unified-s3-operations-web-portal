import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ buckets, setBuckets, setIsAdding }) => {
  const [bucketName, setBucketName] = useState('');
  const [region, setRegion] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!bucketName || !region || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = buckets.length + 1;
    const newBucket = {
      id,
      bucketName,
      region,
      date,
    };

    setBuckets([...buckets, newBucket]);
    localStorage.setItem('buckets_data', JSON.stringify([...buckets, newBucket]));
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Bucket "${bucketName}" has been added successfully.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Dropdown options for regions
  const regionOptions = [
    'us-east-1',
    'us-west-1',
    'us-west-2',
    // Add more regions as needed
  ];

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Bucket</h1>
        <label htmlFor="bucketName">Bucket Name</label>
        <input
          id="bucketName"
          type="text"
          name="bucketName"
          value={bucketName}
          onChange={e => setBucketName(e.target.value)}
        />
        <label htmlFor="region">Region</label>
        <select
          id="region"
          name="region"
          value={region}
          onChange={e => setRegion(e.target.value)}
        >
          <option value="">Select Region</option>
          {regionOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
