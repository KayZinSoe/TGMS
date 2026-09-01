import React, { useState } from 'react';
import './VesselList.css';
import { Button, Stepper, TextField } from 'mpa-design-system';

type Vessel = {
  name: string;
  imo?: string;
  captain?: string;
  crewCount?: string;
  cargoType?: string;
  cargoWeight?: string;
};

const vesselSteps = [
  { label: 'Vessel Details' },
  { label: 'Crew' },
  { label: 'Cargo' },
];

export default function VesselList() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [name, setName] = useState('');
  const [imo, setImo] = useState('');
  const [captain, setCaptain] = useState('');
  const [crewCount, setCrewCount] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const resetVesselForm = () => {
    setName('');
    setImo('');
    setCaptain('');
    setCrewCount('');
    setCargoType('');
    setCargoWeight('');
    setCurrentStep(0);
  };

  const addVessel = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < vesselSteps.length - 1) {
      if (!name.trim()) return;
      setCurrentStep((prev) => prev + 1);
      return;
    }

    if (!name.trim()) return;

    const newVessel: Vessel = {
      name: name.trim(),
      imo: imo.trim() || undefined,
      captain: captain.trim() || undefined,
      crewCount: crewCount.trim() || undefined,
      cargoType: cargoType.trim() || undefined,
      cargoWeight: cargoWeight.trim() || undefined,
    };

    setVessels((prev) => [...prev, newVessel]);
    resetVesselForm();
  };

  const removeVessel = (idx: number) => {
    setVessels((prev) => prev.filter((_v, i) => i !== idx));
  };

  const [message, setMessage] = useState('');
  const [imoNumber, setImoNumber] = useState('');
  const [vessel, setVessel] = useState<Vessel | null>(null);
  const [error, setError] = useState('');
  

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

      <div className="stepper-wrapper">
        <Stepper
          id="vessel-registration-stepper"
          steps={vesselSteps}
          activeStep={currentStep}
          colour="primary"
        />
      </div>

      <form onSubmit={addVessel} className="vessel-form vessel-form-stepper">
        {currentStep === 0 && (
          <div className="step-fields">
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
          </div>
        )}

        {currentStep === 1 && (
          <div className="step-fields">
            <TextField
              type="text"
              placeholder="Captain name"
              value={captain}
              onChange={(e) => setCaptain(e.target.value)}
            />
            <TextField
              type="text"
              placeholder="Crew count"
              value={crewCount}
              onChange={(e) => setCrewCount(e.target.value)}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-fields">
            <TextField
              type="text"
              placeholder="Cargo type"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
            />
            <TextField
              type="text"
              placeholder="Cargo weight"
              value={cargoWeight}
              onChange={(e) => setCargoWeight(e.target.value)}
            />
          </div>
        )}

        <div className="step-actions">
          {currentStep > 0 && (
            <Button
              type="button"
              id="prev-vessel-step"
              label="Back"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            />
          )}
          <Button
            type="submit"
            id="add-vessel-btn"
            label={currentStep === vesselSteps.length - 1 ? 'Save Vessel' : 'Next'}
          />
        </div>
      </form>

      <div
        dangerouslySetInnerHTML={{
          __html: message
        }}
      />

    </div>
  );
}
