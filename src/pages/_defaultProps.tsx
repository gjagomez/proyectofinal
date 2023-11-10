import {
  ShopOutlined,
  CrownFilled,
  CopyOutlined,
  TabletFilled,
} from "@ant-design/icons";

export default {
  route: {
    path: "/",
    routes: [
      {
        icon: <TabletFilled />,
        path: "/list",
        component: "./ListTableList",
        routes: [
          {
            path: "/productos",
            name: "Facturacion",
            icon: <ShopOutlined />,
            component: "/productos",
          },
        ],
      },
    ],
  },
  appList: [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      title: "Usuarios",
      desc: "Agregar usuarios",
      url: "/users",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/1005/1005769.png",
      title: "Productos",
      desc: "Agregar Productos",
      url: "/productos",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/235/235253.png",
      title: "Reportes",
      desc: "Reportes",
      url: "/reportes",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2657/2657138.png",
      title: "Facturacion",
      desc: "Facturacion",
      url: "/principal",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/7887/7887104.png",
      title: "Manual de usuarios",
      desc: "Manual de usuario",
      url: "https://drive.google.com/file/d/1eIjP61xq7LHQOhOYcalsKEOfbFpVXTqj/view?usp=sharing",
      target: "_blank",
    },
  ],
};
