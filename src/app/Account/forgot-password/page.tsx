
"use client";
import React from "react";
import { Card, Form, Input, Button, Typography, Divider } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 py-8">
      <Card
        className="w-full max-w-lg shadow-2xl rounded-2xl border-0"
        styles={{ body: { padding: "2.5rem 2rem" } }}
        style={{ background: "rgba(255,255,255,0.95)" }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 rounded-full p-4 mb-3 shadow-lg">
            <KeyOutlined className="text-5xl text-white" />
          </div>
          <Typography.Title level={2} className="!mb-0 !font-extrabold text-center text-gray-800 drop-shadow-lg">
            Forgot your password?
          </Typography.Title>
          <Typography.Text className="text-center text-gray-500 mt-2">
            Enter your email address and we'll send you a link to reset your password.
          </Typography.Text>
        </div>
        <Divider className="!my-6" />
        <Form layout="vertical" size="large" className="space-y-2">
          <Form.Item
            label={<span className="font-semibold text-base">Email Address <span className="text-red-500">*</span></span>}
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email address" }]}
            hasFeedback
          >
            <Input
              placeholder="you@email.com"
              className="rounded-lg"
              autoComplete="email"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md border-0"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
        <Divider className="!my-6" />
        <div className="text-center">
          <Link href="/Account/login" className="text-blue-600 hover:underline font-semibold">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
