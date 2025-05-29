import Navbar from '../Component/Navbar'
import { useEffect, useState } from 'react';
import '../Home/Home.css'
import image1 from '../Image/mainimage.png'
import p1 from '../Image/p1.jpeg'
import p2 from '../Image/p2.jpeg'
import p4 from '../Image/p4.jpeg'
import p3 from '../Image/p3.jpg'
import Footer from '../Component/Footer'
import m1 from '../Image/image.png'
import m2 from '../Image/gettyimages-858141682.jpg'
import m3 from '../Image/Robert-Downey-JR-UK-premier-Oppenheimer-movie-July-2023.webp'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


function Home() {
    const mutateSomething = useMutation(api.myFunctions.createTask);
    const { isSignedIn, user, isLoaded } = useUser();
    const [animated, setAnimated] = useState(false);

    const numberWithCommas = (x: Number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleScroll = () => {
        const gotoElement = document.querySelector(".goto");
        const countElements = document.querySelectorAll(".count");

        if (gotoElement && countElements.length) {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const gotoOffsetTop = gotoElement.getBoundingClientRect().top + scrollTop;

            if (scrollTop >= gotoOffsetTop - windowHeight && !animated) {
                countElements.forEach((el) => {
                    const target = parseInt(el.getAttribute("data-target") ?? "0", 10);
                    let counter = 0;

                    const incrementCount = () => {
                        if (counter < target) {
                            counter += Math.ceil(target / 1000);
                            el.textContent = numberWithCommas(counter);
                            requestAnimationFrame(incrementCount);
                        } else {
                            el.textContent = numberWithCommas(target);
                        }
                    };

                    incrementCount();
                });

                setAnimated(true);
            }
        }
    };

    useEffect(() => {
        const addUserToDatabase = async () => {
            if (!isLoaded) {
                return;
            }

            if (isSignedIn && user) {
                try {
                    await mutateSomething({
                        name: user.fullName || 'Unknown',
                        email: user.primaryEmailAddressId || 'Unknown',
                    });
                    console.log('User added to database successfully');
                } catch (error) {
                    console.error('Error adding user to database:', error);
                }
            }
        };

        addUserToDatabase();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSignedIn, user, isLoaded, mutateSomething, animated]);


    return (
        <div>
            <Navbar />

            <div className="home1">
                <div className="home2">
                    <div className="home3">
                        <h1>Pioneering Sustainable Agriculture for the Future</h1>
                        <p>
                            Discover our exclusive range of high-quality, affordable smart
                            plant monitoring systems. Designed and manufactured by our brand,
                            these products ensure superior performance and reliability. Find
                            the perfect fit for your needs and experience the difference with
                            our products
                        </p>
                        <div className="home4">
                            <button id="home4"><Link to="/dashboard">Go to the dashboard</Link></button>
                        </div>
                    </div>
                    <div className="home3 home555">
                        <img
                            src={image1}
                            className="bottom-image"
                            style={{ width: "70%" }}
                        />
                    </div>
                </div>
            </div>

            <div className="home5">
                <h2>Features</h2>
                <p>These are just a few features you’ll get using AgriSense Kit.</p>
                <div className="home6">
                    <div className="home7">
                        <div className="home9">
                            <img
                                src={p1}
                                width="100%"
                                style={{
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="home11">
                            <h3>Crop AI</h3>
                            <p>
                                Our AI assists in monitoring crops, detecting diseases,
                                optimizing yield, and recommending suitable crops based on
                                analysis.
                            </p>
                        </div>
                    </div>
                    <div className="home7">
                        <div className="home9">
                            <img
                                src={p2}
                                width="100%"
                                style={{
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="home11">
                            <h3>Animal Detection</h3>
                            <p>
                                Detect and track animals, useful for wildlife monitoring and
                                livestock management.
                            </p>
                        </div>
                    </div>
                    <div className="home7">
                        <div className="home9">
                            <img src={p3} width="100%" />
                        </div>
                        <div className="home11">
                            <h3>Crop Doctor</h3>
                            <p>
                                Our AI system uses sensor data and advanced analysis to monitor
                                crop health, detect diseases and optimize yield.
                            </p>
                        </div>
                    </div>
                    <div className="home7">
                        <div className="home9">
                            <img src={p4} width="100%" />
                        </div>
                        <div className="home11">
                            <h3>Monitoring and Analytics</h3>
                            <p>
                                Offers real-time visualization, historical analysis, and
                                predictive analytics for monitoring.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home15">
                <h2>Our Metrics Tell the Story</h2>
                <p>
                    Our metrics component gives you the inside scoop on your success and
                    helps you stay on top of your game in style.
                </p>
                <div className="goto home16">
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="30">
                                    0
                                </span>
                                <span>%</span>
                            </h1>
                            <p>Increased crop yield</p>
                        </div>
                    </div>
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="95">
                                    0
                                </span>
                                <span>%</span>
                            </h1>
                            <p>accuracy in disease detection</p>
                        </div>
                    </div>
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="40">
                                    0
                                </span>
                                <span>%</span>
                            </h1>
                            <p>Reduced water usage</p>
                        </div>
                    </div>
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="9">
                                    0
                                </span>
                                <span>k+</span>
                            </h1>
                            <p>Increased crop yield</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home20">
                <h2>Real Stories from Satisfied Customers</h2>
                <p>
                    Our metrics component gives you the inside scoop on your success and
                    helps you stay on top of your game in style.
                </p>
                <div className="home21">
                    <div className="wrapper">
                        <div className="review-card">
                            <div className="header-content">
                                <div className="img-area">
                                    <img alt="customer1" src={m3} />
                                </div>
                                <div className="info">
                                    <h4>Tony Stark</h4>
                                    <p>Senior Agronomist at GreenFields</p>
                                </div>
                            </div>
                            <div className="single-review">
                                <p>
                                    "The AI-driven crop disease prediction tool is a game changer for farmers. It helped me detect potential outbreaks early and take action before any damage occurred. The insights provided are accurate and easy to understand!"
                                </p>
                            </div>
                            <div className="review-footer">
                                <div className="rating">
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                </div>
                                <p>Reviewed on 15/09/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="header-content">
                                <div className="img-area">
                                    <img alt="customer2" src={m1} />
                                </div>
                                <div className="info">
                                    <h4>Jack Sparrow</h4>
                                    <p>Farm Manager at AgroSolutions</p>
                                </div>
                            </div>
                            <div className="single-review">
                                <p>
                                    "This platform has streamlined our entire farming process. The real-time environmental data, coupled with intelligent recommendations, has improved our yields significantly. It's an essential tool for modern agriculture."
                                </p>
                            </div>
                            <div className="review-footer">
                                <div className="rating">
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span>★</span>
                                </div>
                                <p>Reviewed on 11/09/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="header-content">
                                <div className="img-area">
                                    <img alt="customer3" src={m2} />
                                </div>
                                <div className="info">
                                    <h4>Jacky Chan</h4>
                                    <p>Young Farmer</p>
                                </div>
                            </div>
                            <div className="single-review">
                                <p>
                                    "I've seen many agricultural tools, but this one stands out. Its integration of AI with real-time data is impressive. We were able to reduce losses by efficiently managing crop health and optimizing resource use."
                                </p>
                            </div>
                            <div className="review-footer">
                                <div className="rating">
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                </div>
                                <p>Reviewed on 13/07/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="products1">
                <h2>Pricing</h2>
                <p>Best features and monitoring system in affordable price</p>
                <div className="products2">
                    <div className="products3">
                        <div>
                            <h2>Startup</h2>
                            <div className="products4">
                                <h3>₹1,599.00</h3>
                            </div>
                            <p>Everything you need to get started</p>
                            <div>
                                <ul>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        <span>Basic Monitoring</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        <span>Limited Sensor Support</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        <span>Standard Customer Support</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        <span>Affordable Pricing</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="products5">
                        <button><Link to="/pricing">Order Now</Link></button>
                        </div>
                    </div>


                    <div className="products3">
                        <div>
                            <h2>Enterprises</h2>
                            <div className="products4">
                                <h3>₹2,999.00</h3>
                            </div>
                            <p>Everything in the Startup plan plus</p>
                            <div>
                                <ul>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Expanded Monitoring
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Support for a variety of sensors
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Advanced Data Analytics
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Priority Customer Support
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="products5">
                        <button><Link to="/pricing">Order Now</Link></button>
                        </div>
                    </div>


                    <div className="products3">
                        <div>
                            <h2>Premium</h2>
                            <div className="products4">
                                <h3>₹3,999.00</h3>
                            </div>
                            <p>Everything in the Enterprises plan plus</p>
                            <div className="products6">
                                <ul>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Comprehensive Monitoring
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Enhanced Sensor Support
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Advanced Data Analysis
                                    </li>
                                    <li>
                                        <i className="fa fa-check" style={{ fontSize: '18px' }}></i>
                                        Enhanced Data Security
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="products5">
                            <button><Link to="/pricing">Order Now</Link></button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default Home