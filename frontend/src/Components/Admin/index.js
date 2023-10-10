import { useState } from 'react'
import Header from '../Header'
import './index.css'

const Admin = (props) => {
    const [id, setId] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        title: '',
        price: '',
        brand: '',
        rating: '',
        totalReviews: '',
        availability: '',
        imageUrl: '',
        description: '',

    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //============== Register & Update ===============
    const update = async (e) => {
        e.preventDefault();
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        try {
            const response = await fetch('https://ekart-t7sz.onrender.com/api/product/update', options);
            const data = await response.json();
            console.log(data);
            setFormData({
                id: "",
                title: '',
                price: '',
                brand: '',
                rating: '',
                totalReviews: '',
                availability: '',
                imageUrl: '',
                description: '',
            });

        } catch (error) {
            console.error('An error occurred:', error);
        }




    }

    const register = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        try {
            const response = await fetch('https://ekart-t7sz.onrender.com/api/product/register', options);
            const data = await response.json();
            console.log(data);
            setFormData({
                id: "",
                title: '',
                price: '',
                brand: '',
                rating: '',
                totalReviews: '',
                availability: '',
                imageUrl: '',
                description: '',
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }


    //=============== Delete =============
    const del = async (e) => {
        e.preventDefault();
        console.log(id)
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        }
        console.log(options)
        try {
            const response = await fetch('https://ekart-t7sz.onrender.com/api/product/delete', options);
            const data = await response.json();
            console.log(response);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }



    return (
        <div className="main ">
            <div className="app">
                <Header />
                <div className='edit-container'>
                    <div className="create-container">
                        <div className="main-container">
                            <div className="app-container">

                                <form className="form">
                                    <h2 className="textHead">Add The Product</h2>
                                    <p className="left">Id:</p>
                                    <input
                                        type="text"
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">Title:</p>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="input"
                                    />


                                    <p className="left">Price:</p>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">Brand:</p>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">Rating:</p>
                                    <input
                                        type="text"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">TotalReviews:</p>
                                    <input
                                        type="text"
                                        name="totalReviews"
                                        value={formData.totalReviews}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">Availability:</p>
                                    <input
                                        type="text"
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">ImageUrl:</p>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        className="input"
                                    />


                                    <p className="left">Description:</p>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="input"
                                    />



                                    <div className="button-container">
                                        <button type="submit" className="button btn" onClick={register}>Submit</button>
                                        <button type="submit" className="button btn" onClick={update}>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="delete-container">
                        <div className="app-container">
                            <form className="form">
                                <h2 className="textHead">Delete The Product</h2>
                                <p className="left">Id:</p>
                                <input
                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                    className="input"
                                />

                                <div className="button-container">
                                    <button type='submit' className="button btn" onClick={del}>Delete</button>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )

}


export default Admin;
