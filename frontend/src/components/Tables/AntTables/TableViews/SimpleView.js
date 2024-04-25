import React from 'react';
import PropTypes from 'prop-types';
import TableWrapper from '../AntTables.styles';

function SimpleTableView({
  isSelection = false,
  isPaginate = false,
  tableInfo,
  ...props
}) {
  const dataSource = props.dataSource || props.dataList.getAll();
  const columns = props.columns || tableInfo.columns;
  const rowSelectionProps = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) =>
      props.onSelectionChange(selectedRowKeys, selectedRows),
  };
  const isRowSelectionModifier = isSelection ? rowSelectionProps : undefined;
  return (
    <TableWrapper
      pagination={isPaginate}
      columns={columns}
      dataSource={dataSource}
      className="isoSimpleTable"
      rowSelection={isRowSelectionModifier}
      {...props}
    />
  );
}

SimpleTableView.defaultProps = {
  isSelection: PropTypes.bool.isRequired,
  isPaginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSelectionChange: PropTypes.func,
};

export default SimpleTableView;
