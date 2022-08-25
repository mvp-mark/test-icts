import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Dropzone } from "../components/Dropzone";
import Papa from "papaparse";
import { api } from "../utils/api";
import { useSnackbar } from 'notistack';

export const Upload = ({ changePage }) => {
  const [selectFile, setSelectedFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      const fileReader = new FileReader();
      fileReader.readAsText(selectFile);
      fileReader.addEventListener('loadend', (file) => {
        Papa.parse(file.target.result, {
          delimiter: ",",
          skipEmptyLines: true,
          dynamicTyping: true,
          header: true,
          complete: (result) => {

            api.post('/reports/list', { items: result.data }).then(res => {
              enqueueSnackbar('Upload foi carregado com sucesso!', { variant: 'success' });
              changePage("Relatórios");

            }).catch(err => {
              let error = err.response.data.msg ? err.response.data.msg : err.message
              enqueueSnackbar(error, { variant: 'error' });
            })
          }});
      }
      );

    } catch (error) {
      console.error(error);
      enqueueSnackbar((error.message), { variant: 'error' });
    }
  }

  return <>

    <form onSubmit={handleSubmit}>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h3" gutterBottom>
          Upload do Arquivo
        </Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
          Estoque Principal
        </Typography>
        <Dropzone onFileUploaded={setSelectedFile} />
        <div>

          <Button variant="contained" color="error" type="submit">Enviar Arquivo</Button>
        </div>
      </Box>
    </form>
  </>

};