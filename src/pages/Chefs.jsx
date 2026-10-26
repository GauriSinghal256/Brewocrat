import React from 'react';
import {
  TextReveal,
  FadeLeft,
  ScaleReveal,
  ImageShineReveal
} from '../components/AnimatedComponents';

export default function Chefs({ onOpenBookModal }) {
  return (
    <div className="chefs-page">
      {/* Inner Banner */}
      <section className="inner-banner">
        <div className="image-layer" style={{ backgroundImage: "url('https://img.youtube.com/vi/OJALeKRR0kw/maxresdefault.jpg')" }}></div>
        <div className="auto-container">
          <TextReveal className="inner">
            <h1>Chefs & Brewmasters</h1>
            <div className="sub_text">
              <p>Brewocrat Skybar & Kitchen - <span className="primary-color">Crafting Artisanal Brews & Gourmet Cuisine.</span></p>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Chef Section */}
      <section className="chef-section-1 section-kt">
        <div className="auto-container">
          <div className="row clearfix">
            <FadeLeft className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div className="title-box">
                <div className="subtitle"><span>meet our culinary team</span></div>
                <h2>Executive Chefs & Master Brewmasters</h2>
                <p> Our master culinary team and expert brewmasters craft handcrafted craft beers, smoky tandoori specialties, Mediterranean platters, wood-fired pizzas, and exquisite Asian dim sums with passion and precision.</p>
                <div className="link-box">
                  <button onClick={onOpenBookModal} className="theme-btn btn-style-two clearfix border-0 bg-transparent">
                    <span className="btn-wrap">
                      <span className="text-one">book a table</span>
                      <span className="text-two">book a table</span>
                    </span>
                  </button>
                </div>
              </div>
            </FadeLeft>

            <ScaleReveal className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <ImageShineReveal className="chef-image image1">
                <img src="/images/mainchef1.jpg" alt="Master Brewmaster & Chef" />
              </ImageShineReveal>
              <div className="round-stamp">
                <img className="stamp_icon" src="/images/chefcap.png" alt="stamp" />
              </div>
            </ScaleReveal>

            <ScaleReveal delay={0.2} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <ImageShineReveal className="chef-image image2">
                <img src="/images/mainchef2.jpg" alt="Culinary Team" />
              </ImageShineReveal>
              <ImageShineReveal className="chef-image image3">
                <img src="/images/mainchef3.jpg" alt="Brewocrat Kitchen" />
              </ImageShineReveal>
            </ScaleReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
