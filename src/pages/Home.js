import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance'; // Import axios instance

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    try {
      role = JSON.parse(atob(token.split('.')[1])).role;
    } catch {}
  }

  // Fetch products from backend
  const fetchProducts = () => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      await axios.delete(`/products/${id}`);
      fetchProducts(); // Reload products after deletion
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit/${product._id}`); // Navigate to the Edit page
  };

  const handleRestore = async (id) => {
    await axios.patch(`/products/restore/${id}`);
    fetchProducts(); // Reload products after restore
  };

  return (
    <div>
      {/* Header */}
      <header style={headerStyle}>
        <div style={logoContainerStyle}>
          <h1 style={logoStyle}>Shoppe</h1>
        </div>
        <nav style={navStyle}>
          <button onClick={() => navigate('/')} style={navButtonStyle}>Trang chủ</button>
          {role === 'admin' && (
            <button onClick={() => navigate('/add')} style={navButtonStyle}>➕ Thêm sản phẩm</button>
          )}
          <button onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Log out and redirect to login
          }} style={navButtonStyle}>🚪 Đăng xuất</button>
        </nav>
      </header>

      {/* Body Content */}
      <div style={bodyContentStyle}>
        <h2>Danh sách sản phẩm</h2>
        <h3>👤 Vai trò hiện tại: {role || 'Chưa đăng nhập'}</h3>

        {/* Table Layout */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Tên sản phẩm</th>
              <th style={thStyle}>Giá</th>
              <th style={thStyle}>Mô tả</th>
              <th style={thStyle}>Ngày tạo</th>
              <th style={thStyle}>Ngày cập nhật</th>
              {role === 'admin' && <th style={thStyle}>Hành động</th>}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={trStyle}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.price.toLocaleString()} đ</td>
                <td style={tdStyle}>{p.description}</td>
                <td style={tdStyle}>{new Date(p.createdAt).toLocaleString()}</td>
                <td style={tdStyle}>{new Date(p.updatedAt).toLocaleString()}</td>
                {role === 'admin' && (
                  <td style={tdStyle}>
                    {p.deletedAt ? (
                      <button onClick={() => handleRestore(p._id)} style={restoreButtonStyle}>♻ Khôi phục</button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(p)} style={editButtonStyle}>🛠 Sửa</button>
                        <button onClick={() => handleDelete(p._id)} style={deleteButtonStyle}>🗑 Xóa</button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Header Styles
const headerStyle = {
  background: 'linear-gradient(90deg, rgba(255, 105, 180, 1) 0%, rgba(255, 163, 74, 1) 100%)',
  color: 'white',
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  fontSize: '36px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  cursor: 'pointer',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navButtonStyle = {
  backgroundColor: 'white',
  border: 'none',
  padding: '10px 20px',
  margin: '0 10px',
  cursor: 'pointer',
  fontSize: '16px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  fontWeight: 'bold',
};

const navButtonHoverStyle = {
  backgroundColor: '#FFD700',
  transform: 'scale(1.05)',
};

// Body Content Styles
const bodyContentStyle = {
  padding: '20px',
  textAlign: 'center',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const thStyle = {
  backgroundColor: '#f8f8f8',
  color: '#333',
  padding: '12px 15px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const trStyle = {
  transition: 'background-color 0.3s ease',
};

const restoreButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  padding: '8px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const editButtonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '8px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '8px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Home;
