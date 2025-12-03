import { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Pagination logic
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5">
                {currentItems.map(item => (
                    <MenuItem key={item._id} menu_item={item} />
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline"
                >
                    Prev
                </button>
                <span className="font-medium text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline"
                >
                    Next
                </button>
            </div>

            {/* Order Now Button */}
            <div className="flex justify-center my-5">
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">
                        Order Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;
