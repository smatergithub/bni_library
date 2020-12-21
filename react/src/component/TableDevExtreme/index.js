import React, { useState } from 'react';
import {
  SearchState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
    color: 'white',
  },
});

const TableDevExtreme = props => {
  const [currentPage] = useState(props.currentPage);
  const [pageSize] = useState(props.pageSize);
  const [pageSizes] = useState([5, 10, 15]);

  const { rows, columns, columnExtensions = [] } = props;
  const classes = useStyles();

  return (
    <div
      className="min-w-full bg-white"
      style={{
        height: '480px',
      }}
    >
      <Grid rows={rows} columns={columns}>
        <SearchState />
        <SortingState />
        <IntegratedFiltering />
        <IntegratedSorting />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={props.onCurrentPageChange}
          pageSize={pageSize}
          onPageSizeChange={props.onPageSizeChange}
        />
        <CustomPaging totalCount={props.totalCount} />
        {/* <IntegratedPaging /> */}
        <Table columnExtensions={columnExtensions} className={classes.root} />
        <TableHeaderRow showSortingControls className={classes.root} />
        <PagingPanel pageSizes={pageSizes} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </div>
  );
};

export default TableDevExtreme;
