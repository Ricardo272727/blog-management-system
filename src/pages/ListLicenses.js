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
import { createLicense } from "../utils";
import { listLicense, deleteLicense } from "../api";
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';

const ListLicenses = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const [items, setItems] = useState([]);
  const modal = useModal();

  useEffect(() => {
    (async () => {
      let result = await listLicense();
      setItems(result.items);
    })();
  }, []);

  const addElement = () => history.push("/licenses");
  const onEdit = (lab) => history.push(`/licenses/${lab.id}`);
  const onDelete = async ({ id }) => {
    let ok = await modal.openModal(
      "Eliminar licencia",
      "Estas seguro de eliminar esta licencia?"
    );
    if (ok) {
      deleteLicense(id).then(async (result) => {
        await modal.openModal(
          "Licencia eliminada",
          "Se eliminó la licencia correctamente"
        );
        window.location.reload();
      });
    }
  };

  return (
    <Page title="Licencias" redirect={redirect}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button onClick={addElement}>Agregar licencia</Button>
      </Grid>
      <Grid container spacing={1} direction="row">
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de activación</th>
              <th>Fecha de expiración</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {_.map(items, (it, index) => (
              <tr key={index}>
                <td>{it.name}</td>
                <td>{moment(it.start_datetime).format("DD/MM/YYYY HH:MM")}</td>
                <td>{moment(it.end_datetime).format("DD/MM/YYYY HH:MM")}</td>
                <td>{it.status}</td>
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

export default ListLicenses;
