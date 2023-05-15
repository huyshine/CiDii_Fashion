import React, { useEffect, useState } from "react";
import { Breadcrumb, Space, Table, Tag, Typography } from "antd";
import { listOrder, removeOrder } from "../../../api/order";
import { OrderType } from "../../../types/order";
import { NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";

const { Text, Title } = Typography;

const OrderList = () => {
  const [orders, setOrders] = useState<OrderType[]>();
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await listOrder();
      setOrders(data);
    };
    getOrders();
  }, []);
  const onHandleRemove = (id: string) => {
    try {
      swal({
        title: "Are you sure you want to delete?",
        text: "You cannot undo after deleting!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            removeOrder(id);
            swal("You have successfully deleted", {
              icon: "success",
            }).then(() => setOrders(orders?.filter((item) => item._id !== id)));
          }
        })
        .catch(() => {
          swal("Error! Deleting failed products", {
            icon: "error",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { title: "ID", dataIndex: "key" },
    {
      title: "Fullname",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <NavLink to={"/admin/order/detail/" + record.id}>
            <EditOutlined />
          </NavLink>
          <Text type="danger" onClick={() => onHandleRemove(record.id)}>
            <DeleteOutlined />
          </Text>
        </Space>
      ),
    },
  ];
  const data = orders?.map((order, index) => {
    return {
      key: index + 1,
      id: order._id,
      name: order.userOrder.name,
      email: order.userOrder.email,
      phone: order.userOrder.phone,
      address: order.userOrder.address,
      status:
        order.status == "0" ? (
          <Tag color="blue">Unconfimred</Tag>
        ) : order.status == "1" ? (
          <Tag color="lime">Confirmed</Tag>
        ) : (
          <Tag color="red">Cancel</Tag>
        ),
    };
  });
  return (
    <section className="home-section">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <div className="home-content" style={{ padding: 40 }}>
        <Title level={2}>ORDERS LIST</Title>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default OrderList;
