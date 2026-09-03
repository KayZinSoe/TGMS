import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'mpa-design-system'
import { fetchItems } from '../../api'
import MainLayout from '../../layouts/MainLayout';
import CatchBallGame from './component/CatchBallGame'; // added import
import VesselList from './component/VesselList';
import WorkflowDiagramCard from '../../components/workflowDiagramCard/WorkflowDiagramCard';



export default function Home({ onNavigate }: { onNavigate?: (to: string) => void }) {
  const navigate = useNavigate()
  const handleOpenDetails = () => navigate('/details')
  type Item = { id: number; name: string; description?: string }
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetchItems().then(setItems)
  }, [])

  return (
    <MainLayout>

      {/* <CatchBallGame />          */}
      <VesselList />
    

    </MainLayout>
  )
}