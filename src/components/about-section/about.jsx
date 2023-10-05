import React from 'react'
import './about.scss'
import image1 from '../../images/Screenshot (1037).png'
import image2 from '../../images/Screenshot (1038).png'
import image3 from '../../images/Screenshot (1040).png'

const About = () => {
  return (
    <section className='section-2'>
    <h2 className='heading'>
        Exciting tours for adventurous people
    </h2>
    <div className='about-and-photos'>
        <div className='about-text'>
            <h3 className='about-text-heading'>
                You're going to fall in love with nature
            </h3>
            <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus animi provident voluptate adipisci odit non placeat fuga, recusandae explicabo voluptates aliquam aut quasi impedit quidem laboriosam commodi quos possimus.</p>
            <h3 className='about-text-heading'>
                Live adventures like you never have before
            </h3>
            <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus animi provident voluptate adipisci odit non placeat fuga, recusandae explicabo voluptates aliquam aut quasi impedit quidem laboriosam commodi quos possimus.</p>
        </div>
        <div className="composition">
            <img src={image1} alt="Photo 1" className="composition-image composition-image-1" />
            <img src={image2} alt="Photo 2" className="composition-image composition-image-2" />
            <img src={image3} alt="Photo 3" className="composition-image composition-image-3" />
        </div>
    </div>
  </section>  )
}

export default About