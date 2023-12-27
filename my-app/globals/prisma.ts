// globals/prisma.ts

import { PrismaClient } from "@prisma/client";

// Khởi tạo PrismaClient
const prisma = new PrismaClient();

async function initialize() {
  try {
    // Kiểm tra xem có người dùng nào trong cơ sở dữ liệu hay không
    const existingUsers = await prisma.user.findMany();

    // Nếu không có người dùng, tạo một người dùng mới
    if (existingUsers.length === 0) {
      await prisma.user.create({
        data: {
          username: "admin",
          isAdmin: true,
        },
      });

      console.log("Đã tạo một người dùng mới.");
    }
  } catch (error) {
    console.error("Lỗi khi khởi tạo ứng dụng:", error);
  } finally {
    await prisma.$disconnect(); // Đảm bảo đóng kết nối sau khi thực hiện
  }
}

// Gọi hàm khởi tạo khi ứng dụng chạy
initialize();
export { prisma };
