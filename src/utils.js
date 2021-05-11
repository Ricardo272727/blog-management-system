export const createInput = (name, type, label, otherProps) => ({
  name,
  type,
  label,
  ...otherProps,
});

export const createOption = (label, value) => ({ label, value });

export const createSchedule = (
  id,
  start_hour,
  end_hour,
  date,
  username,
  laboratory_name
) => ({ id, start_hour, end_hour, date, username, laboratory_name });

export const createLicense = (id, name, start_hour, end_hour, status) => ({
  id,
  name,
  start_hour,
  end_hour,
  status,
});

export const createLab = (id, name, busy, username) => ({
  id,
  name,
  busy,
  username,
});

export const createInventoryItem = (id, name, pieces, image) => ({
  id,
  name,
  pieces,
  image,
});

export const formatTime = (time) => {
  let [h, m, s] = time.split(':');
  if(!s){
    s = "00";
  }
  return [h, m, s].join(":");
}
