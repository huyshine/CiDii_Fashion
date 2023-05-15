import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Breadcrumb, Typography, Image } from "antd";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { add } from "../../../api/product";
import { CategoryType } from "../../../types/category";
import { listCategory } from "../../../api/category";
import { uploadImage } from "../../../utils";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type FormType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Required to enter product name")
    .min(6, "* At least 6 characters")
    .trim(),
  price: yup
    .string()
    .required("* Required to enter product price")
    .test("min", "Please re-enter the price", (price) => Number(price) > 0),
  description: yup
    .string()
    .required("* Required to enter product description")
    .min(6, "* At least 6 characters")
    .max(255, "* Up to 255 characters")
    .trim(),
  image: yup.mixed().test("require","* Please select a product image", image => image.length),
  category: yup.string().required("* Please select a product category"),
});
const ProductAdd = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });
  // get Category
  const [categories, setCategories] = useState<CategoryType[]>();
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await listCategory();
      setCategories(data);
    };
    getCategory();
  }, []);
  // preview Image
  const [previewImage, setPreviewImage] = useState<string>();
  const handlePreviewImage = (e: any) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  // Submit form
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const url = await uploadImage(data.image[0]);
      await add({ ...data, image: url });
      toast.success("Product created successfully, redirect after 3 seconds");
      setPreviewImage("");
      reset();
      setTimeout(() => navigate("/admin/products"), 3000);
    } catch (error: any) {
      toast.error("Error! Please try again later.");
    }
  };
  return (
    <section className="home-section">
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>Product Add</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="home-content"
        style={{
          maxWidth: "70%",
          margin: "auto",
          padding: 40,
        }}
      >
        <Title level={2}>PRODUCTS ADD</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Product's name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter the name of the product"
              autoComplete="off"
              {...register("name")}
            />
            <Text type="danger">{errors.name?.message}</Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Please enter the price of the product"
              autoComplete="off"
              {...register("price")}
            />
            <Text type="danger">{errors.price?.message}</Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select {...register("category")}>
              <option value="">Select a category</option>
              {categories?.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
            <Text type="danger">{errors.category?.message}</Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Please enter product description"
              autoComplete="off"
              style={{ height: "100px" }}
              {...register("description")}
            />
            <Text type="danger">{errors.description?.message}</Text>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              {...register("image")}
              onChange={(e) => handlePreviewImage(e)}
            />
            <Text type="danger">{errors.image?.message}</Text>
          </Form.Group>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Preview Image
            </label>
            <div className="mt-1">
              <Image
                src={
                  previewImage ||
                  "https://res.cloudinary.com/do9rcgv5s/image/upload/v1669841925/no-image-icon-6_ciydgz.png"
                }
                alt="Preview Image"
                className="h-8 w-full object-cover rounded-md"
                style={{ height: "300px" }}
              />
            </div>
          </div>
          <Button style={{marginTop: 20}} variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ProductAdd;
