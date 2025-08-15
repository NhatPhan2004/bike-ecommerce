const db = require("../config/database");

exports.getStatistics = async (req, res) => {
  try {
    const [loaiXeRows] = await db.execute(`
      SELECT loaixe.Tenloaixe AS label, SUM(xedap.Soluong) AS value
      FROM xedap
      JOIN loaixe ON xedap.Loaixe_id = loaixe.Loaixe_id
      GROUP BY loaixe.Tenloaixe
    `);

    const [trangThaiRows] = await db.execute(`
      SELECT Trangthai AS label, COUNT(*) AS value
      FROM donhang
      WHERE Trangthai IN ('Delivered', 'Cancelled')
      GROUP BY Trangthai
    `);

    const [tongMuaRows] = await db.execute(`
      SELECT user.Hoten AS label, SUM(Tongtien) AS value
      FROM donhang
      JOIN user ON user.User_id = donhang.User_id
      WHERE user.role = 0
      GROUP BY user.User_id
    `);

    const [doanhThuRows] = await db.execute(`
      SELECT CONCAT(MONTH(Thoigiandat), '/', YEAR(Thoigiandat)) AS label,
             SUM(Tongtien) AS total
      FROM donhang
      WHERE Trangthai = 'Delivered'
      GROUP BY YEAR(Thoigiandat), MONTH(Thoigiandat)
      ORDER BY YEAR(Thoigiandat), MONTH(Thoigiandat)
    `);

    res.json({
      loaiXe: loaiXeRows,
      trangThai: trangThaiRows,
      tongMua: tongMuaRows,
      doanhThu: doanhThuRows,
    });
  } catch (error) {
    console.error("Lỗi lấy thống kê:", error);
    res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
  }
};
