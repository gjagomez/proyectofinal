import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  View,
  Text,
  PDFDownloadLink,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import axios from "axios";

interface Producto {
  id: number;
  codigo: string;
  producto: string;
  cantidad: number;
  precio: number;
  img: string;
}
const Reporte = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos de productos
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
    //   .get<Producto[]>("http://localhost:8080/productos")
    //   .then((response) => {
    //     setProductos(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error al obtener datos de productos", error);
    //   });
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      width: "100%",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      borderBottom: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      flex: 1,
      border: 1,
      padding: 4,
    },
  });

  return (
    <PDFViewer style={{ border: "none", width: "100%", height: "800px" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Lista de Productos</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Código</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Producto</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Cantidad</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>Precio</Text>
                </View>
              </View>
              {productos.map((producto) => (
                <View style={styles.tableRow} key={producto.id}>
                  <View style={styles.tableCell}>
                    <Text>{producto.codigo}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{producto.producto}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{producto.cantidad}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{producto.precio}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Reporte;
