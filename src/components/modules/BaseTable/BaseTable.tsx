import { clomp } from 'clomp';
import { IPropsOf } from 'types.d';

import { Container } from './components/Container';
import { ITbodyProps, Tbody } from './components/Tbody';
import { ITdProps, Td } from './components/Td';
import { IThProps, Th } from './components/Th';
import { ITheadProps, Thead } from './components/Thead';
import { ITrProps, Tr } from './components/Tr';

export interface IBaseTableCompoundProps {
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

export type IBaseTableProps = IPropsOf<'table'>;

const Table = clomp.table`
  divide-gray-200
  divide-y
  min-w-full
`;

export const BaseTable: React.FC<IBaseTableProps> & IBaseTableCompoundProps = ({
  children,
  ...rest
}): JSX.Element => <Table {...rest}>{children}</Table>;

BaseTable.Container = Container;

BaseTable.Thead = Thead;

BaseTable.Tbody = Tbody;

BaseTable.Td = Td;

BaseTable.Tr = Tr;

BaseTable.Th = Th;
