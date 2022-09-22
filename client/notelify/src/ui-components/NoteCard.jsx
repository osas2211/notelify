/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import Card001 from "./Card001";
import { View } from "@aws-amplify/ui-react";
export default function NoteCard(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="426px"
      height="273px"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "NoteCard")}
    >
      <Card001
        display="flex"
        gap="10px"
        position="absolute"
        top="0px"
        left="0px"
        direction="column"
        border="1px SOLID rgba(244,244,245,1)"
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.05999999865889549)"
        borderRadius="12px"
        padding="17px 17px 17px 17px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Card 2")}
      ></Card001>
    </View>
  );
}
