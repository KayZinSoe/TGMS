import Home from '../pages/home/Home'
import Details from '../pages/details/Details'
import Placeholder from '../pages/placeholder/Placeholder'
import NotFound from '../pages/notfound/NotFound'
import { LANDING, TGMS } from '../constants/routes'
import VesselList from '../pages/home/component/VesselList';


import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: LANDING,
    element: <Home />,
  },
  // TGMS flow routes (using Placeholder components for now)
  {
    path: TGMS.ROOT,
    element: <Placeholder />, // replace with actual component
  },
  {
    path: '/vessels',
    element: <VesselList />,
  },
  {
    path: `${TGMS.ROOT}/${TGMS.INPUT_COLLECTION}`,
    element: <Placeholder />, // replace with InputCollection component
  },
  {
    path: `${TGMS.ROOT}/${TGMS.GENERATE_STORIES}`,
    element: <Placeholder />, // replace with GenerateStories component
  },
  {
    path: `${TGMS.ROOT}/${TGMS.REVIEW_EDIT}`,
    element: <Placeholder />, // replace with ReviewEdit component
  },
  {
    path: `${TGMS.ROOT}/${TGMS.EXPORT}`,
    element: <Placeholder />, // replace with Export component
  },
  {
    path: '/details',
    element: <Details />,
  },
  // Catch‑all route for undefined paths
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router