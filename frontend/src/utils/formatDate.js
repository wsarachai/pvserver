import dateFormat from "dateformat";

const DATE_FORMAT = "yyyy-mm-dd";

export const formatDate = (d) => {
  return dateFormat(d , DATE_FORMAT)
};
