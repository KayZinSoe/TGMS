import { CrumbType } from "mpa-design-system";

export interface RouteType extends CrumbType {
  children?: RouteType[];
}
