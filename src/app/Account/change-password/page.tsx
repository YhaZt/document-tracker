
"use client";
import React from "react";
import { Card, Form, Input, Button, Typography, Divider } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Link from "next/link";

const ChangePassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-600 py-10">
      <Card
        className="w-full max-w-md shadow-2xl rounded-2xl border-0 backdrop-blur-lg"
        styles={{ body: { padding: "2.5rem 2rem" } }}
        style={{ background: "rgba(255,255,255,0.98)" }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-5 mb-4 shadow-xl">
            <LockOutlined className="text-5xl text-white" />
          </div>
          <Typography.Title level={1} className="!mb-0 !font-extrabold text-center text-gray-900 drop-shadow-xl">
            Change Password
          </Typography.Title>
          <Typography.Text className="text-center text-gray-500 mt-3 text-lg">
            Update your password for enhanced security.
          </Typography.Text>
        </div>
        <Divider className="!my-8" />
        <Form layout="vertical" size="large" className="space-y-3">
          <Form.Item
            label={<span className="font-semibold text-base">Current Password <span className="text-red-500">*</span></span>}
            name="currentPassword"
            rules={[{ required: true, message: "Please enter your current password" }]}
            hasFeedback
          >
            <Input.Password
              placeholder="Current password"
              className="rounded-lg"
              autoComplete="current-password"
              allowClear={false}
              visibilityToggle
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-base">New Password <span className="text-red-500">*</span></span>}
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password" }]}
            hasFeedback
          >
            <Input.Password
              placeholder="New password"
              className="rounded-lg"
              autoComplete="new-password"
              allowClear={false}
              visibilityToggle
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-base">Confirm New Password <span className="text-red-500">*</span></span>}
            name="confirmNewPassword"
            rules={[{ required: true, message: "Please confirm your new password" }]}
            hasFeedback
          >
            <Input.Password
              placeholder="Repeat new password"
              className="rounded-lg"
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
              className="font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg border-0"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
        <Divider className="!my-8" />
        <div className="text-center">
          <Link href="/Account/login" className="text-blue-600 hover:underline font-semibold">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
