import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { cardLink, cardTitle } from "assets/jss/material-dashboard-react.js";
import { useHistory } from "react-router-dom";
import { getUserConsignments } from "../../api/Consignment";
import { CircularProgress } from "@material-ui/core";

const styles = {
  cardLink,
  cardTitle,
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

function renderConsingmentCard(cons, onClick) {
  return (
    <Card>
      <CardBody>
        <div>
          <h3 className={cardTitle}>Коносамент для {cons.receiver.title}</h3>
          <div>
            Идентификатор коносамента:
            {cons.id}
          </div>
          <div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Получатель:{" "}
            {cons.receiver.title + " " + cons.receiver.taxIdentifier}
          </div>
        </div>
        <Button onClick={onClick} color="primary">
          Подробная информация
        </Button>
      </CardBody>
    </Card>
  );
}

function renderConsignments(data) {
  const history = useHistory();
  return data.map((value) => {
    return renderConsingmentCard(value, () => {
      history.push(`/admin/consignment/${value.id}`);
    });
  });
}

export default function ConsignmentList() {
  const classes = useStyles();
  const [data, setData] = React.useState();

  useEffect(() => {
    getUserConsignments((dt) => {
      setData(dt);
      console.info(dt);
    });
  }, []);

  if (!data) return <CircularProgress />;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Коносаменты во владении</h4>
            <p className={classes.cardCategoryWhite}>
              Здесь представлены все коносаменты, которыми вы на данный момент
              владеете. Данные коносаменты вы можете передавать
            </p>
          </CardHeader>
          <CardBody>
            {data ? (
              renderConsignments(data)
            ) : (
              <CircularProgress color="secondary" />
            )}
            {}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
