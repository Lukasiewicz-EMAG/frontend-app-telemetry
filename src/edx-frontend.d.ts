declare module '@edx/frontend-platform/i18n';
declare module '@edx/frontend-platform' {
  export const APP_INIT_ERROR: string;
  export const APP_READY: string;
  export function subscribe(event: string, callback: Function): void;
  export function initialize(options: any): void;
  export function getConfig(): any;
}
declare module '@edx/frontend-platform/logging' {
  export function getLoggingService(): any;
}

declare module '@edx/frontend-platform/react' {
  export function AppProvider(props: any): JSX.Element;
  export function ErrorPage(props: any): JSX.Element;
}

declare module '@edx/frontend-component-header' {
  export default function Header(props: any): JSX.Element;
}

declare module '@openedx/frontend-slot-footer' {
  export default function FooterSlot(props: any): JSX.Element;
}