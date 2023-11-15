import React, { useContext } from "react";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { Trans } from "react-i18next";

import QuestionnairesContext from "../../../../../context/questionnaires";

export default function WelcomeCard({ step }) {
  const {
    ctxValue: { step: currentStep },
  } = useContext(QuestionnairesContext);

  return (
    <Card className={`flex-0 w-full ${currentStep !== step ? "h-0" : ""}`}>
      <CardHeader className="flex gap-3">
        <div className="flex">
          <Image
            alt="welcome"
            src={process.env.PUBLIC_URL + "/welcome_header.png"}
          />
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="text-lg">
        <p>
          <Trans i18nKey="info_1" ns="welcome_card">
            把握機會在{" "}
            <strong>
              <u>11/15~11/22(12 pm前)</u>
            </strong>{" "}
            送出你的感謝，除了傳達滿滿的正能量外，還有100位參加活動的人可以抽中{" "}
            <strong>Kudos Points 200點</strong> 獎勵（等同 200元電子禮券）！
          </Trans>
        </p>
        <br />
        <p>
          <Trans i18nKey="info_2" ns="welcome_card">
            ★精采預告：
          </Trans>
        </p>
        <p>
          <Trans i18nKey="info_3" ns="welcome_card">
            感恩節當天還有
            <span className="text-TrendMicro">
              「感恩大放送 {">>>"} “雞”不可失 快閃活動」
            </span>
            ，你所感謝的人，有機會成為 <strong>"Kudos人氣王"</strong>
            獲贈感謝好禮喔！記得book你的Outlook calendar，當天一起來鬥熱鬧~
          </Trans>
        </p>
      </CardBody>
    </Card>
  );
}
