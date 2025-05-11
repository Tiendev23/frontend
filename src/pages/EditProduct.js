import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
    const { state } = useLocation(); // nhận product từ navigate
    const navigate = useNavigate();
    const [form, setForm] = useState(state);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${form._id}`, {
                name: form.name,
                price: parseInt(form.price),
                image: form.image,
                description: form.description
            });
            alert('✅ Cập nhật thành công!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('❌ Lỗi khi sửa sản phẩm');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>🛠 Sửa sản phẩm</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Tên" required />
                <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Giá" required />
                <input name="image" value={form.image} onChange={handleChange} placeholder="Link ảnh" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" required />
                <button type="submit">💾 Lưu thay đổi</button>
            </form>
        </div>
    );
}

export default EditProduct;
