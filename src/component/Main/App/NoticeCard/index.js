import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { Trans } from "react-i18next";

export default function NoticeCard() {
  return (
    <Card className={`flex-0 w-full mb-6 bg-warning/20 text-warning-600`}>
      <CardHeader className="flex gap-3">
        <PiWarningOctagonDuotone className="w-8 h-8" />
        <p className="text-lg">
          <Trans i18nKey="text" ns="notice">
            注意：此問卷已 <strong>停止資料收集</strong>，感謝您的參與！
          </Trans>
        </p>
      </CardHeader>
    </Card>
  );
}
