import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from '../components/VideoModal';
import { FaPlay, FaBeerMugEmpty, FaUtensils, FaMusic, FaUsers } from 'react-icons/fa6';
import {
  TextReveal,
  FadeLeft,
  FadeRight,
  ScaleReveal,
  ImageShineReveal,
  StaggerContainer,
  StaggerItem
} from '../components/AnimatedComponents';

export default function About({ onOpenBookModal }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="about-page">
      {/* Inner Banner */}
      <section className="inner-banner">
        <div className="image-layer" style={{ backgroundImage: "url('https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg')" }}></div>
        <div className="auto-container">
          <TextReveal className="inner">
            <h1>About Brewocrat</h1>
            <div className="sub_text">
              <p>Gurgaon's Premier <strong>Microbrewery, Skybar & Multi-Cuisine Kitchen</strong> — <span className="primary-color">Craft Beer & Rooftop Dining</span></p>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section-kt">
        <div className="auto-container">
          <TextReveal className="title-box centered">
            <div className="subtitle"><span>our story</span></div>
            <h2>Where Craft Brews & Flavors Meet <span className="theme_color">Panoramic Skybar Views</span> for an <span className="theme_color">Unforgettable</span> Experience!</h2>
          </TextReveal>
          <div className="row clearfix">
            <FadeLeft className="text-col col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="inner">
                <div className="text">
                  Incorporated in 2018 and operated by <strong>BREWOCRAT SERVICES PRIVATE LIMITED</strong>, Brewocrat is a chic microbrewery and skybar located at Element One, Sector 47, Gurgaon. Featuring an energetic interplay of reds, whites, and plush blue-hued sofas, we bring together fresh artisanal craft beers, masterfully crafted cocktails, live music, sports screenings, and gourmet multi-cuisine dining.
                </div>
                <div className="feature-info">
                  <div className="feature-info-box">
                    <div className="feature-title">
                      <FaBeerMugEmpty className="text-2xl text-gold-400 mr-2" />
                      <h6>Craft <br /> Brews</h6>
                    </div>
                    <div className="infotext">Freshly brewed craft beers on tap starting from ₹195, crafted by master brewers.</div>
                  </div>
                  <div className="feature-info-box">
                    <div className="feature-title">
                      <FaUtensils className="text-2xl text-gold-400 mr-2" />
                      <h6>Rooftop <br /> Skybar</h6>
                    </div>
                    <div className="infotext">Lower terrace rooftop seating with vibrant indoor lounge & live sports screenings.</div>
                  </div>
                </div>
                <div className="booking-info">
                  <div className="bk-title">Table Reservations : <br />
                    <a className="bk-no" href="tel:+917303203535">+91 73032 03535</a>
                  </div>
                  <div className="link-box">
                    <button onClick={onOpenBookModal} className="theme-btn btn-style-two clearfix border-0 bg-transparent">
                      <span className="btn-wrap">
                        <span className="text-one">book a table</span>
                        <span className="text-two">book a table</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </FadeLeft>
            <FadeRight className="image-col col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="inner">
                <ImageShineReveal className="images">
                  <div className="image rounded-xl overflow-hidden shadow-2xl">
                    <img src="https://b.zmtcdn.com/data/pictures/8/18953618/800dea653d01ee7809661aa6055d96ca.jpg" alt="Brewocrat Ambience" className="w-full h-auto object-cover" />
                  </div>
                </ImageShineReveal>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-anim-image"><img src="/images/special-dish1.png" alt="dish" /></div>
        <div className="image-layer" style={{ backgroundImage: "url('https://img.youtube.com/vi/OJALeKRR0kw/maxresdefault.jpg')" }}></div>
        <div className="auto-container">
          <ScaleReveal className="content-box">
            <div className="play-btn">
              <button onClick={() => setIsVideoOpen(true)} className="lightbox-image theme-btn border-0 bg-transparent flex items-center justify-center cursor-pointer" aria-label="Play Brewocrat video">
                <span className="icon flex items-center justify-center"><FaPlay className="text-white text-xs ml-0.5" /><i className="ripple"></i></span>
              </button>
            </div>
          </ScaleReveal>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us-two section-kt">
        <div className="auto-container">
          <TextReveal className="title-box centered">
            <div className="subtitle"><span>why choose brewocrat</span></div>
            <h2>Why Dine & Drink With Us</h2>
          </TextReveal>
          <StaggerContainer className="row clearfix">
            <StaggerItem variant="scale" className="why-block-two col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <ImageShineReveal className="inner-box">
                <div className="image-box h-64 overflow-hidden rounded-lg">
                  <img src="https://b.zmtcdn.com/data/pictures/8/18953618/9193297f7201519323440fd58138cda7.jpg" alt="Expert Brewmasters" className="w-full h-full object-cover" />
                </div>
                <div className="over-box"><h6>Craft Brewmasters</h6></div>
              </ImageShineReveal>
            </StaggerItem>
            <StaggerItem variant="scale" className="why-block-two col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <ImageShineReveal className="inner-box">
                <div className="image-box h-64 overflow-hidden rounded-lg">
                  <img src="https://b.zmtcdn.com/data/pictures/8/18953618/be4066a788f9a6091c3f0cc085879755.jpg" alt="Multi Cuisine Gourmet" className="w-full h-full object-cover" />
                </div>
                <div className="over-box"><h6>Multi-Cuisine Menu</h6></div>
              </ImageShineReveal>
            </StaggerItem>
            <StaggerItem variant="scale" className="why-block-two col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <ImageShineReveal className="inner-box">
                <div className="image-box h-64 overflow-hidden rounded-lg">
                  <img src="https://b.zmtcdn.com/data/pictures/8/18953618/fba0563782b2d1cb79c47232d3bc030e.jpg" alt="Skybar Rooftop" className="w-full h-full object-cover" />
                </div>
                <div className="over-box"><h6>Skybar Rooftop</h6></div>
              </ImageShineReveal>
            </StaggerItem>
            <StaggerItem variant="scale" className="why-block-two col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <ImageShineReveal className="inner-box">
                <div className="image-box h-64 overflow-hidden rounded-lg">
                  <img src="https://b.zmtcdn.com/data/reviews_photos/db2/e0f9bab48704e9b9949ac8476f205db2_1609767728.jpg" alt="Live Music & DJ" className="w-full h-full object-cover" />
                </div>
                <div className="over-box"><h6>Live DJ & Sports</h6></div>
              </ImageShineReveal>
            </StaggerItem>
          </StaggerContainer>

          <ScaleReveal className="fact-counter">
            <div className="row clearfix">
              <div className="fact-block col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="inner clearfix">
                  <div className="fact-count"><div className="count-box"><span className="count-text">4.4</span><i>★</i></div></div>
                  <div className="fact-title">Ratings (5K+ Reviews)</div>
                  <p>Top rated microbrewery & rooftop pub in Gurgaon on Zomato & Google.</p>
                </div>
              </div>
              <div className="fact-block col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="inner clearfix">
                  <div className="fact-count"><div className="count-box"><span className="count-text">100</span><i>+</i></div></div>
                  <div className="fact-title">Gourmet Dishes</div>
                  <p>Continental, North Indian, Asian, Mediterranean & Wood-fired Pizzas.</p>
                </div>
              </div>
              <div className="fact-block col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="inner clearfix">
                  <div className="fact-count"><div className="count-box"><span className="count-text">6</span><i>+</i></div></div>
                  <div className="fact-title">Craft Beer Taps</div>
                  <p>Freshly brewed craft beers served daily starting from ₹195 per pint.</p>
                </div>
              </div>
              <div className="fact-block col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="inner clearfix">
                  <div className="fact-count"><div className="count-box"><span className="count-text">2018</span></div></div>
                  <div className="fact-title">Established</div>
                  <p>Operated by BREWOCRAT SERVICES PRIVATE LIMITED with annual revenue over ₹7 Cr.</p>
                </div>
              </div>
            </div>
          </ScaleReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section-kt">
        <div className="auto-container">
          <TextReveal className="title-box centered">
            <div className="subtitle"><span>our offerings</span></div>
            <h2>The Brewocrat Experience</h2>
          </TextReveal>
          <div className="row clearfix">
            <FadeLeft className="s-col col-lg-4 col-md-6 col-sm-12">
              <div className="inner">
                <div className="s-block alternate">
                  <div className="inner">
                    <div className="icon-box flex items-center justify-center">
                      <FaBeerMugEmpty className="text-4xl text-gold-400" />
                    </div>
                    <h6>Craft Beer & <br /> Microbrewery</h6>
                    <div className="text">Enjoy freshly brewed craft beers on tap, signature handcrafted cocktails, and full bar menu.</div>
                  </div>
                </div>
                <div className="s-block alternate">
                  <div className="inner">
                    <div className="icon-box flex items-center justify-center">
                      <FaUtensils className="text-4xl text-gold-400" />
                    </div>
                    <h6>Rooftop & <br /> Skybar Dining</h6>
                    <div className="text">Relax on our open-air lower terrace rooftop with panoramic views, chic decor, and cozy blue sofas.</div>
                  </div>
                </div>
              </div>
            </FadeLeft>
            <FadeRight className="s-col last col-lg-4 col-md-6 col-sm-12">
              <div className="inner">
                <div className="s-block">
                  <div className="inner">
                    <div className="icon-box flex items-center justify-center">
                      <FaMusic className="text-4xl text-gold-400" />
                    </div>
                    <h6>Live DJ & <br /> Match Screenings</h6>
                    <div className="text">Experience high-energy nightlife, live music bands, DJ sets, and live sports screening for match days.</div>
                  </div>
                </div>
                <div className="s-block">
                  <div className="inner">
                    <div className="icon-box flex items-center justify-center">
                      <FaUsers className="text-4xl text-gold-400" />
                    </div>
                    <h6>Group Parties & <br /> Private Events</h6>
                    <div className="text">Spacious seating accommodating large groups, corporate outings, birthday bashes, and romantic dates.</div>
                  </div>
                </div>
              </div>
            </FadeRight>
            <ScaleReveal className="image-col col-lg-4 col-md-12 col-sm-12">
              <ImageShineReveal className="inner">
                <div className="image-box h-80 overflow-hidden rounded-xl shadow-2xl">
                  <img src="https://b.zmtcdn.com/data/pictures/chains/3/18944973/6c597800757903f5a442c7ea37bd6c13.jpg?output-format=webp" alt="Brewocrat experience" className="w-full h-full object-cover" />
                </div>
              </ImageShineReveal>
            </ScaleReveal>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="image-gallery section-kt">
        <div className="carousel-box">
          <div className="auto-container">
            <TextReveal className="title-box centered">
              <div className="subtitle"><span>Gallery</span></div>
              <h2>Brewocrat Gallery</h2>
            </TextReveal>
            <StaggerContainer className="row clearfix justify-content-center">
              <StaggerItem variant="scale" className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <ImageShineReveal className="gallery-block">
                  <div className="image h-64 overflow-hidden rounded-lg shadow-lg">
                    <img src="https://b.zmtcdn.com/data/pictures/8/18953618/fba0563782b2d1cb79c47232d3bc030e.jpg" alt="Brewocrat Ambience 1" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                </ImageShineReveal>
              </StaggerItem>
              <StaggerItem variant="scale" className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <ImageShineReveal className="gallery-block">
                  <div className="image h-64 overflow-hidden rounded-lg shadow-lg">
                    <img src="https://b.zmtcdn.com/data/pictures/8/18953618/ea3adbabd87e47ffa47e0f6e33394a2d.jpeg" alt="Brewocrat Food 2" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                </ImageShineReveal>
              </StaggerItem>
              <StaggerItem variant="scale" className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <ImageShineReveal className="gallery-block">
                  <div className="image h-64 overflow-hidden rounded-lg shadow-lg">
                    <img src="https://b.zmtcdn.com/data/pictures/8/18953618/a58b6faf2bceb55fb251fb49bf73210b.jpg" alt="Brewocrat Craft Beer 3" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                </ImageShineReveal>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoOpen}
        videoUrl="https://youtu.be/OJALeKRR0kw?si=l28Iokqqpd7a7Jp3"
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
