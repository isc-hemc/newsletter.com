import { cx } from '@emotion/css';
import { clomp } from 'clomp';
import fp from 'lodash/fp';
import { Children, ReactElement, useMemo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { IPropsOf } from 'types.d';

const Box = clomp.div`
  flex
  h-64
  w-full
  flex-col
  items-center
  justify-center
  rounded-xl
  border-2
  border-dashed
  border-gray-200
  bg-white
  p-4
`;

export interface IDnDContainerProps extends IPropsOf<'div'> {
  /**
   * Component children, we need a way to communicate to the parent component
   * when ever the drag and drop box is active (when it has a draggable element
   * positioned by the user over the component).
   */
  children({ isActive }: { isActive: boolean }): ReactElement;
}

export const DnDContainer: React.FC<IDnDContainerProps> = ({
  children,
  className: cls,
  onChange,
  ...rest
}): JSX.Element => {
  const [{ canDrop, isOver }, dragRef] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      collect: (monitor: DropTargetMonitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
      drop({ files }: { files: File[] }) {
        fp.compose(onChange, fp.head)(files);
      },
    }),
    [],
  );

  const isActive = useMemo(() => canDrop && isOver, [canDrop, isOver]);

  const renderedChildren = children({ isActive });

  return (
    <Box
      ref={dragRef}
      className={cx({ 'border-secondary-500 bg-secondary-50': isActive }, cls)}
      {...rest}
    >
      {renderedChildren && Children.only(renderedChildren)}
    </Box>
  );
};
