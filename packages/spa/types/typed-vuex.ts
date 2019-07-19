/* eslint-disable @typescript-eslint/no-explicit-any */

type Define<D, T> = Extract<D, {type: T}>

type NoPayloads<D extends Record<string, any>> = {
  [T in D['type']]: Define<D, T>['payload'] extends null ? T : never
}[D['type']]

type HasPayloads<D extends Record<string, any>> = {
  [T in D['type']]: Define<D, T>['payload'] extends null ? never : T
}[D['type']]

export type GetterTree<State, Getters> = {
  [K in keyof Getters]: (state: State, getters: Getters) => Getters[K]
}

export interface Mutation<Type extends string, Payload = null> {
  type: Type
  payload: Payload
}

export type MutationTree<State, Mutations extends Record<string, any>> = {
  [T in Mutations['type']]: (
    state: State,
    payload: Define<Mutations, T>['payload']
  ) => void
}

type DefineAction<D, T> = Extract<D, {action: {type: T}}>
type DefineRootAction<D, T> = Extract<D, {root: {type: T}}>

export interface Action<
  Type extends string,
  RootType extends string,
  Return,
  Payload = null
> {
  action: {
    type: Type
    payload: Payload
  }
  return: Return
  root: {
    type: RootType
    payload: Payload
  }
}

interface Commit<Mutations extends Record<string, any>> {
  <T extends NoPayloads<Mutations>>(type: T): void
  <T extends Mutations['type']>(
    type: T,
    payload: Define<Mutations, T>['payload'],
    options?: {silent: boolean}
  ): void
}

interface Dispatch<
  Actions extends Record<string, any>,
  RootActions extends Record<string, any>
> {
  <T extends NoPayloads<Actions['action']>>(type: T): DefineAction<
    Actions,
    T
  >['return']
  <T extends HasPayloads<Actions['action']>>(
    type: T,
    payload: Define<Actions['action'], T>['payload']
  ): DefineAction<Actions, T>['return']
  <T extends NoPayloads<RootActions['root']>>(
    type: T,
    payload: null,
    options: {root: true}
  ): DefineRootAction<RootActions, T>['return']
  <T extends HasPayloads<RootActions['root']>>(
    type: T,
    payload: Define<RootActions['root'], T>['payload'],
    options: {root: true}
  ): DefineRootAction<RootActions, T>['return']
}

export interface RootDispatch<Actions extends Record<string, any>> {
  <T extends NoPayloads<Actions['root']>>(type: T): DefineRootAction<
    Actions,
    T
  >['return']
  <T extends HasPayloads<Actions['root']>>(
    type: T,
    payload: Define<Actions['root'], T>['payload']
  ): DefineRootAction<Actions, T>['return']
}

export interface ActionContext<
  State,
  Getters,
  Mutations extends Record<string, any>,
  Actions extends Record<string, any>,
  RootGetters = {},
  RootActions extends Record<string, any> = {}
> {
  state: State
  rootGetters: RootGetters
  getters: Getters
  commit: Commit<Mutations>
  dispatch: Dispatch<Actions, RootActions>
}

export interface RootActionContext<
  State,
  Getters,
  Mutations extends Record<string, any>,
  Actions extends Record<string, any>
> {
  state: State
  getters: Getters
  commit: Commit<Mutations>
  dispatch: RootDispatch<Actions>
}

export type ActionTree<
  Context,
  Actions extends Record<string, any>,
  This = any
> = {
  [T in Actions['action']['type']]: (
    this: This,
    ctx: Context,
    payload: Define<Actions['action'], T>['payload']
  ) => DefineAction<Actions, T>['return']
}

type ArrayKeys<A extends any[]> = {[I in keyof A]: A[I]}[number]
type DictKeys<D> = D extends Record<string, string>
  ? {[K in keyof D]: D[K]}[keyof D]
  : never
type IndexOf<D, O> = {[K in keyof D]: D[K] extends O ? K : never}[keyof D]
type Filter<T, S> = {[K in Extract<keyof T, S>]: T[K]}
type Param<M, K> = K extends keyof M ? M[K] : never
type DispatchMap<D extends Record<string, any>, T> = Define<
  D['action'],
  T
>['payload'] extends null
  ? () => DefineAction<D, T>['return']
  : (payload: Define<D['action'], T>['payload']) => DefineAction<D, T>['return']

export interface MapGetters<
  Getters extends Record<string, any>,
  RootGetters extends Record<string, any>
> {
  <N extends keyof Getters, M extends (keyof Getters[N])[]>(
    namespace: N,
    map: M
  ): {[K in ArrayKeys<M>]: () => Getters[N][K]}
  <
    N extends keyof Getters,
    M extends Partial<Record<keyof Getters[N], string>>
  >(
    namespace: N,
    map: M
  ): {
    [K in DictKeys<Filter<M, keyof Getters[N]>>]: () => Param<
      Getters[N],
      IndexOf<M, K>
    >
  }
  <M extends (keyof RootGetters)[]>(map: M): {
    [K in ArrayKeys<M>]: () => RootGetters[K]
  }
  <M extends Partial<Record<keyof RootGetters, string>>>(map: M): {
    [K in DictKeys<Filter<M, keyof RootGetters>>]: () => Param<
      RootGetters,
      IndexOf<M, K>
    >
  }
}

export interface MapActions<
  Actions extends Record<string, any>,
  RootActions extends Record<string, any>
> {
  <N extends keyof Actions, M extends Actions[N]['action']['type'][]>(
    namespace: N,
    map: M
  ): {[K in ArrayKeys<M>]: DispatchMap<Actions[N], K>}
  <
    N extends keyof Actions,
    M extends Partial<Record<Actions[N]['action']['type'], string>>
  >(
    namespace: N,
    map: M
  ): {
    [K in DictKeys<Filter<M, Actions[N]['action']['type']>>]: DispatchMap<
      Actions[N],
      IndexOf<M, K>
    >
  }
  <M extends RootActions['action']['type'][]>(map: M): {
    [K in ArrayKeys<M>]: DispatchMap<RootActions, K>
  }
  <M extends Partial<Record<RootActions['action']['type'], string>>>(map: M): {
    [K in DictKeys<Filter<M, RootActions['action']['type']>>]: DispatchMap<
      RootActions,
      IndexOf<M, K>
    >
  }
}
