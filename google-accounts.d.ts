interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: any) => void;
        renderButton: (element: HTMLElement | null, config: any) => void;
        prompt: (momentListener?: (notification: any) => void) => void;
      };
    };
  };
}