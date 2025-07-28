-- Tạo bảng user
CREATE TABLE IF NOT EXISTS user (
  User_id INT AUTO_INCREMENT PRIMARY KEY,
  Hoten VARCHAR(100),
  Email VARCHAR(100),
  Matkhau VARCHAR(100),
  Diachi VARCHAR(255),
  Sdt VARCHAR(20),
  role INT
);

-- Tạo bảng thuonghieu
CREATE TABLE IF NOT EXISTS thuonghieu (
  Brand_id INT AUTO_INCREMENT PRIMARY KEY,
  Tenthuonghieu VARCHAR(100)
);

-- Tạo bảng loaixe
CREATE TABLE IF NOT EXISTS loaixe (
  Loaixe_id INT AUTO_INCREMENT PRIMARY KEY,
  Tenloaixe VARCHAR(100)
);

-- Tạo bảng xedap
CREATE TABLE IF NOT EXISTS xedap (
  Bike_id INT AUTO_INCREMENT PRIMARY KEY,
  Tenxe VARCHAR(100),
  Brand_id INT,
  Loaixe_id INT,
  Giaban DECIMAL(10,2),
  Soluong INT,
  Hinhanh VARCHAR(255),
  Mausac VARCHAR(50),
  FOREIGN KEY (Brand_id) REFERENCES thuonghieu(Brand_id),
  FOREIGN KEY (Loaixe_id) REFERENCES loaixe(Loaixe_id)
);

-- Tạo bảng donhang
CREATE TABLE IF NOT EXISTS donhang (
  Madonhang INT AUTO_INCREMENT PRIMARY KEY,
  User_id INT,
  Tongtien INT,
  Thoigiandat DATETIME,
  Trangthai VARCHAR(50),
  FOREIGN KEY (User_id) REFERENCES user(User_id)
);

-- Tạo bảng chitietdonhang
CREATE TABLE IF NOT EXISTS chitietdonhang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  User_id INT,
  Bike_id INT,
  quantity INT,
  price FLOAT,
  FOREIGN KEY (User_id) REFERENCES user(User_id),
  FOREIGN KEY (Bike_id) REFERENCES xedap(Bike_id)
);

-- Tạo bảng chitiethoadon
CREATE TABLE IF NOT EXISTS chitiethoadon (
  Hoadon_id INT AUTO_INCREMENT PRIMARY KEY,
  Madonhang INT,
  User_id INT,
  Bike_id INT,
  quantity INT,
  price FLOAT,
  FOREIGN KEY (Madonhang) REFERENCES donhang(Madonhang),
  FOREIGN KEY (User_id) REFERENCES user(User_id),
  FOREIGN KEY (Bike_id) REFERENCES xedap(Bike_id)
);

-- Tạo bảng posts tin tức
CREATE TABLE IF NOT EXISTS posts (
 id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image VARCHAR(100),
  created_at DATE,
  read_time INT,
  slug VARCHAR(255) UNIQUE
);

-- Tạo bảng cart
CREATE TABLE cart (
  cart_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  bike_id INT NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(User_id),
  FOREIGN KEY (bike_id) REFERENCES xedap(Bike_id)  
);
