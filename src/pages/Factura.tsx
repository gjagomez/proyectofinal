import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { map, size } from "lodash";

type FacturaItem = {
  codigo: string;
  cliente: string;
  total: string;
  producto: string;
  precio: number;
  importe: number;
  cantidad: number;
};

const Factura = (props: any) => {
  const [data, setData] = useState<FacturaItem[]>([]);
  console.log(JSON.stringify(props.data));

  useEffect(() => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/countries_view?codigo=eq.${props.idfactura}&select=*`,
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
        setData(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(props.idfactura);
    // const url = `http://localhost:8080/consulta/${props.idfactura}`;
    // console.log(url);
    // axios
    //   .get(url)
    //   .then((response) => {
    //     setData(response.data);
    //     console.log("Respuesta del servicio:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error al realizar la solicitud:", error);
    //   });
  }, []);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      margin: 10,
    },
    section: {
      margin: 10,
      padding: 10,
    },
    header: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 10,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    total: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    margeNom: {
      paddingTop: 50,
      paddingBottom: 30,
    },
  });
  const formatQuetzales = (value: any) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(value);
  };

  return (
    <>
      <Document>
        {size(data) === 0 ? (
          <p>cargando</p>
        ) : (
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.header}>Factura</Text>
              <Text style={styles.header}>Sistema de ventas UMG</Text>
              <Text style={styles.header}>Factura:{data[0].codigo}</Text>
              <Text style={styles.margeNom}>Cliente: {data[0].cliente}</Text>

              <br />

              <table>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: 1,
                    borderColor: "#000",
                    padding: 5,
                  }}
                >
                  <View style={{ width: "60%", textAlign: "left" }}>
                    <Text>Producto</Text>
                  </View>
                  <View style={{ width: "20%", textAlign: "center" }}>
                    <Text>Cantidad</Text>
                  </View>
                  <View style={{ width: "20%", textAlign: "center" }}>
                    <Text>Precio</Text>
                  </View>
                  <View style={{ width: "20%", textAlign: "center" }}>
                    <Text>Importe</Text>
                  </View>
                </View>
                {data.map((item, index) => (
                  <View
                    style={{ flexDirection: "row", padding: 5 }}
                    key={index}
                  >
                    <View style={{ width: "60%", textAlign: "left" }}>
                      <Text>{item.producto}</Text>
                    </View>
                    <View style={{ width: "20%", textAlign: "center" }}>
                      <Text>{item.cantidad}</Text>
                    </View>
                    <View style={{ width: "20%", textAlign: "center" }}>
                      <Text>{item.precio}</Text>
                    </View>
                    <View style={{ width: "20%", textAlign: "center" }}>
                      <Text>{item.importe}</Text>
                    </View>
                  </View>
                ))}
              </table>

              <View style={styles.total}>
                <Text>Total:</Text>
                <Text>{formatQuetzales(data[0].total)}</Text>
              </View>
            </View>
          </Page>
        )}
      </Document>
    </>
  );
};

export default Factura;
