import React from "react";
import { Breadcrumb, Typography } from "antd";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCategory } from "../../../api/category";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const { Title, Text } = Typography;

interface FormType {
  _id: string;
  name: string;
}
const schema = yup.object({
  name: yup
    .string()
    .required("* Required to enter category name")
    .min(6, "* At least 6 characters")
    .trim(),
});
const CategoryAdd = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await createCategory({ ...data })
        .then(() => {
          toast.success(
            "Category created successfully, redirect after 3 seconds"
          );
          reset();
          setTimeout(() => navigate("/admin/category"), 3000);
        })
        .catch(() => {
          swal("This category already exists.", {
            icon: "error",
          });
        });
    } catch (error) {
      toast.error("Error! Please try again later.");
    }
  };
  return (
    <section className="home-section">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Category</Breadcrumb.Item>
        <Breadcrumb.Item>Category Add</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="home-content"
        style={{
          maxWidth: "70%",
          margin: "auto",
          padding: 40,
        }}
      >
        <Title level={2}>ADD CATEGORY</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Category name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter the name of the category"
              id="name"
              autoComplete="off"
              {...register("name")}
            />
            <Text type="danger">{errors.name?.message}</Text>
          </Form.Group>
          <Button style={{ marginTop: 20 }} variant="primary" type="submit">
            Add Category
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default CategoryAdd;
