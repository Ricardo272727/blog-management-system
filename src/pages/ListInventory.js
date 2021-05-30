import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Page from "../components/Page";
import CardInventory from "../components/CardInventory";
import Button from "../components/Button";
import Input from "../components/Input";
import { createInventoryItem, createOption } from "../utils";
import { listInventory, deleteInventory, listLabs } from "../api";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const cards = [
  createInventoryItem(
    1,
    "PLC",
    2,
    "https://www.durtron.com/wp-content/uploads/2020/01/plc_allen_bradley_1766-l32bxb_5-600x600.png"
  ),
  createInventoryItem(
    1,
    "PLC",
    2,
    "https://www.durtron.com/wp-content/uploads/2020/01/plc_allen_bradley_1766-l32bxb_5-600x600.png"
  ),
  createInventoryItem(
    1,
    "PLC",
    2,
    "https://www.durtron.com/wp-content/uploads/2020/01/plc_allen_bradley_1766-l32bxb_5-600x600.png"
  ),
  createInventoryItem(
    1,
    "PLC",
    2,
    "https://www.durtron.com/wp-content/uploads/2020/01/plc_allen_bradley_1766-l32bxb_5-600x600.png"
  ),
];

const ListInventory = ({}) => {
  const history = useHistory();
  const [redirect, setRedirect] = useState("");
  const [items, setItems] = useState([]);
  const [labs, setLabs] = useState([]);
  const [labId, setLabId] = useState("");
  const modal = useModal();

  useEffect(() => {
    listLabs().then((result) => {
      let labs = result.items.map((it) => createOption(it.name, it.id));
      labs.unshift(createOption("", ""));
      setLabs(labs);
    });
  }, []);

  useEffect(() => {
    search();
  }, [labId]);

  const search = () => {
    let params = {};
    if(labId) params.laboratory_id = labId;
    listInventory(params).then((result) => {      
      console.log({ result });
      setItems(result.items);
    });
  };

  const addElement = () => history.push("/inventoryItem");
  const deleteItem = async (id) => {
    let ok = await modal.openModal(
      "Inventario",
      "Estas seguro de eliminar este elemento?"
    );
    if (!ok) return;
    console.log("Deleting", id);
    try {
      let response = await deleteInventory(id);
      console.log({ response });
      await modal.openModal("Inventario", "Se eliminó el elemento con éxito");
      window.location.reload();
    } catch (error) {
      await modal.openModal("Inventario", "Error al eliminar elemento");
    }
  };

  return (
    <Page title="Inventario" redirect={redirect}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <div>
          <Input
            name="laboratory_id"
            type="select"
            items={labs}
            value={labId}
            onChange={(e) => setLabId(e.target.value)}
          />
        </div>
        <Button onClick={addElement}>Agregar elemento</Button>
      </Grid>
      <Grid container spacing={1} direction="row">
        {_.map(items, ({ id, name, amount, image }, index) => (
          <Grid md={3} item key={index}>
            <CardInventory
              id={id}
              name={name}
              pieces={amount}
              image={image}
              onEdit={(id) => history.push(`/inventoryItem/${id}`)}
              onDelete={(id) => deleteItem(id)}
            />
          </Grid>
        ))}
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

export default ListInventory;
