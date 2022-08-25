import React, { useEffect, useLayoutEffect, useState } from 'react';
import { api } from '../utils/api';
import { Box, Button, Typography } from '@mui/material';
import ModalCreate from './modal/modal_create';
import ModalEdit from './modal/modal_edit';

export default function Policy({ changePage }) {
  const [policy, setPolicy] = useState({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState();


  useLayoutEffect(() => {
    const getData = async () => {
      const policyRes = await api.get('/policy')
      setPolicy(policyRes.data);
    }
    getData();
  }, []);

  useEffect(() => {
    if (page === 1) {
      changePage("Relatórios");
    }
  }, [page]);


  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 850 }}>
        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom>
              Política de Estoque
            </Typography>


            <div onClick={() => setOpen(!open)}>
              {policy ? (
                <ModalEdit
                  changePage={(props) => setPage(props)}
                />)
                : (
                  <ModalCreate
                    changePage={(props) => setPage(props)}
                  />
                )
              }
            </div>

          </div>
          {policy ? <Inventory policy={policy} /> : (
            <Typography sx={{ marginTop: "2rem" }} variant="h6" gutterBottom>
              Não há dados cadastrados para a política de estoque.
            </Typography>
          )}

        </div>
      </Box>
    </>
  );
}

function Inventory({ policy }) {
  return (<>          <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: "2rem"
  }}>
    <Typography variant="h6" gutterBottom>
      Estoque Ótimo
    </Typography>
    <Typography variant="h6" gutterBottom>
      acima de {policy?.great}
    </Typography>
  </div>

    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Typography variant="h6" gutterBottom>
        Estoque Bom
      </Typography>
      <Typography variant="h6" gutterBottom>
        de {policy?.great} até {policy?.critical}
      </Typography>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <Typography variant="h6" gutterBottom>
        Estoque Crítico
      </Typography>
      <Typography variant="h6" gutterBottom>
        abaixo de  {policy?.critical}
      </Typography>
    </div></>);
}
