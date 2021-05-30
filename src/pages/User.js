import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Page from "../components/Page";
import { createInput } from "../utils";
import Form from "../components/Form";
import * as yup from "yup";
import { createUser, editUser, getUserById } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const fields = [
  createInput("name", "text", "Nombre completo"),
  createInput("nickname", "text", "Nickname"),
  createInput("password", "password", "Contraseña"),
];

const schemaCreate = yup.object().shape({
  name: yup.string().required(),
  nickname: yup.string().required(),
  password: yup.string().required(),
});
const schemaEdit = yup.object().shape({
  name: yup.string().required(),
  nickname: yup.string().required(),
  password: yup.string(),
});
schemaCreate._nodes.reverse();
schemaEdit._nodes.reverse();

const User = ({ match }) => {
  const history = useHistory();
  const modal = useModal();
  const [redirect, setRedirect] = useState("");
  const [initValues, setInitValues] = useState({});
  const id = match.params.id;
  const isEdit = Boolean(match.params.id);
  const title = isEdit ? "Editar usuario" : "Agregar usuario";

  useEffect(() => {
    if (isEdit) {
      getUserById(id).then((result) => {
        let user = _.get(result, "items[0]", {});
        setInitValues(user);
      });
    }
  }, []);

  const onCancel = () => history.goBack();

  const onSave = (data) => {
    let id = data.id;
    if (isEdit) {
      delete data.id;
      if (!data.password) delete data.password;
      editUser(id, data).then(async (result) => {
        await modal.openModal("Usuarios", "El usuario se editó correctamente");
        onCancel();
      });
    } else {
      createUser(data).then(async (result) => {
        await modal.openModal("Usuarios", "Usuario creado con éxito");
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
          schema={isEdit ? schemaEdit : schemaCreate}
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

export default User;
