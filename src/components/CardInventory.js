import React from "react";
import { Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import SecondaryPaper from "../components/papers/SecondaryPaper";
import Title from "./Title";
import Image from "./Image";
import Button from "./Button";

const CardInventory = ({ id, name, pieces, image, onEdit, onDelete }) => {
  return (
    <SecondaryPaper elevation={3} style={{ marginTop: "1rem" }}>
      <Grid container spacing={2}>
        <Grid
          item
          md={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={image} alt={name} className="inventory-image" />
        </Grid>
        <Grid item md={7}>
          <Title>{name}</Title>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Title>{pieces} pzs.</Title>
            <Button onClick={() => onEdit(id)}>
              <EditIcon />
            </Button>
            <Button onClick={() => onDelete(id)}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SecondaryPaper>
  );
};

export default CardInventory;
