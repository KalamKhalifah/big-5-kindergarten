import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-600 p-4 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Kindergarten Assessment Tool. For educational purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;
