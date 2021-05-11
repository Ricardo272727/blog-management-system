import React from "react";
import theme from "../theme";
import Button from "../components/Button";

const Modal = ({
  title = "",
  message = "",
  onAccept = null,
  onCancel = null,
  visible = false,
}) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: theme.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000
      }}
    >
      <div
        style={{
          width: "25%",
          padding: "1rem",
          textAlign: "center",
          background: theme.secondary,
        }}
      >
        <h3 style={{ color: theme.titles, fontWeight: "bold" }}>{title}</h3>
        <p style={{ color: theme.text }}>{message}</p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          {onCancel && (
            <Button onClick={onCancel} style={{ marginRight: "1rem" }}>
              Cancelar
            </Button>
          )}
          {onAccept && (
            <Button onClick={onAccept} style={{ marginLeft: "1rem" }}>
              Aceptar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
