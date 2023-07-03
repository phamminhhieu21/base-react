/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Types {
  import { Component } from 'react';

  export interface IRoute {
    path: string;
    component: Component;
    layout?: Component;
    isProtected?: boolean;
    children?: IRoute[];
  }

  export interface IObject<T = any> {
    [key: string]: T;
  }

  export interface ICoordinates {
    x: number;
    y: number;
  }

  export type Nullable<T> = T | null;

  export type Optional<T> = T | undefined;
}
