// Main Component
import Question from "../../elements/Question";
import MaxWidthWrapper from "../../wrappers/MaxWidthWrapper"

const FaqSection = ({questions}) => {
  
  return (
    <MaxWidthWrapper className="relative overflow-hidden px-[1.25rem] mx-auto mt-[5.05625rem]">
      {questions.map((item, index) => (
        <Question key={index} question={item.q} answer={item.a} />
      ))}
    </MaxWidthWrapper>
  );
};

export default FaqSection;