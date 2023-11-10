import React, { useState, useEffect } from "react";
import { ProCard } from "@ant-design/pro-components";
import {
  Statistic,
  Divider,
  AutoComplete,
  Button,
  Form,
  message,
  Input,
  Table,
  Drawer,
  Space,
} from "antd";
import RcResizeObserver from "rc-resize-observer";
import { UserAddOutlined, SaveOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import axios from "axios";
import Factura from "./Factura";
import type { DrawerProps } from "antd/es/drawer";
import { PDFViewer } from "@react-pdf/renderer";

interface Cliente {
  id: number;
  dpi: string;
  nombre: string;
  telefono: string;
}
interface Product {
  id: number;
  codigo: string;
  producto: string;
  cantidad: number;
  precio: number;
  importe: number;
}

type FacturaItem = {
  codigo: string;
  cliente: string;
  total: string;
  producto: string;
  precio: number;
  importe: number;
  cantidad: number;
};
const Principal = () => {
  const [responsive, setResponsive] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [scannedCode, setScannedCode] = useState("");
  const [searching, setSearching] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [TotalF, setTotalF] = useState(0);
  const [valueCLi, setValueCli] = useState("");
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [codFact, setcodFact] = useState("");
  const [dataProps, setData] = useState<FacturaItem[]>([]); // Inicializamos data como un arreglo vacío

  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [form] = Form.useForm<{
    dpi: string;
    nombre: string;
    telefono: string;
  }>();

  const [formc] = Form.useForm<{
    total: string;
    efectivo: string;
  }>();

  const onChange = (data: string) => {
    setValueCli(data);
  };
  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      with: 25,
    },
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      with: 25,
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      with: 25,
    },
  ];

  useEffect(() => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/clientes?select=*",
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
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalImporte = products.reduce(
    (total, product) => total + product.importe,
    0
  );

  const Update = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/clientes?select=*",
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
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const options = clientes.map((cliente) => ({
    value: cliente.nombre,
  }));

  const generateUniqueCode = () => {
    const uniqueCode = `code_${counter}`;
    setCounter(counter + 1);
    return uniqueCode;
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const handleBarcodeScan = async () => {
    setSearching(true);
    try {
      const response = await fetch(
        `https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/productos?codigo=eq.${scannedCode}&select=*`,
        {
          method: "GET",
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
          },
        }
      );

      if (response.ok) {
        const product = await response.json();
        product.key = product.id;
        const NueOb = [
          {
            id: product[0].id,
            codigo: product[0].codigo,
            producto: product[0].producto,
            cantidad: 1,
            precio: product[0].precio,
            importe: parseFloat(product[0].precio) * 1,
          },
        ];
        setProducts([...products, NueOb[0]]);
      }
    } catch (error) {
      console.error("Error al obtener el producto", error);
    } finally {
      setScannedCode("");
      setSearching(false);
    }
  };

  return (
    <div>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard.Group title="Cobro" direction={responsive ? "column" : "row"}>
          <ProCard>
            <Form name="customized_form_controls" layout="inline">
              <Form.Item name="cliente" label="Cliente">
                <AutoComplete
                  style={{ width: 350 }}
                  options={options}
                  placeholder="Escriba el nombre del cliente"
                  filterOption={(inputValue, option) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onChange={onChange}
                />{" "}
                &nbsp;
                <ModalForm<{
                  dpi: string;
                  nombre: string;
                  telefono: string;
                }>
                  title="Nuevo Cliente"
                  trigger={
                    <Button type="primary">
                      <UserAddOutlined />
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
                    let data = values;

                    let config = {
                      method: "post",
                      maxBodyLength: Infinity,
                      url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/clientes",
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
                        message.success("Cliente guardado");
                      })
                      .catch((error) => {
                        console.log(error);
                      });

                    await waitTime(500);
                    return true;
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      width="md"
                      name="dpi"
                      label="DPI"
                      tooltip="Dpi del cliente"
                      placeholder="Ingreso de dpi"
                    />

                    <ProFormText
                      width="md"
                      name="nombre"
                      label="NOMBRE"
                      placeholder="Nombre del cliente"
                    />
                  </ProForm.Group>

                  <ProFormText
                    width="xs"
                    name="telefono"
                    label="TELEFONO"
                    placeholder="Telefono del cliente"
                  />
                </ModalForm>
              </Form.Item>
              <Form.Item></Form.Item>
            </Form>
          </ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard></ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard></ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />

          <ProCard>
            <ModalForm<{
              total: string;
              efectivo: string;
            }>
              title="Cobrar"
              trigger={
                <Button type="primary" danger>
                  <SaveOutlined />
                  Cobrar
                </Button>
              }
              width={450}
              form={formc}
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
                const IdFac = uuidv4();
                const NuewOb = [];
                for (let i = 0; i < products.length; i++) {
                  const item = products[i];
                  const modifiedItem = {
                    factura: IdFac,
                    idprod: item.codigo,
                    producto: item.producto,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    importe: item.importe,
                  };
                  NuewOb.push(modifiedItem);
                }

                let data = JSON.stringify([
                  {
                    codigo: IdFac,
                    cliente: valueCLi,
                    total: values.efectivo,
                  },
                ]);

                let config = {
                  method: "post",
                  maxBodyLength: Infinity,
                  url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/factura",
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
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                let config2 = {
                  method: "post",
                  maxBodyLength: Infinity,
                  url: "https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/detallefactura",
                  headers: {
                    apikey:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dGdscmhrdXdiaGRoam56dGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTYxNTMsImV4cCI6MjAxNDc5MjE1M30.Vjbtnw4F6DgIR37vqeqy53Bp5eLqGeyW6In4ypOwG18",
                    "Content-Type": "application/json",
                  },
                  data: NuewOb,
                };

                axios
                  .request(config2)
                  .then((response) => {
                    console.log(JSON.stringify(response.data));
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                setcodFact(IdFac);
                // LoadFactura(IdFac);
                showLargeDrawer();
                await waitTime(2000);
                return true;
              }}
            >
              <ProForm.Group>
                <ProFormText
                  width="lg"
                  name="efectivo"
                  label="EFECTIVO"
                  placeholder="Efectivo"
                />
              </ProForm.Group>
            </ModalForm>
          </ProCard>
        </ProCard.Group>
      </RcResizeObserver>

      <Input
        placeholder="Escanea un código de barras"
        value={scannedCode}
        onChange={(e: any) => setScannedCode(e.target.value)}
        onPressEnter={handleBarcodeScan}
      />
      <Table dataSource={products} columns={columns} />
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard.Group title="" direction={responsive ? "column" : "row"}>
          <ProCard></ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard></ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />
          <ProCard></ProCard>
          <Divider type={responsive ? "horizontal" : "vertical"} />

          <ProCard>
            <h2>TOTAL Q {totalImporte}</h2>
          </ProCard>
        </ProCard.Group>
      </RcResizeObserver>

      <Drawer
        title={"Impresion"}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <PDFViewer style={{ border: "none", width: "100%", height: "800px" }}>
          <Factura idfactura={codFact} />
        </PDFViewer>
      </Drawer>
    </div>
  );
};

export default Principal;
