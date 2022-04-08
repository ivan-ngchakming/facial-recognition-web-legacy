import { useState, useCallback } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

import useTasks from '../../hooks/useTasks';
import DataTable from '../../components/DataTable/DataTable';
import SelectToolbar from '../../components/SelectToolbar';
import LinearProgressWithLabel from '../../components/progress/LinearProgressWithLabel';

const headCells = [
  { id: 'taskCollectionId', label: 'id' },
  {
    id: 'progress',
    label: 'Progress',
    render: (value) => <LinearProgressWithLabel value={value * 100} />,
  },
  { id: 'status', label: 'Status' },
];

export default function Tasks() {
  const [tasks, fetchTasks] = useTasks();
  const [, setSelected] = useState([]);

  const toolBarButtons = [
    <Tooltip title="Refresh">
      <IconButton aria-label="refresh" onClick={fetchTasks} size="large">
        <RefreshIcon />
      </IconButton>
    </Tooltip>,
    <Tooltip title="Add">
      <IconButton aria-label="add" component="button" href="/tasks/create" size="large">
        <AddIcon />
      </IconButton>
    </Tooltip>,
  ];

  const toolBarSelectedButtons = [
    <Tooltip title="Delete">
      <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton>
    </Tooltip>,
  ];

  const ToolBar = ({ selectedItems, onCheckAll }) => {
    return (
      <SelectToolbar
        title="Tasks"
        buttons={toolBarButtons}
        selectedButtons={toolBarSelectedButtons}
        numSelected={selectedItems.length}
        checked={selectedItems.length > 0}
        indeterminate={selectedItems.length !== tasks.length}
        onCheckAll={onCheckAll}
      />
    );
  };

  const handleSelect = useCallback(
    (selected) => {
      setSelected([...selected]);
    },
    [setSelected]
  );

  return (
    <>
      <DataTable
        data={tasks}
        dataCount={tasks.length}
        refetch={fetchTasks}
        onSelect={handleSelect}
        headCells={headCells}
        ToolBar={ToolBar}
      />
    </>
  );
}
