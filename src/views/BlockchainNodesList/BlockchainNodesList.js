import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getActiveBlockchainNodes } from "../../api/Blockchain";
import { CircularProgress } from "@material-ui/core";

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

export default function BlockchainNodesList() {
  const classes = useStyles();
  const [nodes, setNodes] = React.useState();

  useEffect(() => {
    getActiveBlockchainNodes((dt) => {
      let tableData = dt.map((val) => {
        return [val.id, val.node_name, val.host, val.creationDate];
      });
      setNodes(tableData);
    });
  }, []);

  if (!nodes) return <CircularProgress />;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              Список нод, подключенных к сети
            </h4>
            <p className={classes.cardCategoryWhite}>
              Здесь представлены экземпляры приложений, подключенных к единой
              блокчейн сети. Каждое приложение - это нода, хранящая свой
              экземпляр блокчейн цепочки данных. Каждая нода работает в
              изолированном докер контейнере, имитируя тем самым расположение в
              независимых организациях, местах, странах. Все ноды,
              представленные ниже активны, неактивные ноды автоматически
              удаляются из системы.
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Идентификатор ноды",
                "Название",
                "Хост",
                "Дата регистрации ноды",
              ]}
              tableData={nodes}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
