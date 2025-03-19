import { HierarchyTree } from '@launch-ui/hierarchy';

interface LaunchSpaceProps {
  spaceCode: string;
  createdAt: number;
  createdBy: string;
  name: string;
  hierarchy?: HierarchyTree;
}

export type { LaunchSpaceProps };
