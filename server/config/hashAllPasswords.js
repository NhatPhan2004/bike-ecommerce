const pool = require("../config/database");
const bcrypt = require("bcryptjs");

const hashAllPasswords = async () => {
  try {
    const [users] = await pool.query("SELECT User_id, Matkhau FROM user");

    let updatedCount = 0;

    for (const user of users) {
      const { User_id, Matkhau } = user;

      // Nếu đã hash rồi thì bỏ qua
      if (Matkhau.startsWith("$2b$")) {
        continue;
      }

      const hashed = await bcrypt.hash(Matkhau, 10);

      await pool.query("UPDATE user SET Matkhau = ? WHERE User_id = ?", [
        hashed,
        User_id,
      ]);

      console.log(`✅ Hashed password for user ID: ${User_id}`);
      updatedCount++;
    }

    console.log(`🎉 Hoàn tất! Đã hash ${updatedCount} mật khẩu.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi khi hash mật khẩu:", err.message);
    process.exit(1);
  }
};

hashAllPasswords();
