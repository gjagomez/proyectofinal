import React from "react";
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from "@ant-design/icons";

import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, message, Space, Tabs, theme } from "antd";

import type { CSSProperties } from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import Principal from "./Principal";
type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>("phone");
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  function esArregloVacio(arr: any[]): boolean {
    return arr.length === 0;
  }
  const handleLogin = async (values: any) => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://qvtglrhkuwbhdhjnzthf.supabase.co/rest/v1/usuarios?email=eq.${values.email}&select=*`,
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
        if (esArregloVacio(response.data)) {
          messageApi.open({
            type: "error",
            content: "Usuario y contraseña no coinciden",
          });
          return;
        }
        if (response.data[0].clave == values.clave) {
          navigate("/principal");
        } else {
          messageApi.open({
            type: "error",
            content: "Usuario y contraseña no coinciden",
          });
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error,
        });
      });

    // axios
    //   .post("http://localhost:8080/usuarios/login", values)
    //   .then((response) => {
    //     navigate("/principal");
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        onFinish={async (values) => {
          handleLogin(values);
        }}
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.80)",
          backdropFilter: "blur(4px)",
        }}
        subTitle=""
        submitter={{ searchConfig: { submitText: "Ingresar" } }}
        activityConfig={{
          style: {
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(4px)",
          },
          title: "Proyecto final UMG progra 2023",
          subTitle: "",
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain>
              <span
                style={{
                  color: token.colorTextPlaceholder,
                  fontWeight: "normal",
                  fontSize: 14,
                }}
              ></span>
            </Divider>
          </div>
        }
      >
        <Tabs centered activeKey={loginType}>
          <Tabs.TabPane key={"account"} tab={"Iniciar sesión"} />
        </Tabs>

        <>
          <ProFormText
            name="email"
            fieldProps={{
              size: "large",
              prefix: (
                <UserOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={"prefixIcon"}
                />
              ),
            }}
            placeholder={"Correo electrónico"}
            rules={[
              {
                required: true,
                message: "Email incorrecto!",
              },
            ]}
          />
          <ProFormText.Password
            name="clave"
            fieldProps={{
              size: "large",
              prefix: (
                <LockOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={"prefixIcon"}
                />
              ),
            }}
            placeholder={"Contraseña"}
            rules={[
              {
                required: true,
                message: "Escriba la contraseña de tu cuenta",
              },
            ]}
          />
        </>

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Recordame
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            Registrarte
          </a>
        </div>
        {contextHolder}
      </LoginFormPage>
    </div>
  );
};
const Login = () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};

export default Login;
