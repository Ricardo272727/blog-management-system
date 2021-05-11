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
import { createOption, createSchedule } from "../utils";
import { listSchedule, listLabs, deleteSchedule } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const ListSchedule = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const [items, setItems] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [laboratoryId, setLaboratoryId] = useState(1);
  const modal = useModal();

  useEffect(() => {
    (async () => {
      let result = await listLabs();
      let labs = _.map(result.items, (lab) => createOption(lab.name, lab.id));
      result = await listSchedule();
      setItems(result.items);
      setLaboratories(labs);
    })();
  }, []);

  const addElement = () => history.push("/schedule");
  const onDelete = async ({ id }) => {
    console.log({ id });
    let ok = await modal.openModal(
      "Eliminar horario",
      "Estas seguro de que eliminar este horario?"
    );
    if (ok) {
      deleteSchedule(id).then(async (result) => {
        await modal.openModal(
          "Horario eliminado",
          "Se eliminó el horario correctamente"
        );
        window.location.reload();
      });
    }
  };
  const onEdit = (lab) => history.push(`/schedule/${lab.id}`);

  const search = (event) => {
    console.log({ event });

    setLaboratoryId(event.target.value);
  };

  return (
    <Page title="Horarios" redirect={redirect}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <div>
          <Input
            name="laboratory_id"
            type="select"
            items={laboratories}
            value={laboratoryId}
            onChange={search}
          />
        </div>
        <Button onClick={addElement}>Agregar horario</Button>
      </Grid>
      <Grid container spacing={1} direction="row">
        <Table>
          <thead>
            <tr>
              <th>Hora de inicio</th>
              <th>Hora de fin</th>
              <th>Fecha</th>
              <th>Encargado</th>
              <th>Laboratorio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {_.map(items, (it, index) => (
              <tr key={index}>
                <td>{it.start_hour}</td>
                <td>{it.end_hour}</td>
                <td>{moment(it.date).format("dddd DD/MM/YYYY")}</td>
                <td>{it.username}</td>
                <td>{it.laboratory_name}</td>
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

export default ListSchedule;
