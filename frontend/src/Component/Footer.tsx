import '../Component/Footer.css'
import {Link} from 'react-router-dom';

function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
            At AgriSense, <i>we empower farmers</i> with advanced technology to optimize crop management and enhance productivity. Our solutions integrate cutting-edge sensors and data analytics to provide actionable insights. We are committed to innovation and sustainability in agriculture. Join us in revolutionizing farming for a more sustainable future.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><Link to="/cropai">Crop Recommendation</Link></li>
              <li><Link to="/animaldetection">Animal detection</Link></li>
              <li><Link to="/pestmanagement">Pest Detection</Link></li>
              <li><Link to="/chatbot">Chat bot</Link></li>
              <li><Link to="/cropdoctor">Fertlizer Recommendation</Link></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="">About Us</a></li>
              <li><a href="">Contact Us</a></li>
              <li><a href="">Contribute</a></li>
              <li><a href="">Privacy Policy</a></li>
              <li><a href="">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2024 All Rights Reserved by <a href="#">AgriSense</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
              <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
