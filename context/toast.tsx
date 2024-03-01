import { ImageSource } from "expo-image";

import React, { createContext, useContext, useState } from "react";
import { toast, ToastOptions, Toasts } from "@backpackapp-io/react-native-toast";
import { Image, View } from "react-native";

import SafeAreaLayout from "../appLayouts/SafeAreaLayout";

import AppText from "@/components/app/AppText";
import { windowWidth } from "../utils/utils";

import { colorWhite, stylesBase } from "../utils/styles";

type ToastContextProps = {
  success: ({ message, id }: ToastProps) => void;
  error: ({ message, id }: ToastProps) => void;
  loading: ({ message, id, ms }: ToastProps) => void;
  blank: ({ message, id }: ToastProps) => void;
  dismiss: ({ id }: ToastProps) => void;
}

type ToastProviderProps = {
  children: React.ReactNode;
}

type ToastProps = {
  message?: any;
  id?: string | undefined;
  ms?: number | null;
};

const ToastContext = createContext({} as ToastContextProps) as React.Context<ToastContextProps>;

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastIsActive, setToastIsActive] = useState<boolean>(false);

  const dismissToast = () => toastIsActive && toast.dismiss();

  const setToastOptions = (id: string | undefined = undefined): ToastOptions => ({
    id,
    disableShadow: true,
  });

  const success = ({ message, id }: ToastProps) => {
    dismissToast();
    setToastIsActive(true);
    toast.success(message, {
      ...setToastOptions(id),
      customToast: () => <CustomToast type="success" message={message} />,
    });
  };

  const error = ({ message, id }: ToastProps) => {
    dismissToast();
    setToastIsActive(true);
    toast.error(message, {
      ...setToastOptions(id),
      customToast: () => <CustomToast type="error" message={message} />,
    });
  };

  const loading = ({ message, id, ms }: ToastProps) => {
    dismissToast();
    setToastIsActive(true);
    toast.loading(message, {
      ...setToastOptions(id),
      customToast: () => <CustomToast type="loading" message={message} />,
    });
    if (ms) setTimeout(() => toast.dismiss(id), ms);
  };

  const blank = ({ message, id }: ToastProps) => {
    dismissToast();
    setToastIsActive(true);
    toast(message, {
      ...setToastOptions(id),
      customToast: () => <CustomToast type="blank" message={message} />,
    });
  };

  const dismiss = ({ id }: ToastProps) => {
    toast.dismiss(id);
  };

  const contextValues: ToastContextProps = {
    success,
    error,
    loading,
    blank,
    dismiss,
  };

  return (
    <ToastContext.Provider value={contextValues}>
      <View style={{ zIndex: 999999 }}>
        <SafeAreaLayout>
          <Toasts />
        </SafeAreaLayout>
      </View>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;

type ToastType = "success" | "error" | "loading" | "blank";

type CustomToastProps = {
  type: ToastType
  message: string;
};

const getToastIcon = (type: ToastType) => {
  const icon: Partial<Record<ToastType, ImageSource>> = {
    success: require("../assets/toasts/Success.svg"),
    error: require("../assets/toasts/Error.svg"),
  };
  return icon[type];
};

function CustomToast({
  type,
  message,
}: CustomToastProps) {

  const icon = getToastIcon(type);

  return (
    <View
      style={{
        width: windowWidth - 30,
        height: 45,
        ...stylesBase.flexRowCenter,
      }}>
      <View
        style={{
          height: 45,
          paddingHorizontal: 15,
          backgroundColor: colorWhite,
          ...stylesBase.flexRowStartCenter,
          borderRadius: 12,
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
        }}>
        <Image
          source={icon}
          style={{
            height: 15,
            width: 15,
          }}
        />
        <AppText big style={{ paddingHorizontal: 25 }}>
          {message}
        </AppText>
      </View>
    </View>
  );
}
