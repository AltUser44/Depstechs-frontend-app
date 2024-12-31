import React from 'react';

import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const cards = [
    {
        id: 1,
        image: card1,
        trend: '2024 Trends',
        title: "Womens Shirt",
    },
    {
        id: 2,
        image: card2,
        trend: '2024 Trends',
        title: "Womens Dresses",
    },
    {
        id: 3,
        image: card3,
        trend: '2024 Trends',
        title: "Womens Casuals",
    },
];

const HeroSection = () => {
    return (
        <section className='section__container hero__container'>
            {cards.map((card) => (
                <div key={card.id} className='hero__card group'>
                    <img src={card.image} alt="" className="transition-transform duration-300 group-hover:scale-105" />
                    <div className='hero__content opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <p>{card.trend}</p>
                        <h4>{card.title}</h4>
                        <a href="#">Discover More</a>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default HeroSection;