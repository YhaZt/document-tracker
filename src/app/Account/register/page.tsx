
"use client";
import React from "react";
import { Card, Form, Input, Button, Typography, Divider } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-700 py-12">
      <Card
        className="w-full max-w-lg shadow-2xl rounded-2xl border-0 backdrop-blur-lg"
        styles={{ body: { padding: "3rem 2.5rem" } }}
        style={{ background: "rgba(255,255,255,0.99)" }}
      >
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-6 mb-5 shadow-2xl">
            <UserAddOutlined className="text-7xl text-white" />
          </div>
          <Typography.Title level={1} className="!mb-0 !font-extrabold text-center text-gray-900 drop-shadow-2xl">
            Create your account
          </Typography.Title>
          <Typography.Text className="text-center text-gray-500 mt-4 text-lg">
            Join our platform and experience a modern, secure dashboard.
          </Typography.Text>
        </div>
        <Divider className="!my-10" />
        <Form layout="vertical" size="large" className="space-y-4">
          <Form.Item
            label={<span className="font-semibold text-base">Full Name <span className="text-red-500">*</span></span>}
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
            hasFeedback
          >
            <Input
              placeholder="Your full name"
              className="rounded-lg border-2 border-blue-200 focus:border-blue-500"
              autoComplete="name"
              allowClear={false}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-base">Email Address <span className="text-red-500">*</span></span>}
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email address" }]}
            hasFeedback
          >
            <Input
              placeholder="you@email.com"
              className="rounded-lg border-2 border-blue-200 focus:border-blue-500"
              autoComplete="email"
              allowClear={false}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-base">Password <span className="text-red-500">*</span></span>}
            name="password"
            rules={[{ required: true, message: "Please create a password" }]}
            hasFeedback
          >
            <Input.Password
              placeholder="Create a password"
              className="rounded-lg border-2 border-blue-200 focus:border-blue-500"
              autoComplete="new-password"
              allowClear={false}
              visibilityToggle
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-base">Confirm Password <span className="text-red-500">*</span></span>}
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password" }]}
            hasFeedback
          >
            <Input.Password
              placeholder="Repeat your password"
              className="rounded-lg border-2 border-blue-200 focus:border-blue-500"
              autoComplete="new-password"
              allowClear={false}
              visibilityToggle
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-xl border-0"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <Divider className="!my-10" />
        <div className="text-center">
          <span className="text-gray-600 text-base">Already have an account?</span>
          <Link href="/Account/login" className="text-blue-600 hover:underline font-semibold ml-2">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
