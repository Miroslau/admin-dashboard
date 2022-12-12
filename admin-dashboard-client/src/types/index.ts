import React from "react";

export type RouteType = {
  path: string;
  Component: React.FC | any;
};

export type User = {
  name: string;
  email: string;
  password: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  phoneNumber?: string;
  transactions?: [];
  role: string;
};
