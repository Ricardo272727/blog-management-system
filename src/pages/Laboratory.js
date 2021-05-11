import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Page from "../components/Page";
import { createInput, createOption } from "../utils";
import Form from "../components/Form";
import * as yup from "yup";
import { createLab, getLabById, editLab } from "../api";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal";

const fields = [
  createInput("name", "text", "Nombre"),
  createInput("busy", "select", "Ocupado", {
    items: [
      createOption("", ""),
      createOption("Si", true),
      createOption("No", false)
    ]
  }),
  createInput("user_id", "select", "Titular", {
    items: [
      createOption("", ""),
      createOption("Lilia Mantilla", 1),
      createOption("Josué Sanchez", 2),
    ],
  }),
];

const schema = yup.object().shape({
  name: yup.string().required(),
  busy: yup.boolean().required(),
  user_id: yup.number().required(),
});
schema._nodes.reverse();

const Laboratory = ({ match }) => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const [initValues, setInitValues] = useState({});
  const id = match.params.id;
  const isEdit = Boolean(match.params.id);
  const modal = useModal();
  const title = isEdit ? "Editar laboratorio" : "Agregar laboratorio";

  useEffect(() => {
    if(isEdit){
      getLabById(id).then(result => {
        setInitValues(result.items[0]);
      })
    }
  }, []);


  const onCancel = () => history.goBack();

  const onSave = (data) => {
    console.log({data});
    data.busy = Boolean(data.busy);
    data.user_id = Number(data.user_id);
    if (isEdit) {
      delete data.id;      
      delete data.username;    
      editLab(id, data).then(async (result) => {
        await modal.openModal(
          "Laboratorio",
          "Se editó el laboratorio con éxito"
        );
        onCancel();
      });
    } else {
      createLab(data).then(async (result) => {
        await modal.openModal(
          "Laboratorio",
          "Se creó el laboratorio con éxito"
        );
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

export default Laboratory;
