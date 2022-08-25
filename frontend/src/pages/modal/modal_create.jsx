
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { api } from '../../utils/api';
import { useSnackbar } from 'notistack';
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Backdrop, Button, Fade, TextField } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0rem 1rem',
    width: '30rem',
  },
  field: {
    marginTop: theme.spacing(2),
  },
  fieldDisable: {
    // color: '#000 !important',
    fontSizeAdjust: '0.8rem !important',
    marginTop: theme.spacing(2),
    disabledBackground: 'black',
    disabled: 'black',
    color: 'black !important',
    backgroundColor: 'white !important',
    fontSize: '1.8rem !important',
    fontWeight: 'bold !important',
  
    
    

  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function TransitionsModal({changePage}) {
  const classes = useStyles();
  const [isModalOpened, setIsModalOpened] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [great, setGreat] = useState(140);
  const [critical, setCritical] = useState(100);


  const handleOpen = () => setIsModalOpened(true);
  const handleClose = () => {
    setIsModalOpened(false);
  };

  const handleSubmit = async (values) => {

    try {
        await api.post('/policy', { great: parseInt(great), critical: parseInt(critical) }).then(res => {
        console.log(res);
        enqueueSnackbar('Política de estoque cadastrada com sucesso!', { variant: 'success' });
        handleClose();
        changePage(1);
      }).catch(err => {
        console.log(err);
        enqueueSnackbar('Erro ao cadastrar política de estoque!', { variant: 'error' });
      });

    } catch (error) {
      enqueueSnackbar(('Error creating policy'), { variant: 'error' });
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        color="error"
      >
        <strong>CADASTRAR POLÍTICA DE ESTOQUE</strong>
      </Button>
      <Modal
        className={classes.modal}
        open={isModalOpened} onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={isModalOpened}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{('CADASTRAR POLÍTICA DE ESTOQUE')}</h2>
            <Formik
              initialValues={{ great: "140", critical: "100" }}
              onSubmit={handleSubmit}
              validationSchema={
                Yup.object({
                  great: Yup.string().required(('Este campo é obrigatório')),
                  critical: Yup.string().required(('Este campo é obrigatório')),
                })
              }>
              {({ errors, touched }) => (

                <Form className={classes.form}>
                  <Field 
                  className={classes.field}
                  component={TextField} 
                  label="Ótimo" 
                  name="great" 
                  as="input" 
                  value={great}
                  initialValues="140"
                  variant="outlined" 
                  onChange={(e) => setGreat(e.target.value)}
                  placeholder="140" />
                  {errors.great && touched.great ? <div>{errors.great}</div> : null}
                  <Field 
                  className={classes.fieldDisable}
                  component={TextField} 
                  label="Bom" 
                  disabled
                  value={`entre ${great} e ${critical}`}
                  initialValues="140"
                  variant="outlined" 
                  readOnly={true}
                  onChange={(e) => setGreat(e.target.value)}
                  placeholder="140" />

                  <Field 
                  className={classes.field}
                  component={TextField} 
                  label="Critico" 
                  name="critical" 
                  as="input" 
                  value={critical}
                  variant="outlined" 
                  initialValues="100"
                  onChange={(e) => setCritical(e.target.value)}
                  placeholder="100"
                  />
                  {errors.critical && touched.critical ? <div>{errors.critical}</div> : null}

                  <Button type="submit"
                  className={classes.submitButton}
                  variant="outlined"
                  color="error">{('Cadastrar')}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
