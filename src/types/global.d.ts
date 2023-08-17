declare global {
  interface WindowEventMap {
    'route-push': CustomEvent<{
      nextUrl?: string;
      parentId?: number;
    }>;
    'route-create-document': CustomEvent<{
      id: number;
    }>;
    'route-remove-document': CustomEvent<{
      id: number;
      parentId?: number;
    }>;
    'route-put-document': CustomEvent<{
      id: number;
      title?: string;
      content?: string;
    }>;
    'header-change': CustomEvent<{
      id: number;
      title?: string;
    }>;
  }
}

export {};
