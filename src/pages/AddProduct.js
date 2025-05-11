import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        image: '',
        description: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', {
                ...form,
                price: parseInt(form.price)
            });
            alert('✅ Thêm sản phẩm thành công!');
            setForm({ name: '', price: '', image: '', description: '' });
        } catch (err) {
            console.error(err);
            alert('❌ Lỗi khi thêm sản phẩm');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên sản phẩm:</label><br />
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Giá:</label><br />
                    <input type="number" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Link ảnh:</label><br />
                    <input type="text" name="image" value={form.image} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mô tả:</label><br />
                    <textarea name="description" value={form.description} onChange={handleChange} required />
                </div>
                <button type="submit">➕ Thêm sản phẩm</button>
            </form>
        </div>
    );
}

export default AddProduct;
