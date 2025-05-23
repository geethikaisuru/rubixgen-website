import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { Link, useLocation } from "react-router-dom";

// Custom simplified menu for HomePage3
const homePage3Menus = [
    {
        id: 1,
        title: 'Home',
        link: '/',
        isScrollLink: false
    },
    {
        id: 2,
        title: 'Company',
        link: '#company',
        isScrollLink: true
    },
    {
        id: 3,
        title: 'Services',
        link: '#services',
        isScrollLink: true
    },
    {
        id: 4,
        title: 'Portfolio',
        link: '#portfolio',
        isScrollLink: true
    },
    {
        id: 5,
        title: 'Contact',
        link: '/contact',
        isScrollLink: false
    }
];

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'SEO Agency',
                link: '/home'
            },
            {
                id: 12,
                title: 'It Services',
                link: '/home-2'
            },
            {
                id: 13,
                title: 'AI & Data Solutions',
                link: '/home-3'
            },
            {
                id: 14,
                title: 'Cyber Security',
                link: '/home-4'
            },
            {
                id: 15,
                title: 'Cloud and Devops',
                link: '/home-5'
            },
            {
                id: 16,
                title: 'Help desk SaaS',
                link: '/home-6'
            },
        ]
    },
    {
        id: 3,
        title: 'Pages',
        link: '/about',
        submenu: [
            {
                id: 31,
                title: 'About Us',
                link: '/about'
            },
            {
                id: 3222,
                title: 'Our Pricing',
                link: '/pricing'
            },
            {
                id: 322,
                title: 'Our team',
                link: '/team'
            },
            {
                id: 345,
                title: 'Services',
                link: '/service'
            },
            {
                id: 3454,
                title: 'Service Details',
                link: '/service-single/Niche-research'
            },
            {
                id: 3455,
                title: 'Casestudy',
                link: '/casestudy'
            },
            {
                id: 3456,
                title: 'Casestudy Details',
                link: '/casestudy-details/Marketing'
            },
            {
                id: 3457,
                title: 'Career',
                link: '/career'
            },
            {
                id: 3458,
                title: 'Career details',
                link: '/career-details'
            },
            {
                id: 3459,
                title: 'Terms & Conditions',
                link: '/terms-conditions'
            },
            {
                id: 3460,
                title: 'Privacy Policy',
                link: '/privacy-policy'
            },
        ]
    },
    {
        id: 5,
        title: 'Services',
        link: '/service',
        submenu: [
            {
                id: 51,
                title: 'Services',
                link: '/service'
            },
            {
                id: 52,
                title: 'Service Details',
                link: '/service-single/Niche-research'
            },
        ]
    },
    {
        id: 7,
        title: 'Casestudy',
        link: '/casestudy',
        submenu: [
            {
                id: 71,
                title: 'Casestudy',
                link: '/casestudy'
            },
            {
                id: 72,
                title: 'Casestudy Details',
                link: '/casestudy-details/Marketing'
            },
        ]
    },
    {
        id: 6,
        title: 'Blog',
        link: '/blog',
        submenu: [
            {
                id: 61,
                title: 'Blog',
                link: '/blog'
            },
            {
                id: 62,
                title: 'Blog Details',
                link: '/blog-single/AI-in-Neuroimaging-IXICOs-Cloud-Transformation'
            },
        ]
    },
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    }
]

const MobileMenu = () => {
    const location = useLocation();
    const [openId, setOpenId] = useState(0);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    // Detect if we're on HomePage3 or contact page
    const isHomePage3 = location.pathname === '/home-3' || location.pathname === '/';
    const isContactPage = location.pathname === '/contact';

    // Enhanced navigation function to handle different page scenarios
    const handleNavigation = (sectionId, e) => {
        e.preventDefault();
        
        if (isContactPage) {
            // If on contact page, navigate to home page with hash
            window.location.href = `/#${sectionId.replace('#', '')}`;
        } else {
            // If on home page, scroll to section
            const section = document.getElementById(sectionId.replace('#', ''));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                document.querySelector('.xb-header-menu')?.classList.remove('active');
            }
        }
    }

    // Choose which menu to render based on the current page
    let menuToRender = (isHomePage3 || isContactPage) ? homePage3Menus : menus;
    
    // Filter out Contact menu item when on contact page
    if (isContactPage) {
        menuToRender = homePage3Menus.filter(item => item.id !== 5); // Filter out Contact item (id: 5)
    }

    return (
        <ul className="xb-menu-primary clearfix">
            {menuToRender.map((item, mn) => {
                return (
                    <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                        {item.submenu ?
                            <Fragment>
                                <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>{item.title}
                                    <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                </p>
                                <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                    <List className="menu-item menu-item-has-children active">
                                        <Fragment>
                                            {item.submenu.map((submenu, i) => {
                                                return (
                                                    <ListItem key={i}>
                                                        <Link onClick={ClickHandler} className="active"
                                                            to={submenu.link}>{submenu.title}</Link>
                                                    </ListItem>
                                                )
                                            })}
                                        </Fragment>
                                    </List>
                                </Collapse>
                            </Fragment>
                            : item.isScrollLink ? 
                              <a href={item.link} onClick={(e) => handleNavigation(item.link, e)}>{item.title}</a>
                              : <Link className="active" to={item.link} onClick={ClickHandler}>{item.title}</Link>
                        }
                    </ListItem>
                )
            })}
        </ul>
    )
}

export default MobileMenu;