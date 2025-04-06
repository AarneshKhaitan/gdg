import * as React from "react";

const ToastContext = React.createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);
    
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function Toast({ title, description, type = "default", onClose }) {
  const typeClasses = {
    default: "bg-card border-border",
    success: "bg-green-950 border-green-800",
    error: "bg-red-950 border-red-800",
    warning: "bg-amber-950 border-amber-800",
    info: "bg-blue-950 border-blue-800"
  };

  const typeIcon = {
    default: null,
    success: (
      <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    ),
    error: (
      <div className="h-6 w-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
    ),
    warning: (
      <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      </div>
    ),
    info: (
      <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </div>
    ),
  };

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg ${typeClasses[type]}`}>
      {typeIcon[type]}
      <div className="flex-1">
        {title && <div className="font-medium">{title}</div>}
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}