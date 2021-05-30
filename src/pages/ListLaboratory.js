import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Page from "../components/Page";
import Button from "../components/Button";
import TransparentButton from "../components/TransparentButton";
import Table from "../components/Table";
import { createLab } from "../utils";
import { listLabs, deleteLab } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const laboratories = [
  createLab(1, "Laboratorio 2", "Si", "Lilia Mantilla"),
  createLab(2, "Laboratorio 3", "No", "Ricardo Cuanalo"),
];

const ListLaboratory = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const modal = useModal();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      let result = await listLabs();
      console.log({ result });
      setItems(result.items);
    })();
  }, []);

  const addElement = () => history.push("/laboratories");

  const onDelete = async ({ id }) => {
    let ok = await modal.openModal(
      "Eliminar laboratorio",
      "Estas seguro de eliminar este laboratorio?"
    );
    if (ok) {
      deleteLab(id).then(async (result) => {
        await modal.openModal("Laboratorio eliminado", "Se eliminó el laboratorio correctamente");
        window.location.reload();
      });
    }
  };

  const onEdit = (lab) => history.push(`/laboratories/${lab.id}`);

  return (
    <Page title="Laboratorios" redirect={redirect}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button onClick={addElement}>Agregar laboratorio</Button>
      </Grid>
      <Grid container spacing={1} direction="row">
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ocupado</th>
              <th>Titular</th>
              <th>Número de articulos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {_.map(items, (lab, index) => (
              <tr key={index}>
                <td>{lab.name}</td>
                <td>{lab.busy ? "Si" : "No"}</td>
                <td>{lab.username || lab.user_id}</td>
                <td>{lab.articles}</td>
                <td>
                  <TransparentButton onClick={() => onEdit(lab)}>
                    <EditIcon />
                  </TransparentButton>
                  <TransparentButton onClick={() => onDelete(lab)}>
                    <DeleteIcon />
                  </TransparentButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Grid>
      <Modal
        visible={modal.open}
        title={modal.title}
        message={modal.message}
        onAccept={modal.onAccept}
        onCancel={modal.onCancel}
      />
    </Page>
  );
};

export default ListLaboratory;
