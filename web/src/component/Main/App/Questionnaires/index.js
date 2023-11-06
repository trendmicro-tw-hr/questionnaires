import React, { useContext } from "react";
import { ScrollShadow } from "@nextui-org/react";

import QuestionnairesContext from "../../../../context/questionnaires";
import QuestionCard from "./QuestionCard";
import ThanksCard from "./ThanksCard";
import HelpCard from "./HelpCard";
import WelcomeCard from "./WelcomeCard";

export default function Questionnaires() {
  const {
    ctxValue: { step, questions, loading },
  } = useContext(QuestionnairesContext);

  let index = -1;
  return (
    <ScrollShadow
      orientation="horizontal"
      className="h-full overflow-hidden"
      isEnabled={false}
    >
      <div
        className="flex flex-nowrap flex-row w-full h-full gap-6 !duration-500 questionnaires"
        style={{ transform: `translateX(calc((-100% - 1.5rem) * ${step}))` }}
      >
        <WelcomeCard key="WelcomeCard" step={(index += 1)} />
        {questions.map((question, i) => {
          return (
            <React.Fragment key={`Question-${i}`}>
              <QuestionCard
                key={`QuestionCard-${i}`}
                index={i}
                step={(index += 1)}
              />
              {question.help && (
                <HelpCard key={`HelpCard-${i}`} index={i} step={(index += 1)} />
              )}
            </React.Fragment>
          );
        })}
        {loading ? null : <ThanksCard key="ThanksCard" step={(index += 1)} />}
      </div>
    </ScrollShadow>
  );
}
