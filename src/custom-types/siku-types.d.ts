declare module 'siku-types' {
  export type HOCType<P extends {}, V extends {}> = (BaseComponent: React.StatelessComponent<P>) => React.StatelessComponent<V>;
}