import BookingRow from "./BookingRow";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const Booking = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();
    // const url = `https://car-doctor-server-blond-seven.vercel.app/bookings?email=${user?.email}`;
    const url = `/bookings?email=${user?.email}`;

    const handleDelete = id => {
        const proceed = confirm('Are are you sure want to delete?');
        if (proceed) {
            fetch(`https://car-doctor-server-blond-seven.vercel.app/bookings/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                        alert('Deleted Successfully');
                    }
                })
        }
    }

    useEffect(() => {
        //using custom hook
        axiosSecure.get(url)
            .then(res => setBookings(res.data))

    }, [url, axiosSecure])

    const handleConfirmBooking = id => {

        fetch(`https://car-doctor-server-blond-seven.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm';
                    const newBooking = [updated, ...remaining];
                    console.log(newBooking);
                    setBookings(newBooking);
                }

            })
    }
    return (
        <div>
            Bookings: {bookings.length}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Services</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Service ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow key={booking._id} handleDelete={handleDelete} handleConfirmBooking={handleConfirmBooking} booking={booking}></BookingRow>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Booking;