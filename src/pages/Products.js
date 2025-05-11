import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts(); // load lại danh sách
        }
    };

    const handleEdit = (product) => {
        navigate(`/edit/${product._id}`, { state: product });
    };

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            
            <button onClick={() => navigate('/add')}>➕ Thêm sản phẩm</button>
            {products.map(p => (
                <div key={p._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <img src={p.image} alt={p.name} width="100" />
                    <h3>{p.name}</h3>
                    <p>{p.price.toLocaleString()} đ</p>
                    <p>{p.description}</p>
                    <p><small>Tạo lúc: {new Date(p.createdAt).toLocaleString()}</small></p>
                    <p><small>Cập nhật: {new Date(p.updatedAt).toLocaleString()}</small></p>
                    <button onClick={() => handleEdit(p)}>🛠 Sửa</button>
                    <button onClick={() => handleDelete(p._id)} style={{ marginLeft: '10px', color: 'red' }}>🗑 Xóa</button>
                </div>
            ))}
        </div>
    );
}

export default Products;