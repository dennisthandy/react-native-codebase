import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

type PortalState = {
  addToPortal: (component: ReactElement<any>) => string;
  removeFromPortal: (id: string) => void;
};

const PortalContext = createContext<PortalState | null>(null);

export const PortalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [elements, setElements] = useState<ReactElement<any>[]>([]);

  const addToPortal = (component: ReactElement<any>) => {
    setElements(prev => [...prev, component]);
    return component.props.id.toString();
  };

  const removeFromPortal = (id: string) => {
    setElements(prev => prev.filter(element => element.props.id !== id));
  };

  return (
    <PortalContext.Provider value={{ addToPortal, removeFromPortal }}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {elements}
      </View>
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

export const Portal = ({ children, id }: { children: ReactElement<any>; id: string }) => {
  const { addToPortal, removeFromPortal } = usePortal();

  React.useEffect(() => {
    addToPortal(React.cloneElement(children, { id }));
    return () => removeFromPortal(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, id]);

  return null;
};
