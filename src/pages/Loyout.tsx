import React from "react";
import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";

import { useState } from "react";
import defaultProps from "./_defaultProps";
import { ProConfigProvider } from "@ant-design/pro-provider";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

const Loyout = ({ children }: React.PropsWithChildren<{}>) => {
  const [Thema, setThema] = useState<boolean>(true);
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
  };

  const [pathname, setPathname] = useState("/list/sub-page/sub-sub-page1");

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProConfigProvider dark={Thema}>
        <ProLayout
          theme="light"
          title="Sistema de venta (UMG)"
          bgLayoutImgList={[
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              left: 85,
              bottom: 100,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
              bottom: -68,
              right: -45,
              height: "303px",
            },
            {
              src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
              bottom: 0,
              left: 0,
              width: "331px",
            },
          ]}
          {...defaultProps}
          location={{
            pathname,
          }}
          menu={{
            type: "group",
          }}
          avatarProps={{
            src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
            size: "small",
            title: "Javier Gomez",
          }}
          actionsRender={(props: any) => {
            if (props.isMobile) return [];
            return [
              props.layout !== "side" && document.body.clientWidth > 1400 ? (
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Input
                    style={{
                      borderRadius: 4,
                      marginInlineEnd: 12,
                      backgroundColor: "rgba(0,0,0,0.03)",
                    }}
                    prefix={
                      <SearchOutlined
                        style={{
                          color: "rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    }
                    placeholder="Buscar"
                    bordered={false}
                  />
                  <PlusCircleFilled
                    style={{
                      color: "var(--ant-primary-color)",
                      fontSize: 24,
                    }}
                  />
                </div>
              ) : undefined,
              <InfoCircleFilled
                key="InfoCircleFilled"
                onClick={() => {
                  setThema(!Thema);
                }}
              />,
              <QuestionCircleFilled
                key="QuestionCircleFilled"
                onClick={() => {
                  window.open(
                    "https://drive.google.com/file/d/1eIjP61xq7LHQOhOYcalsKEOfbFpVXTqj/view?usp=sharing",
                    "_blank"
                  );
                }}
              />,

              <GithubFilled
                key="GithubFilled"
                onClick={() => {
                  window.open("https://github.com/gjagomez/", "_blank");
                }}
              />,
            ];
          }}
          menuFooterRender={(props: any) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: "center",
                  paddingBlockStart: 12,
                }}
              >
                <div>© Umg </div>
                <div>by grupo 1</div>
              </div>
            );
          }}
          onMenuHeaderClick={(e: any) => console.log(e)}
          menuItemRender={(item: any, dom: any) => (
            <div
              onClick={() => {
                setPathname(item.path || "/noasdfasfasdfasd");
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          <PageContainer>
            <ProCard
              style={{
                height: "100vh",
                minHeight: 800,
              }}
            >
              {children}
              <div />
            </ProCard>
          </PageContainer>
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};

export default Loyout;
