import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message, Popconfirm, Input } from "antd";
import axios from "axios";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

interface DataType {
  id: number;
  codigo: string;
  producto: string;
  cantidad: number;
  precio: number;
}

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const initialData: DataType = {
    id: 0, // Estos valores deben ser reemplazados con los valores de DataEdit
    codigo: "",
    producto: "",
    cantidad: 0,
    precio: 0,
  };

  type DataIndex = keyof DataType;
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [DataEdit, setDataEdit] = useState<DataType>(initialData);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  useEffect(() => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/productos?select=*",
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
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get("http://localhost:8080/productos")
    //   .then((response) => {
    //     setProductos(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error al obtener los productos:", error);
    //   });
  }, []);
  const Update = async () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/productos?select=*",
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
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get("http://localhost:8080/productos")
    //   .then((response) => {
    //     setProductos(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error al obtener los productos:", error);
    //   });
  };
  const Eliminar = async (id: any) => {
    let data = "";

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/productos?id=eq.${id}`,
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
        Update();
      })
      .catch((error) => {
        console.log(error);
      });

    // try {
    //   await axios.delete(`http://localhost:8080/productos/${id}`);
    //   console.log("Producto eliminado correctamente.");
    //   Update();
    // } catch (error) {
    //   console.error("Error al eliminar el producto:", error);
    // }
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
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
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
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
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
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
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

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 25,
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "CODIGO",
      width: 50,
      dataIndex: "codigo",
      key: "codigo",
      ...getColumnSearchProps("codigo"),
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "PRODUCTO",
      dataIndex: "producto",
      key: "producto",
      ...getColumnSearchProps("producto"),
      sorter: (a, b) => a.producto.length - b.producto.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      width: 50,
      title: "CANTIDAD",
      key: "cantidad",
      dataIndex: "cantidad",
    },
    {
      width: 50,
      title: "PRECIO",
      key: "precio",
      dataIndex: "precio",
    },
    {
      title: "EDITAR",
      key: "action",
      width: 50,
      render: (_, record) => (
        <ModalForm<{
          id: number;
          codigo: string;
          producto: string;
          cantidad: number;
          precio: number;
        }>
          title="Nuevo Productos"
          trigger={
            <Button type="primary" onClick={() => setDataEdit(record)}>
              <EditOutlined />
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => window.location.reload(),
          }}
          submitter={{
            searchConfig: {
              submitText: "Actualizar",
              resetText: "Cancelar",
            },
          }}
          submitTimeout={2000}
          initialValues={DataEdit}
          onFinish={async (values) => {
            await waitTime(500);
            let data = JSON.stringify([
              {
                codigo: values.codigo,
                producto: values.producto,
                cantidad: values.cantidad,
                precio: values.precio,
                img: null,
              },
            ]);

            let config = {
              method: "patch",
              maxBodyLength: Infinity,
              url: `https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/productos?id=eq.${values.id}`,
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
                console.log(JSON.stringify(response.data));
                Update();
                message.success("El producto se actualizó con éxito");
              })
              .catch((error) => {
                console.log(error);
              });
            return true;
            //await waitTime(1000);
            // try {
            //   const response = await axios.put(
            //     `http://localhost:8080/productos/${values.id}`,
            //     values
            //   );
            //   if (response.status === 200) {
            //     Update();
            //     message.success("El producto se actualizó con éxito");
            //     console.log("El producto se actualizó con éxito");
            //   } else {
            //     message.error("Error al actualizar el producto");
            //     console.error("Error al actualizar el producto");
            //   }
            // } catch (error) {
            //   message.error(`Error al realizar la solicitud PUT:${error}`);
            //   console.error("Error al realizar la solicitud PUT:", error);
            // }
            //return true;
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="xs"
              name="id"
              label="ID"
              disabled
              tooltip="Id del producto"
              placeholder="id producto"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="codigo"
              label="Codigo"
              tooltip="Codigo de producto"
              placeholder="Codigo producto"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="xl"
              name="producto"
              label="producto"
              tooltip="Ingreses el nombre del producto"
              placeholder="Ingrese nombre del producto"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="sm"
              name="cantidad"
              label="Cantidad"
              placeholder="Ingrese una cantidad"
            />
            <ProFormText
              width="sm"
              name="precio"
              label="Precio"
              placeholder="Ingrese el precion"
            />
          </ProForm.Group>
        </ModalForm>
      ),
    },
    {
      title: "ELIMINAR",
      key: "action",
      width: 50,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Eliminar"
            description="Esta seguro de eliminar el producto"
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

  const data: DataType[] = [];
  const [form] = Form.useForm<{
    id: number;
    codigo: string;
    producto: string;
    cantidad: number;
    precio: number;
  }>();
  return (
    <div>
      <ModalForm<{
        codigo: string;
        producto: string;
        cantidad: number;
        precio: number;
      }>
        title="Nuevo Productos"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            Nuevo Producto
          </Button>
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log("run"),
        }}
        submitter={{
          searchConfig: {
            submitText: "Guardar",
            resetText: "Cancelar",
          },
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);

          let data = JSON.stringify([
            {
              codigo: values.codigo,
              producto: values.producto,
              cantidad: values.cantidad,
              precio: values.precio,
              img: null,
            },
          ]);

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/productos",
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
              console.log(JSON.stringify(response.data));
              message.success("Producto Guardado");
              Update();
            })
            .catch((error) => {
              console.log(error);
            });

          // const url = "http://localhost:8080/productos";

          // const data = {
          //   codigo: values.codigo,
          //   producto: values.producto,
          //   cantidad: values.cantidad,
          //   precio: values.precio,
          //   img: "nulo",
          // };

          // axios
          //   .post(url, data)
          //   .then((response) => {
          //     message.success("Producto Guardado");
          //     Update();
          //   })
          //   .catch((error) => {
          //     message.error("Error al guardar el producto");
          //   });

          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="codigo"
            label="Codigo"
            tooltip="Codigo de producto"
            placeholder="Codigo producto"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="xl"
            name="producto"
            label="producto"
            tooltip="Ingreses el nombre del producto"
            placeholder="Ingrese nombre del producto"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="cantidad"
            label="Cantidad"
            placeholder="Ingrese una cantidad"
          />
          <ProFormText
            width="sm"
            name="precio"
            label="Precio"
            placeholder="Ingrese el precion"
          />
        </ProForm.Group>
      </ModalForm>
      {contextHolder}
      <Table columns={columns} dataSource={productos} />
    </div>
  );
};

export default Productos;
