import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../utils/api';
import { Box, Tab, Tabs, Typography } from '@mui/material';

export default function Reports() {
  const [data, setData] = useState([]);
  const [policy, setPolicy] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/reports/list')
      const policyRes = await api.get('/policy')

      setData(response.data);
      setPolicy(policyRes.data);
    }
    getData();
  }, []);

  const Status = (volume) => {
    let info = parseFloat(volume.replace(',', '.'));
    if (info < policy?.great && info > policy?.critical) {
      return 'BOM';
    }
    if (info >= policy?.great) {
      return 'ÓTIMO';
    }
    if (info <= policy?.critical) {
      return 'CRÍTICO';
    }
    return 'NÃO INFORMADO';
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Date', headerName: 'Date', width: 100 },
    { field: 'Open', headerName: 'Open', width: 100 },
    { field: 'High', headerName: 'High', width: 100 },
    { field: 'Low', headerName: 'Low', width: 100 },
    { field: 'Close', headerName: 'Close', width: 100 },
    { field: 'Volume', headerName: 'Volume', width: 100 },
    {
      field: 'Status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params) =>
        Status(params.row.Volume),
    },
  ];

  const rows = data

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 850 }}>
        <div style={{ height: 400, width: '100%' }}>
          <Typography variant="h3" gutterBottom>
            Relatórios
          </Typography>
          <Tabs value={0} aria-label="basic tabs example">
            <Tab label="Resumo" />
          </Tabs>

          <DataGrid
            sx={{ marginTop: '2rem' }}
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Box>
    </>
  );
}
