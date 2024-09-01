
const BookingRow = ({ booking, handleDelete, handleConfirmBooking }) => {
    const { name, title, _id, date, price, img, service_id, status } = booking;

    return (
        <tr>
            <th>{ status !== 'confirm' && 
                <button onClick={() => handleDelete(_id)} className="btn btn-sm">X</button>}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            {img && <img
                                src={img}
                                alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{title}</div>
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>
                {date}
            </td>
            <td>${price}</td>
            <td>{service_id}</td>
            <td>{
                status === 'confirm' ? <span className="text text-primary" >Confirmed</span> :
                    <button onClick={() => handleConfirmBooking(_id)} className="btn btn-primary btn-xs">Please Confirm</button>}
            </td>
        </tr>
    );
};

export default BookingRow;