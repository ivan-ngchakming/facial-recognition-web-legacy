import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { graphqlQuery } from '../../../../graphql';
import { PROFILE as PROFILE_GQL_M } from '../../../../graphql/mutation';

const PREFIX = 'CreatePortfolio';

const classes = {
  formWrapper: `${PREFIX}-formWrapper`,
  btnWrapper: `${PREFIX}-btnWrapper`,
  btn: `${PREFIX}-btn`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.formWrapper}`]: {
    margin: theme.spacing(2),
  },

  [`& .${classes.btnWrapper}`]: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },

  [`& .${classes.btn}`]: {
    minWidth: '120px',
    margin: theme.spacing(0, 1),
  }
}));

export default function CreatePortfolio({ callback, faceId }) {


  return (
    <Root>
      <Typography variant="h6" align="center">
        Create New Portfolio
      </Typography>

      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={Yup.object().shape({})}
        onSubmit={({ name }, { setStatus, resetForm }) => {
          console.debug('Submitted form', name);
          graphqlQuery(PROFILE_GQL_M, {
            name: name,
            faceIds: [faceId],
            thumbnailId: faceId,
          })
            .then((res) => {
              resetForm();
              callback(res.profile);
            })
            .catch((err) => {
              console.error(err);
              resetForm();
            });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              className={classes.formWrapper}
              alignContent="center"
            >
              <Grid item xs={10}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="formName"
                  label="Name"
                  onChange={handleChange}
                  value={values.name}
                  autoFocus
                />
              </Grid>
            </Grid>
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleSubmit}
                // disabled={isSubmitting}
              >
                New Profile
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Root>
  );
}
