// TODO: handle form error and disabled form states.
import { cx } from '@emotion/css';
import { Button } from 'components/elements';
import fp from 'lodash/fp';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import {
  FaFile,
  FaFileCsv,
  FaFileImage,
  FaFilePdf,
  FaFileUpload,
} from 'react-icons/fa';
import { IPropsOf } from 'types.d';

import { DnDContainer } from './components/DnDContainer';

const FILE_ICONS: { [k: string]: IconType } = {
  csv: FaFileCsv,
  def: FaFile,
  img: FaFileImage,
  pdf: FaFilePdf,
};

export interface IFileProps extends Omit<IPropsOf<'input'>, 'type'> {
  /**
   * Icon type that will be rendered inside the DnD container.
   */
  icon?: 'csv' | 'def' | 'img' | 'pdf';
  /**
   * Icon size, default is `52`.
   */
  iconSize?: number | string;
}

export const File: React.FC<IFileProps> = ({
  className,
  icon = 'def',
  iconSize = 52,
  onChange = () => {},
  value,
  ...rest
}): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const f = fp.compose(fp.head, fp.get('target.files'))(e);
      const reader = new FileReader();
      reader.onloadend = () => onChange(f);
      reader.readAsDataURL(f);
    },
    [ref?.current],
  );

  const handleOnClick = useCallback(() => {
    fp.invoke('current.click')(ref);
  }, [ref?.current]);

  const Icon = useMemo(() => FILE_ICONS[icon], [icon]);

  const { t } = useTranslation('common');

  return (
    <DndProvider backend={HTML5Backend}>
      <DnDContainer className={className} onChange={onChange}>
        {({ isActive }) => (
          <>
            {isActive ? (
              <FaFileUpload color="#00C7B1" size={iconSize} />
            ) : (
              <Icon color="#E5E7EB" size={iconSize} />
            )}

            <p
              className={cx('mb-2 text-sm font-medium text-gray-500', {
                'mt-2': !fp.isNil(icon),
                'text-secondary-500': isActive,
              })}
            >
              {value?.name || t('dnd')}
            </p>

            {!isActive && fp.isNil(value) ? (
              <Button
                className="self-center px-6 py-2 text-sm"
                colorScheme="gray"
                onClick={handleOnClick}
              >
                {t('button.browse')}
              </Button>
            ) : null}
          </>
        )}
      </DnDContainer>

      <input
        ref={ref}
        className="hidden"
        onChange={handleOnChange}
        type="file"
        {...rest}
      />
    </DndProvider>
  );
};
