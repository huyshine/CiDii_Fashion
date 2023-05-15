import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ProductType } from "../../../types/product";
import { Table, Space, Typography, Button, Breadcrumb, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import { getAll, remove } from "../../../api/product";
import { Currency } from "../../../utils";

const { Text, Title } = Typography;

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAll();
      setProducts(data);
    };
    getProducts();
  }, []);

  const onHandleRemove = (record: ProductType) => {
    try {
      swal({
        title: "Are you sure you want to delete?",
        text: "You cannot undo after deleting!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          remove(record._id);
          swal("You have successfully deleted", {
            icon: "success",
          }).then(() =>
            setProducts(products.filter((item) => item._id !== record._id))
          );
        }
      }).catch(() => {
        swal("Error! Deleting failed products",{
          icon: "error"
        })
      });
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <a>
          <Image src={image} alt="" width={200} />
        </a>
      ),
    },
    {
      title: "Price (USD)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (record: ProductType) => (
        <Space size="middle">
          <NavLink to={"/admin/products/edit/" + record._id}>
            <EditOutlined />
          </NavLink>
          <Text type="danger" onClick={() => onHandleRemove(record)}>
            <DeleteOutlined />
          </Text>
        </Space>
      ),
    },
  ];

  const data = products?.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      name: item.name,
      price: Currency(item.price),
      category: item.category.name,
      description: item.description,
      image: item.image,
    };
  });
  return (
    <section className="home-section">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div className="home-content" style={{ padding: 40 }}>
        <Title level={2}>PRODUCTS LIST</Title>
        <Button type="primary" style={{ marginBottom: 16 }} ghost>
          <NavLink to={"add"}>Add Product</NavLink>
        </Button>
        <Table dataSource={data} columns={columns} />
      </div>
    </section>
  );
};

export default ProductList;
