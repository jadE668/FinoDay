import React, { Component } from "react";
import Muted from "components/Typography/Muted.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import PropTypes from "prop-types";

import {
  cardTitle,
  cardSubtitle,
  cardLink,
} from "assets/jss/material-dashboard-react.js";
import { CircularProgress, withStyles } from "@material-ui/core";
import { getUserConsignment, transferConsignment } from "../../api/Consignment";
import Table from "../../components/Table/Table";
import Button from "../../components/CustomButtons/Button";

const styles = {
  cardTitle,
  cardSubtitle,
  cardLink,
  typo: {
    paddingLeft: "15%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "10px",
    position: "absolute",
    width: "260px",
  },
  nameText: {
    marginLeft: "20px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

class ConsignmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    getUserConsignment(id, (dt) => {
      this.setState({
        data: dt,
      });
    });
  }

  getPortName(port) {
    return `${port.country},${port.location}; ${port.title} (${port.locode})`;
  }

  callback() {
    history.back();
  }

  render() {
    const { classes } = this.props;
    const id = this.props.match.params.id;

    if (!this.state.data) return <CircularProgress />;

    return (
      <div>
        <Card>
          <CardBody>
            <h2 className={classes.cardTitle}>Информация о коносаменте</h2>
            <Muted>
              <h6 className={classes.cardSubtitle}>
                Идентификатор документа {id}
              </h6>
            </Muted>
            <Table
              tableHeaderColor="primary"
              tableHead={["Свойство", "Значение"]}
              tableData={[
                ["Отправитель", this.state.data.sender.title],
                ["Выдан в", this.state.data.createdAt],
                ["Получатель", this.state.data.receiver.title],
                [
                  "Порт отправления",
                  this.getPortName(this.state.data.departurePort),
                ],
                ["Порт прибытия", this.getPortName(this.state.data.port)],
                ["Текущий владелец", this.state.data.sender.title],
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className={classes.cardTitle}>Опись перевозимого груза</h2>
            <Muted>
              <h6 className={classes.cardSubtitle}>
                Идентификатор документа {id}
              </h6>
            </Muted>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Номер контейнера",
                "Вес",
                "Габариты",
                "Описание груза",
                "Дата погрузки на судно",
              ]}
              tableData={[
                [
                  "CCLAQ19266461",
                  "650KG/2.200CBM/31CTNS",
                  "2.200CBM",
                  "PARKING SESNOR, CAR ALARM, HID KIT",
                  "05-Apr-2021",
                ],
                [
                  "ARZVP252325441",
                  "650KG/2.200CBM/31CTNS",
                  "2.200CBM",
                  "PARKING SESNOR, CAR ALARM, HID KIT",
                  "05-Apr-2021",
                ],
                [
                  "CCLAQ192613261",
                  "650KG/2.200CBM/31CTNS",
                  "2.200CBM",
                  "PARKING SESNOR, CAR ALARM, HID KIT",
                  "05-Apr-2021",
                ],
              ]}
            />

            <Button
              disabled={this.state.data.flagTransfer}
              onClick={() => {
                transferConsignment(id, () => {
                  window.location.href =
                    "http://blockchain.core.borisof.ru/admin/consignments/";
                });
              }}
              color="primary"
            >
              {this.state.data.flagTransfer
                ? "Коносамент уже перенесен"
                : "Передать коносамент получателю"}
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

ConsignmentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsignmentDetails);
