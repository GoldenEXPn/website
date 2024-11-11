import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// Individual Question Component
const Question = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(iconRef.current, { rotation: 45, duration: 1, ease: 'elastic.out' });
    } else {
      gsap.to(iconRef.current, { rotation: 0, duration: 1, ease: 'elastic.out' });
    }
  }, [isOpen]);

  return (
    <div className="w-full rounded-xlg border mb-[.84375rem]">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleCollapse}
      >
        <h3 className="text-lg text-gray-600 font-medium text-pretty">{question}</h3>
        <span ref={iconRef}><AddRoundedIcon /></span>
      </div>
      {isOpen && <div className="p-4 text-gray-600 text-pretty">{answer}</div>}
    </div>
  );
};

export default Question;
