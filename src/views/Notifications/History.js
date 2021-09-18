import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "../../components/Table/Table";
import { CircularProgress } from "@material-ui/core";
import { getNodeChain } from "../../api/Nodes";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function History() {
  const classes = useStyles();
  const [data, setData] = React.useState();
  const [loaded, setLoaded] = React.useState();

  useEffect(() => {
    if (loaded) return;
    getNodeChain((dt) => {
      let d = dt.map((row) => {
        return [
          row.transactionalId,
          row.conasamentId,
          row.to,
          row.timestamp,
          row.signature,
        ];
      });
      setData(d);
      setLoaded(true);
    });
  });

  if (!data) return <CircularProgress />;

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Транзакции в сети блокчейна</h4>
        <p className={classes.cardCategoryWhite}>
          Здесь представлены транзакции с нод блокчейна
        </p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor="primary"
          tableHead={[
            "Идентификатор транзакции",
            "Коносамент",
            "Получатель",
            "Дата создания",
            "Подпись",
          ]}
          tableData={data}
        />
      </CardBody>
    </Card>
  );
}
