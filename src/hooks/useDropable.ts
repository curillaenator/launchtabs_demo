import { useControledDropdown, useAnimation, useCombineControledAnimated, DropableProps } from '@launch-ui/dropable';

const useDropable = (selectProps?: DropableProps) => {
  const controled = useControledDropdown();
  const animated = useAnimation();

  return useCombineControledAnimated({
    controled,
    animated,
    rest: selectProps || {},
  });
};

export { useDropable };
