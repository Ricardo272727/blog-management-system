import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Page from "../components/Page";
import { createInput, createOption } from "../utils";
import Form from "../components/Form";
import * as yup from "yup";
import { createLicense, editLicense, getLicenseById } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const fields = [
  createInput("name", "text", "Nombre"),
  createInput("start_datetime", "date", "Fecha de activación"),
  createInput("end_datetime", "date", "Fecha de expiración"),
  createInput("status", "select", "Status", {
    items: [
      createOption("", ""),
      createOption("Expirada", "expirada"),
      createOption("Activa", "activa")
    ]
  }),
];

const schema = yup.object().shape({
  name: yup.string().required(),
  start_datetime: yup.string().required(),
  end_datetime: yup.string().required(),
  status: yup.string().required()
});
schema._nodes.reverse();

const License = ({ match }) => {
  const history = useHistory();
  const [initValues, setInitValues] = useState({});
  const [redirect, setRedirect] = useState("");
  const isEdit = Boolean(match.params.id);
  const modal = useModal();
  const id = match.params.id;
  const title = isEdit ? "Editar licencia" : "Agregar licencia";
  const onCancel = () => history.goBack();

  useEffect(() => {
    if (isEdit) {
      getLicenseById(id).then((result) => {
        let license = result.items[0];
        license.start_datetime = moment(license.start_datetime).format('YYYY-MM-DD');
        license.end_datetime = moment(license.end_datetime).format('YYYY-MM-DD');
        setInitValues(license);
      });
    }
  }, []);

  const onSave = (data) => {    
    data.start_datetime = moment(data.start_datetime).format();
    data.end_datetime = moment(data.end_datetime).format();
    if (isEdit) {
      delete data.id;      
      editLicense(id, data).then(async (result) => {
        await modal.openModal("Licencias", "Licencia editada con éxito");
        onCancel();
      });
    } else {
      createLicense(data).then(async (result) => {
        await modal.openModal("Licencias", "Licencia guardada con éxito");
        onCancel();
      });
    }
  };

  return (
    <Page title={title} redirect={redirect}>
      <Grid container spacing={1} direction="row">
        <Form
          initValues={initValues}
          fields={fields}
          schema={schema}
          onCancel={onCancel}
          onSave={onSave}
        />
      </Grid>
      <Modal
        visible={modal.open}
        title={modal.title}
        message={modal.message}
        onAccept={modal.onAccept}
      />
    </Page>
  );
};

export default License;
