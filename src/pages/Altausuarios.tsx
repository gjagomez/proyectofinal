import React, { useState, useEffect, useRef } from "react";
import {
  SaveOutlined,
  UsergroupAddOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import {
  Button,
  Popconfirm,
  Space,
  Table,
  Col,
  Avatar,
  Drawer,
  Form,
  Input,
  Row,
  message,
  Select,
} from "antd";
import axios from "axios";

import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnType, ColumnsType } from "antd/es/table";
export type TableListItem = {
  id: number;
  email: string;
  nombre: string;
  rol: number;
  avatar: string;
};
type DataIndex = keyof TableListItem;
const Altausuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Usuario guardado correctamente",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Usuario eliminado correctamente",
    });
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const Eliminar = (id: any) => {
    let data = "";

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios?id=eq.${id}`,
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        update();
        error();
      })
      .catch((error) => {
        console.log(error);
      });

    // let config = {
    //   method: "delete",
    //   maxBodyLength: Infinity,
    //   url: `http://localhost:8080/usuarios/${id}`,
    //   headers: {},
    //   data: "",
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     update();
    //     error();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const onFinish = async (values: any) => {
    let data = JSON.stringify([
      {
        email: values.email,
        nombre: values.nombre,
        clave: values.clave,
        rol: 1,
        avatar:
          "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg",
      },
    ]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        success();
        update();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // const url = "http://localhost:8080/usuario";
    // const data = {
    //   email: values.email,
    //   nombre: values.nombre,
    //   clave: values.clave,
    //   rol: values.rol,
    //   avatar:
    //     "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg",
    // };
    // try {
    //   const response = await axios.post(url, data, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   success();
    //   update();
    //   setOpen(false);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<TableListItem> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<TableListItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      ...getColumnSearchProps("nombre"),
      sorter: (a, b) => a.nombre.length - b.nombre.length,
      sortDirections: ["descend", "ascend"],
      width: "40%",
    },
    {
      title: "Avatar",
      key: "avatar",
      dataIndex: "avatar",
      render: (_, { avatar }) => (
        <>
          <Avatar size="large" src={avatar} />
        </>
      ),
    },
    {
      title: "Eliminar",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Eliminar"
            description="Esta seguro de eliminar el usuario"
            onConfirm={() => Eliminar(record.id)}
            okText="Si"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios?select=*",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .get("https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios?select=*")
    //   .then((res) => {
    //     setUsuarios(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  const update = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios?select=*",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .get("https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios?select=*")
    //   .then((res) => {
    //     setUsuarios(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        icon={<UsergroupAddOutlined />}
        onClick={showDrawer}
        size={"large"}
      >
        Agregar
      </Button>
      <Table dataSource={usuarios} columns={columns} />
      <Drawer
        title="Crear cuenta"
        placement="left"
        width={720}
        onClose={onClose}
        open={open}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "El correo es necesario" }]}
              >
                <Input placeholder="Ingrese su correo electronico" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="clave"
                label="Password"
                rules={[{ required: true, message: "ingrese su password" }]}
              >
                <Input.Password placeholder="input password" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: "Ingrese su nombre" }]}
              >
                <Input placeholder="Ingrese su nombre" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="rol"
                label="Rol"
                rules={[{ required: true, message: "Rol de usuarios" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  options={[
                    {
                      value: "1",
                      label: "Admin",
                    },
                    {
                      value: "2",
                      label: "Ventas",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                htmlType="submit"
                danger
              >
                Guardar usuario
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default Altausuarios;
