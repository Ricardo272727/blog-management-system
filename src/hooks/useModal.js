import { useEffect, useState } from "react";
import EventEmitter from "./EventEmitter";

const emitter = new EventEmitter();

const useModal = () => {
  const [info, setInfo] = useState({ title: "Titule", message: "Texto" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    emitter.on("accept", () => {
      setOpen(false);
    });
    emitter.on("cancel", () => {
      setOpen(false);
    });
  }, []);

  const onAccept = () => emitter.emit("accept");
  const onCancel = () => emitter.emit("cancel");
  const cleanEvents = (event) => emitter.deleteOldEvents(event);

  const openModal = (title, message) => {
    return new Promise((resolve) => {
      setInfo({ title, message });
      setOpen(true);
      emitter.on("accept", () => {
        cleanEvents("accept");
        resolve(true);
      });
      emitter.on("cancel", () => {
        cleanEvents("cancel");
        resolve(false);
      });
    });
  };

  return { ...info, open, onAccept, onCancel, openModal };
};

export default useModal;
