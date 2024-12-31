import React from 'react'
import category1 from "../../assets/category-1.jpg"
import category2 from "../../assets/category-2.jpg"
import category3 from "../../assets/category-3.jpg"
import category4 from "../../assets/category-4.jpg"
import { Link } from 'react-router-dom';


const Categories = () => {
    const categories = [
        {name: 'Accessories', path: 'accessories', image: category1},
        {name: 'Dress Collection', path: 'dress', image: category2},
        {name: 'Jewelry', path: 'jewellery', image: category3}, 
        {name: 'Cosmetics', path: 'Cosmetics', image: category4}, 
    ]
    return (
        <div className='product__grid gap-4'>
            {categories.map((category) => (
                <Link
                    key={category.name}
                    to={`/categories/${category.path}`}
                    className='categories__card group'
                >
                    <img
                        src={category.image}
                        alt={category.name}
                        className='w-full h-auto transition-transform duration-300 group-hover:scale-105'
                    />
                    <h4 className='mt-2 text-center text-lg font-semibold'>{category.name}</h4>
                </Link>
            ))}
        </div>
    );
};

export default Categories;