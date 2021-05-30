import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Page from "../components/Page";
import { createInput, createOption } from "../utils";
import Form from "../components/Form";
import * as yup from "yup";
import { createInventory, editInventory, getInventoryById, listLabs } from "../api";
import useModal from "../hooks/useModal";
import Modal from "../components/Modal";

const fields = [
  createInput("name", "text", "Nombre"),
  createInput("amount", "number", "Cantidad"),
  createInput("image", "file", "Imagen"),
  createInput("laboratory_id", "select", "Laboratorio", {
    items: [
      createOption("", ""),
    ],
  }),
];

const schema = yup.object().shape({
  name: yup.string().required(),
  amount: yup.number().required(),
  image: yup.string().required(),
  laboratory_id: yup.number().required(),
});
schema._nodes.reverse();

const Inventory = ({ match }) => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const [initValues, setInitValues] = useState({});
  const [labs, setLabs] = useState([]);
  const [renderFields, setRenderFields] = useState(fields);
  const isEdit = Boolean(match.params.id);
  const id = match.params.id;
  const title = isEdit ? "Editar elemento" : "Agregar elemento";
  const onCancel = () => history.goBack();
  const modal = useModal();

  useEffect(() => {
    if (isEdit) {
      getInventoryById(id).then((result) => {
        setInitValues(_.get(result, "items[0]", {}));
      });
    }
    listLabs().then(result => {
      let labs = result.items.map(it => createOption(it.name, it.id));
      labs.unshift(createOption("", ""));
      setRenderFields((renderFields) => {
        return renderFields.map(rf => {
          if(rf.name == 'laboratory_id'){
            rf.items = labs; 
          }
          return rf;
        })
      })
    });
  }, []);

  const onSave = (data) => {
    let fd = new FormData();
    fd.append("name", data.name);
    fd.append("amount", data.amount);
    fd.append("image", data.image);
    fd.append("laboratory_id", data.laboratory_id);

    console.log({ fd, data });
    if (isEdit) {
      editInventory(id, fd).then(async (result) => {
        console.log({ result });
        await modal.openModal(
          "Inventario",
          "Se editó un elemento del inventario"
        );
        onCancel();
      });
    } else {
      createInventory(fd).then(async (result) => {
        console.log({ result });
        await modal.openModal(
          "Inventario",
          "Se agregó un nuevo elemento al inventario"
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
          fields={renderFields}
          schema={schema}
          onCancel={onCancel}
          onSave={onSave}
        />
      </Grid>
      <Modal
        visible={modal.open}
        onAccept={modal.onAccept}
        onCancel={modal.onCancel}
        title={modal.title}
        message={modal.message}
      />
    </Page>
  );
};

export default Inventory;
