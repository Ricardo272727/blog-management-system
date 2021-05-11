import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import Input from "./Input";
import Button from "./Button";
import ErrorMsg from "./ErrorMsg";

const getInitValues = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

const Form = ({ initValues, fields, schema, onSave, onCancel }) => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    ...getInitValues(fields),
    ...initValues,
  });

  useEffect(() => {
    console.log({initValues})
    setValues((values) => ({
      ...values,
      ...initValues,
    }));
  }, [initValues]);

  const setState = (state) =>
    setValues((values) => ({
      ...values,
      ...state,
    }));

  const handleAccept = () => {
    if (validate()) {
      onSave(values);
    }
  };

  const validate = () => {
    try {
      schema.validateSync(values);
      setError("");
    } catch ({ errors }) {
      setError(errors.join(", "));
      return false;
    }
    return true;
  };

  const onChange = (event) => {
    let name = _.get(event, "target.name", "");
    let value = _.get(event, "target.value", "");
    let type = _.get(event, "target.type", "");
    let file = _.get(event, "target.files[0]", {});
    if (type == "file") {
      value = file;
    }
    setState({ [name]: value });
  };

  const btnStyle = { padding: "0.4rem 2.5rem" };
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={4}>
        {_.map(fields, (field, index) => (
          <Input
            {...field}
            value={values[field.name]}
            onChange={onChange}
            key={index}
          />
        ))}
        <ErrorMsg error={error} />
        <Grid
          container
          direction="row"
          justify="space-around"
          style={{ marginTop: "2rem" }}
        >
          <Button onClick={onCancel} style={btnStyle}>
            Cancelar
          </Button>
          <Button onClick={handleAccept} style={btnStyle}>
            Aceptar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;
