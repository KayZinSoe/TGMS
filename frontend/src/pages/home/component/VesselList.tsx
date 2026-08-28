import React, { useEffect, useState } from 'react';
import './VesselList.css';
import { Button, TextField } from 'mpa-design-system';

type Vessel = {
  name: string;
  imo?: string;
};

export default function VesselList() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [name, setName] = useState('');
  const [imo, setImo] = useState('');

  const addVessel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newVessel: Vessel = { name: name.trim(), imo: imo.trim() || undefined };
    setVessels((prev) => [...prev, newVessel]);
    setName('');
    setImo('');
  };

  const removeVessel = (idx: number) => {
    setVessels((prev) => prev.filter((_v, i) => i !== idx));
  };

  const [message, setMessage] = useState('');
  const [imoNumber, setImoNumber] = useState('');
  const [vessel, setVessel] = useState<Vessel | null>(null);
  const [error, setError] = useState('');
  

  // const loadVesselMessage = () => {
  //   fetch("http://localhost:8080/api/vessels/message")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMessage(data.message);
  //     });
  //   console.log("kay");
  // };

  // useEffect(() => {
  //   loadVesselMessage();
  // }, []);


  const getVessel = async () => {
  try {
    const normalizedImo = imoNumber.trim();

    if (!normalizedImo) {
      setError('Enter an IMO number');
      return;
    }

    setError('');
    setVessel(null);

    const response = await fetch(
      `http://localhost:8080/api/vessels/${encodeURIComponent(normalizedImo)}`
    );

    if (response.status === 404) {
      alert('Vessel not found');
      setError('Vessel not found');
      return;
    }

    if (!response.ok) {
      throw new Error('Request failed');
    }

    setVessel(await response.json());
  } catch {
    setError('Failed to retrieve vessel');
  } finally {
    setImoNumber('');
    console.log('Vessel Test OK');
  }
};


  return (
    <div className="vessel-page">
      <h2>Vessel Registry</h2>

      {/* Add form */}
      <form onSubmit={addVessel} className="vessel-form">
        <TextField
          type="text"
          placeholder="Vessel name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          type="text"
          placeholder="IMO (optional)"
          value={imo}
          onChange={(e) => setImo(e.target.value)}
        />
        {/* Use a static label for the add button */}
        <Button type="submit" id="add-vessel-btn" label='Adding Vessel'></Button>
      </form>

      {vessels.length > 0 ? (
        <ul className="vessel-list">
          {vessels.map((v, i) => (
            <li key={i}>
              <span>{v.name}</span>
              {v.imo && <small>IMO: {v.imo}</small>}
              <Button onClick={() => removeVessel(i)} size="small" id={''} label='x'></Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vessels added yet.</p>
      )}
      {/* <div>
        <Button onClick={loadVesselMessage} id={''} label='Load Vessel'></Button>
      </div> */}

      <div
        dangerouslySetInnerHTML={{
          __html: message
        }}
      />

      

      <h2>Vessel Search</h2>
      <TextField
        value={imoNumber}
        onChange={(e) => setImoNumber(e.target.value)}
        placeholder="Enter IMO number" type={'text'} 
        />


      <Button onClick={getVessel} id={''} label='Get Vessel'></Button>

    </div>
  );
}
