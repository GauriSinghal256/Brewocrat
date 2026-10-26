import React, { useState, useEffect } from 'react';

export default function Testimonials() {
  const testimonials = [
    { text: "Brewocrat is hands down the best microbrewery in Gurgaon! The craft wheat beer is superb and the Smokey Mutton is tender and rich. Amazing rooftop skybar vibes!", author: "Rohan Verma", thumb: "/images/author-thumb-1.jpg" },
    { text: "Loved the Big Fat Non-Veg Mezze Platter and the chic red & white ambiance with comfortable blue sofas. Great live DJ and sports screening experience at Element One!", author: "Priya Sharma", thumb: "/images/author-thumb-2.jpg" },
    { text: "Outstanding service, great craft cocktails, and the Veg Mediterranean Platter is to die for. Perfect for group parties or romantic rooftop dinners in Gurgaon.", author: "Amit Gupta", thumb: "/images/author-thumb-3.jpg" }
  ];
  const [activeTesti, setActiveTesti] = useState(0);

  // Auto Rotation Timer for Testimonials
  useEffect(() => {
    const testiTimer = setInterval(() => {
      setActiveTesti((prev) => (prev + 1) % testimonials.length);
    }, 1800);
    return () => clearInterval(testiTimer);
  }, [testimonials.length]);

  return (
    <div className="testimonials-page">
      {/* Inner Banner */}
      <section className="inner-banner">
        <div className="image-layer" style={{ backgroundImage: "url('https://b.zmtcdn.com/data/pictures/8/18953618/9193297f7201519323440fd58138cda7.jpg')" }}></div>
        <div className="auto-container">
          <div className="inner">
            <h1>Testimonials</h1>
            <div className="sub_text">
              <p>Brewocrat Skybar & Kitchen - <span className="primary-color">What Our Guests Say About Us.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-kt">
        <div className="image-layer" style={{ backgroundImage: "url('https://b.zmtcdn.com/data/pictures/8/18953618/9193297f7201519323440fd58138cda7.jpg')" }}></div>
        <div className="auto-container">
          <div className="title-box centered">
            <div className="subtitle"><span>Reviews</span></div>
            <h2>Happy Testimonials</h2>
          </div>

          <div className="row clearfix align-items-center">
            
            {/* Left Stats Counter Column */}
            <div className="state-col col-xl-3 col-lg-3 col-md-12 text-center mb-4 mb-lg-0">
              <div className="value">5k+</div>
              <div className="label">HAPPY <br /> REVIEWS</div>
            </div>

            {/* Center Carousel Column */}
            <div className="carousel-col col-xl-6 col-lg-6 col-md-12">
              <div className="carousel-box">
                <div className="testi-top">
                  <div className="slide-item">
                    <div className="slide-content">
                      <div className="text quote-text">"{testimonials[activeTesti].text}"</div>
                      <div className="testi-author-name">— {testimonials[activeTesti].author}</div>
                    </div>
                  </div>
                </div>

                <div className="thumbs-carousel-box">
                  <div className="testi-thumbs-container d-flex justify-content-center align-items-center">
                    {testimonials.map((item, idx) => {
                      const isActive = activeTesti === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveTesti(idx)}
                          className={`thumb-item cursor-pointer transition-all duration-300 mx-3 text-center ${
                            isActive ? 'active-thumb' : 'inactive-thumb'
                          }`}
                          style={{
                            transform: isActive ? 'scale(1.15)' : 'scale(0.88)',
                            opacity: isActive ? 1 : 0.6,
                            zIndex: isActive ? 10 : 1
                          }}
                        >
                          <div
                            className="thumb-img-wrap mx-auto rounded-full transition-all duration-300 overflow-hidden"
                            style={{
                              width: isActive ? '62px' : '48px',
                              height: isActive ? '62px' : '48px',
                              border: isActive ? '2px solid var(--color-golden)' : '2px solid rgba(245,233,215,0.2)',
                              boxShadow: isActive ? '0 0 15px rgba(212, 162, 76, 0.5)' : 'none'
                            }}
                          >
                            <img src={item.thumb} alt={item.author} className="w-full h-full object-cover rounded-full" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stats Counter Column */}
            <div className="rating-col col-xl-3 col-lg-3 col-md-12 text-center mt-4 mt-lg-0">
              <div className="value">4.4★</div>
              <div className="label">RATED ON <br /> ZOMATO & GOOGLE</div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
