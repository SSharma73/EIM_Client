"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";



const CommonPhoneInput = ({
  value,
  onChange,
  country,
  errorMessage,
}) => {
  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      countryCodeEditable={false}
      enableLongNumbers={false}
      enableSearch={true}
      inputProps={{ required: true }}
      placeholder={errorMessage}
    />
  );
};

export default CommonPhoneInput;
