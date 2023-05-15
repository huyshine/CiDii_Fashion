import React, { useEffect, useState } from "react";
import { Breadcrumb, Typography } from "antd";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryType } from "../../../types/category";
import { readCategory, updateCategory } from "../../../api/category";

const { Title, Text } = Typography;

const schema = yup.object({
  name: yup
    .string()
    .required("* Required to enter category name")
    .min(6, "* At least 6 characters")
    .trim(),
});

const CategoryEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryType>({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  // Get category by ID
  const [categories, setCategories] = useState<CategoryType>();
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await readCategory(id as string);
      reset(data);
      setCategories(data.category);
    };
    getCategory();
  }, []);
  // Submit form
  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    try {
      await updateCategory(data);
      toast.success("Category updated successfully");
      reset();
      navigate("/admin/category");
    } catch (error) {
      toast.error("Error! Please try again later.");
    }
  };
  return (
    <section className="home-section">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Category</Breadcrumb.Item>
        <Breadcrumb.Item>Category Update</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="home-content"
        style={{
          maxWidth: "70%",
          margin: "auto",
          padding: 40,
        }}
      >
        <Title level={2}>UPDATE CATEGORY</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter the name of the category"
              id="name"
              autoComplete="off"
              {...register("name")}
            />
            <Text type="danger">{errors.name?.message}</Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Category
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default CategoryEdit;
