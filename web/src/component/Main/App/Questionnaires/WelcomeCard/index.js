import React, { useContext } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { CgHello } from "react-icons/cg";

import QuestionnairesContext from "../../../../../context/questionnaires";

export default function WelcomeCard({ step }) {
  const {
    ctxValue: { step: currentStep },
  } = useContext(QuestionnairesContext);

  return (
    <Card className={`flex-0 w-full ${currentStep !== step ? "h-0" : ""}`}>
      <CardHeader className="flex gap-3">
        <CgHello className="w-10 h-10" />
        <div className="flex">
          <p className="text-2xl">{"感恩大放送>>>雞不可失"}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="text-lg">
        <p>
          終於等到一年一度的感恩節，可以
          <del>不用寫Kudos plus Growth Feedback</del>直接表達感謝了！
        </p>
        <p>
          快把握機會在11/15~11/22感恩週對以下人.事.時.地.物表達感謝，除了傳出滿滿正能量，你還有機會抽中感恩Kudos
          Points 500點獎勵！
        </p>
        <p>
          另外加碼感恩節當天“雞不可失”快閃活動，除了頒獎給“被感謝人氣王”，現場還有熱鬧的互動活動，讓你享有滿滿的雞匯(機會)，沉浸在歡樂與感恩的氣氛中。(記得開啟Outlook小鈴鐺(其實沒這個功能XD)，掌握活動動向喔!)
        </p>
      </CardBody>
    </Card>
  );
}
