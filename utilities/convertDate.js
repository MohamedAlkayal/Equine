const convertDate = (dateString, format = "dd-mm-yyyy") => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate =
    format === "yyyy-mm-dd"
      ? `${year}-${month}-${day}`
      : `${day}-${month}-${year}`;
  return formattedDate;
};

export default convertDate;
