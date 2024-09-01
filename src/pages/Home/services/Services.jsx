import ServiceCard from "./ServiceCard";
import useServices from "../../../hooks/useServices";
import { useState } from "react";

const Services = () => {
    //using custom hook
    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState('');
    const services = useServices(asc, search);
    
    const handleSearch = e =>{
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
    }
    return (
        <div>
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
                <button
                    onClick={() => setAsc(!asc)}
                    className="btn btn-secondary mt-1">
                    {asc ? 'PRICE: HIGH TO LOW' : 'PRICE: LOW TO HIGH'}
                </button>
                <p className="m-3 font-semibold">Showing results from { asc ? 'low to high' : 'high to low'}</p>
                <form onSubmit={handleSearch}>
                    <input type="text" name="search"></input>
                    <input className="btn" type="submit" value='search'></input>
                </form>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;