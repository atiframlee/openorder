import React from 'react'
import './NewComponent.css'
import 'animate.css';
import dinnerIcon from '../Assets/dinner.png'
import postpartum from '../Assets/postpartum.png'
import burger from '../Assets/burger.png'
import moreIcon from '../Assets/more.png'
import lunch from '../Assets/lunch.png'
import breakfastIcon from '../Assets/breakfast.png'
import kueh from '../Assets/kueh.png'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LayoutOne() {

    const navigate = useNavigate()

    const gotoSegments = (title) => {
        navigate('/segments', { state: title })
    };

    const categories = [
        { name: 'Berpantang Meals', icon: postpartum, color: '#FF6B6B' },
        { name: 'Breakfast', icon: breakfastIcon, color: '#4ECDC4' },
        { name: 'Lunch', icon: lunch, color: '#45B7D1' },
        { name: 'Snacks & Desserts', icon: kueh, color: '#96CEB4' },
        { name: 'Dinner', icon: dinnerIcon, color: '#FFEAA7' },
        { name: 'Western', icon: burger, color: '#DDA0DD' },
        { name: 'More', icon: moreIcon, color: '#778CA3' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <motion.div
            className='layoutOne'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >

            <div className="loHeaderWord">
                <span className='lohwb'>Whose <span className="openOrder">Open Order</span> today?</span>
                <p className="loSubtitle">Discover delicious meals crafted just for you</p>
            </div>

            <motion.div
                className="loCarousel"
                variants={containerVariants}
            >
                {categories.map((category, index) => (
                    <motion.div
                        key={category.name}
                        className="categoryItem"
                        onClick={() => category.name !== 'More' && gotoSegments(category.name)}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            y: -3,
                            transition: { type: "spring", stiffness: 400 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            '--category-color': category.color,
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <div className="roundContainer">
                            <div className="iconContainer">
                                <img src={category.icon} alt={category.name} className='categoryIcon' />
                                <div className="iconBackground"></div>
                            </div>
                        </div>
                        <span className="categoryLabel">{category.name}</span>
                    </motion.div>
                ))}
            </motion.div>

        </motion.div>
    )
}

export default LayoutOne