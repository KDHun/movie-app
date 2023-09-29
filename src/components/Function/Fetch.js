const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
};
const Fetch = (props) => {
    console.log(props);
  fetch(props.url, options)
    .then((response) => response.json())
    .then((data) => {
      props.saveData(data);
    })
    .catch((error) => {
      props.errors(error);
    })
    .finally(() => {
      props.final();
    });
};
export default Fetch;
