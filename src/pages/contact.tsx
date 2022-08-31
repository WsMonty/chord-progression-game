import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Contact = () => {
  return (
    <div className="contact">
      <h3 className="contact_title">Hey, visit my github: </h3>
      <a
        className="contact_title_link"
        href="https://github.com/WsMonty"
        target={'_blank'}
        rel="norefferer"
      >
        <StaticImage src="../images/github_logo.png" alt="Github Logo" />
      </a>
      <h3>
        Or write me a PM on Instagram if you have any questions or feedback!
      </h3>
      <a
        className="contact_title_link"
        href="https://instagram.com/gilles_grethen_"
        target={'_blank'}
        rel="norefferer"
      >
        <StaticImage
          src="../images/insta-logo.png"
          alt="Instagram Logo"
          width={120}
        />
      </a>
    </div>
  );
};

export default Contact;
