import Dashboard from "@material-ui/icons/Dashboard";
import Grain from "@material-ui/icons/Grain";
import HistoryIcon from "@material-ui/icons/History";
import Business from "@material-ui/icons/Business";
import Description from "@material-ui/icons/Description";
import DashboardPage from "views/Dashboard/Dashboard.js";
import CompanyInfo from "views/CompanyInfo/CompanyInfo.js";
import BlockchainNodesList from "views/BlockchainNodesList/BlockchainNodesList.js";
import ConsignmentDetails from "views/ConsignmentDetails/ConsignmentDetails.js";
import History from "views/Notifications/History.js";
import ConsignmentList from "views/ConsignmentList/ConsignmentList.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Начальная страница",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/company",
    name: "Профиль компании",
    icon: Business,
    component: CompanyInfo,
    layout: "/admin",
  },
  {
    path: "/blockchain",
    name: "Блокчейн сеть",
    icon: Grain,
    component: BlockchainNodesList,
    layout: "/admin",
  },
  {
    path: "/transactions",
    name: "История транзакций",
    icon: HistoryIcon,
    component: History,
    layout: "/admin",
  },
  {
    path: "/consignments/",
    name: "Коносаменты",
    icon: Description,
    component: ConsignmentList,
    layout: "/admin",
  },
  {
    path: "/consignment/:id",
    name: "Просмотр коносамента",
    hidden: true,
    component: ConsignmentDetails,
    layout: "/admin",
  },
];

export default dashboardRoutes;
