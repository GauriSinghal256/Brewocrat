import React from 'react';
import {
  TextReveal,
  ImageShineReveal,
  StaggerContainer,
  StaggerItem
} from '../components/AnimatedComponents';

export default function Gallery() {
  const images = [
    { src: 'https://b.zmtcdn.com/data/pictures/8/18953618/fba0563782b2d1cb79c47232d3bc030e.jpg', title: 'Brewocrat Rooftop Dining' },
    { src: 'https://b.zmtcdn.com/data/pictures/8/18953618/ea3adbabd87e47ffa47e0f6e33394a2d.jpeg', title: 'Skybar Craft Beers' },
    { src: 'https://b.zmtcdn.com/data/pictures/8/18953618/a58b6faf2bceb55fb251fb49bf73210b.jpg', title: 'Outdoor Seating Vibes' },
    { src: 'https://b.zmtcdn.com/data/pictures/8/18953618/be4066a788f9a6091c3f0cc085879755.jpg', title: 'Gourmet Culinary Specials' },
    { src: 'https://b.zmtcdn.com/data/pictures/8/18953618/9193297f7201519323440fd58138cda7.jpg', title: 'Brewery Bar Counter' },
    { src: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/e3b9ed67ca4d2c5263e7cefe12cee714.jpg', title: 'Artisanal Cocktails & Drafts' },
    { src: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/33850fa2370c35d704e14fb785a26d3e.jpg', title: 'Element One Rooftop View' },
    { src: 'https://b.zmtcdn.com/data/reviews_photos/db2/e0f9bab48704e9b9949ac8476f205db2_1609767728.jpg', title: 'Nightlife & Screenings' },
    { src: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/eead88910d187f73bd08e968cfe1f744.jpg', title: 'Fresh Brewed Craft Beer' },
    { src: 'https://b.zmtcdn.com/data/pictures/chains/3/18944973/b21a5da2badf205c9b1bcad381164049.jpg', title: 'Brewocrat Kitchen Delights' }
  ];

  return (
    <div className="gallery-page">
      {/* Inner Banner */}
      <section className="inner-banner">
        <div className="image-layer" style={{ backgroundImage: "url('https://b.zmtcdn.com/data/pictures/8/18953618/fba0563782b2d1cb79c47232d3bc030e.jpg')" }}></div>
        <div className="auto-container">
          <TextReveal className="inner">
            <h1>Photo Gallery</h1>
            <div className="sub_text">
              <p>Brewocrat Skybar & Microbrewery - <span className="primary-color"> Rooftop Ambience, Craft Beer & Gourmet Dishes.</span></p>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="image-gallery section-kt">
        <div className="auto-container">
          <TextReveal className="title-box centered">
            <div className="subtitle"><span>Gallery</span></div>
            <h2>Brewocrat Gallery</h2>
          </TextReveal>
          <StaggerContainer className="row clearfix">
            {images.map((img, idx) => (
              <StaggerItem key={idx} variant="scale" className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <ImageShineReveal className="gallery-block">
                  <div className="image h-64 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </ImageShineReveal>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
