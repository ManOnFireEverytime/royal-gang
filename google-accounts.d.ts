interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: any) => void;
        renderButton: (element: HTMLElement | null, config: any) => void;
        prompt: (momentListener?: (notification: any) => void) => void;
      };
      oauth2: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (tokenResponse: any) => void;
        }) => {
          requestAccessToken: () => void;
        };
      };
    };
  };
}