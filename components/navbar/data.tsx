import Home from "@/public/icons/u_home-alt.svg";
import Dashboard from "@/public/icons/u_create-dashboard.svg";
import Box from "@/public/icons/u_box.svg";
import Analysis from "@/public/icons/u_analysis.svg";
import Calender from "@/public/icons/u_calender.svg";
import ClockFive from "@/public/icons/u_clock-five.svg";
import MoneyBill from "@/public/icons/u_money-bill.svg";

export const navItems = [
  { alt: "home", text: "Home", href: "/", icon: <Home /> },
  {
    icon: <Dashboard />,
    alt: "clients",
    text: "Clients",
    href: "/clients",
  },
  // {
  //   alt: "products",
  //   text: "Products",
  //   href: "/products",
  //   icon: <Box />,
  // },
  // {
  //   alt: "analytics",
  //   text: "Analytics",
  //   href: "/analytics",
  //   icon: <Analysis />,
  // },
  // {
  //   alt: "schedules",
  //   text: "Schedules",
  //   href: "/schedules",
  //   icon: <Calender />,
  // },
  // {
  //   alt: "history",
  //   text: "History",
  //   href: "/history",
  //   icon: <ClockFive />,
  // },
  // {
  //   alt: "sales",
  //   text: "Sales",
  //   href: "/sales",
  //   icon: <MoneyBill />,
  // },
];
