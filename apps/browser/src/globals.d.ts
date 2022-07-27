declare function escape(s: string): string;
declare function unescape(s: string): string;
declare let opr: Opera;
declare let safari: any;

// Opera Types:
interface Opera {
  sidebarAction: OperaSidebarAction;
  addons: unknown;
}

/**
 * {@link} https://dev.opera.com/extensions/sidebar-action-api/#type-colorarray
 */
type ColorArray = [r: number, g: number, b: number, a: number];

/**
 * {@link} https://dev.opera.com/extensions/sidebar-action-api/#type-imagedatatype
 */
type ImageDataType = ImageData;

/**
 * Ref: https://dev.opera.com/extensions/sidebar-action-api/
 */
interface OperaSidebarAction {
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-settitle
   */
  setTitle: (details: { title: string; tabId?: number }) => void;
  /**
   *{@link} https://dev.opera.com/extensions/sidebar-action-api/#method-gettitle
   */
  getTitle: (details: { tabId?: number }, callback: (result: string) => void) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-seticon
   */
  setIcon: (
    details: {
      imageData?: ImageDataType | Record<number, ImageDataType>;
      path?: string | unknown;
      tabId?: number;
    },
    callback?: () => void
  ) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-setpanel
   */
  setPanel: (details: { tabId?: number; panel: string }) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-getpanel
   */
  getPanel: (details: { tabId?: number }, callback: (result: string) => void) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-setbadgetext
   */
  setBadgeText: (details: { text: string; tabId?: number }) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-getbadgetext
   * * Not supported on Mac yet
   */
  getBadgeText: (details: { tabId?: number }, callback: (result: string) => void) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#method-setbadgebackgroundcolor
   * * Not supported on Mac yet
   */
  setBadgeBackgroundColor: (details: { color: string | ColorArray; tabId?: number }) => void;
  /**
   *{@link} https://dev.opera.com/extensions/sidebar-action-api/#method-getbadgebackgroundcolor
   * * Not supported on Mac yet
   */
  getBadgeBackgroundColor: (
    details: { tabId?: number },
    callback: (result: ColorArray) => void
  ) => void;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#events-onfocus
   * * Not supported on Mac yet
   */
  onFocus: chrome.events.Event<(window: Window) => void>;
  /**
   * {@link} https://dev.opera.com/extensions/sidebar-action-api/#events-onblur
   * * Not supported on Mac yet
   */
  onBlur: chrome.events.Event<(window: Window) => void>;
}
