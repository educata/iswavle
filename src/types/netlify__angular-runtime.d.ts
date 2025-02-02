// Some types are missing in the @netlify/angular-runtime package, so we need to declare them here
declare module '@netlify/angular-runtime/common-engine' {
  export function render(engine: any): Promise<Response>;
}
