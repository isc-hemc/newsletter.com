import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

import { Container } from './components/Container';
import { ITbodyProps, Tbody } from './components/Tbody';
import { ITdProps, Td } from './components/Td';
import { IThProps, Th } from './components/Th';
import { ITheadProps, Thead } from './components/Thead';
import { ITrProps, Tr } from './components/Tr';

export type ITableProps = IPropsOf<'table'>;

export interface ITableCompoundProps {
  /**
   * Table default container.
   */
  Container: typeof Container;
  /**
   * Table `tbody` element.
   */
  Tbody: React.FC<ITbodyProps>;
  /**
   * Table `td` element.
   */
  Td: React.FC<ITdProps>;
  /**
   * Table `th` element.
   */
  Th: React.FC<IThProps>;
  /**
   * Table `thead` element.
   */
  Thead: React.FC<ITheadProps>;
  /**
   * Table `tr` element.
   */
  Tr: React.FC<ITrProps>;
}

export const T = clomp.table`
  divide-gray-200
  divide-y
  min-w-full
`;

export const Table: React.FC<ITableProps> & ITableCompoundProps = ({
  children,
  ...rest
}): JSX.Element => <T {...rest}>{children}</T>;

Table.Container = Container;

Table.Thead = Thead;

Table.Tbody = Tbody;

Table.Td = Td;

Table.Tr = Tr;

Table.Th = Th;
