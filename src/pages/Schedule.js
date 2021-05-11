import React, { useState, useEffect } from "react";
import moment from 'moment';
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Page from "../components/Page";
import { createInput, createOption } from "../utils";
import Form from "../components/Form";
import * as yup from "yup";
import { createSchedule, editSchedule, getScheduleById } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import { formatTime } from '../utils';

const fields = [
  createInput("start_hour", "time", "Hora de inicio"),
  createInput("end_hour", "time", "Hora de fin"),
  createInput("date", "date", "Fecha"),
  createInput("user_id", "select", "Encargado", {
    items: [
      createOption("", ""),
      createOption("Lilia Mantilla", 1),
      createOption("Josué Sanchez", 2),
    ],
  }),
  createInput("laboratory_id", "select", "Laboratorio", {
    items: [
      createOption("", ""),
      createOption("Laboratorio 1", 1), 
      createOption("Laboratorio 2", 2)
    ],
  }),
];

const schema = yup.object().shape({
  start_hour: yup.string().required(),
  end_hour: yup.string().required(),
  date: yup.string().required(),
  user_id: yup.number().required(),
  laboratory_id: yup.number().required(),
});
schema._nodes.reverse();

const Schedule = ({ match }) => {
  const history = useHistory();
  const modal = useModal();
  const [redirect, setRedirect] = useState("");
  const [initValues, setInitValues] = useState({});
  const id = match.params.id;
  const isEdit = Boolean(match.params.id);
  const title = isEdit ? "Editar horario" : "Agregar horario";  
  
  useEffect(() => {
    if(isEdit) {
      getScheduleById(id).then(result => {
        let schedule = _.get(result, 'items[0]', {});
        schedule.date = moment(schedule.date).format("YYYY-MM-DD");
        setInitValues(schedule);
      })
    }
  }, []);

  const onCancel = () => history.goBack();

  const onSave = (data) => {    
    data.start_hour = formatTime(data.start_hour);
    data.end_hour = formatTime(data.end_hour);
    data.user_id = Number(data.user_id);
    data.laboratory_id = Number(data.laboratory_id);

    if(isEdit){
      delete data.id;
      delete data.username;
      delete data.laboratory_name;
      editSchedule(id, data).then(async result => {
        await modal.openModal("Horarios", "El horario se editó correctamente");
        onCancel();
      }) 
    } else {
      createSchedule(data).then(async (result) => {
        await modal.openModal("Horarios", "Horario creado con éxito");
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

export default Schedule;
