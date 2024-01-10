import type * as Koa from "koa";
import type Router from "@koa/router";

export type Ctx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  { text: string }
>;

export type Next = Koa.Next;

export interface TranslationRequest {
  text: string;
}
