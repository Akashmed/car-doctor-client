import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Checkout = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { title, _id, price, img, } = service;

    const handleConfirmOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;

        const booking = {
            name,
            email,
            date,
            price: price,
            service_id: _id,
            img,
            title
        }

        fetch('https://car-doctor-server-blond-seven.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Service booked successfully');
                    navigate('/')
                }
            })
    }

    return (
        <div>
            <h3 className="text-3xl font-semibold text-center">Book for {title}</h3>
            <div>
                <form onSubmit={handleConfirmOrder} className="card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.name} placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" defaultValue={user?.email || ''} placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due amount</span>
                            </label>
                            <input type="text" value={`$${price}`} className="input input-bordered" readOnly />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Confirm Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
