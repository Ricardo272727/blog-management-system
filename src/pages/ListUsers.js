import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Page from "../components/Page";
import Button from "../components/Button";
import TransparentButton from "../components/TransparentButton";
import Table from "../components/Table";
import Input from "../components/Input";
import { listUsers, deleteUser } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const ListUsers = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const [items, setItems] = useState([]);
  const modal = useModal();

  useEffect(() => {
    (async () => {
      let result = await listUsers();
      setItems(result.items);
    })();
  }, []);

  const addElement = () => history.push("/user");
  const onDelete = async ({ id }) => {
    let ok = await modal.openModal(
      "Eliminar usuario",
      "Estas seguro de que eliminar este usuario?"
    );
    if (ok) {
      deleteUser(id).then(async (result) => {
        await modal.openModal(
          "Horario eliminado",
          "Se eliminó el usuario correctamente"
        );
        window.location.reload();
      });
    }
  };
  const onEdit = (lab) => history.push(`/user/${lab.id}`);

  return (
    <Page title="Usuarios" redirect={redirect}>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Button onClick={addElement}>Agregar usuario</Button>
      </Grid>
      <Grid container spacing={1} direction="row">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nickname</th>                            
              <th></th>
            </tr>
          </thead>
          <tbody>
            {_.map(items, (it, index) => (
              <tr key={index}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{it.nickname}</td>
                <td>
                  <TransparentButton onClick={() => onEdit(it)}>
                    <EditIcon />
                  </TransparentButton>
                  <TransparentButton onClick={() => onDelete(it)}>
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

export default ListUsers;
