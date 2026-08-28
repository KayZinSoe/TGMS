import { RouteType } from "../types/routes";

export const LANDING = "/";
export const TGMS = {
  ROOT: '/tgms',
  INPUT_COLLECTION: 'input-collection',
  GENERATE_STORIES: 'generate-stories',
  REVIEW_EDIT: 'review-edit',
  EXPORT: 'export',
};

// For Route stacking context (eg. Breadcrumbs)
export const routes: RouteType = {
  label: "Root",
  to: LANDING,
  children: [
    {
      label: "Home",
      to: LANDING,
    },
    {
      label: "Input Collection",
      to: `${TGMS.ROOT}/${TGMS.INPUT_COLLECTION}`
    },
    {
      label: "Generate Stories and Workflows",
      to: `${TGMS.ROOT}/${TGMS.GENERATE_STORIES}`
    },
    {
      label: "Review & Edit",
      to: `${TGMS.ROOT}/${TGMS.REVIEW_EDIT}`
    },
    {
      label: "Export",
      to: `${TGMS.ROOT}/${TGMS.EXPORT}`
    }
  ]
};

