import { DependencyList, useCallback, useEffect, useState } from "react";

import { useToast } from "../toast";

const idToast = "inputError";

type CustomHook = [string, (value: string) => void, boolean?];

export const useEmail = (initialValue: string) => {
  const [hook, setHook] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleValue = (value: string) => {
    setHook(value.toLocaleLowerCase());

    const regex = /^[a-zA-Z0-9.@]*$/;

    if (regex.test(value) &&
      value.includes("@") && value.includes(".") &&
      value.indexOf("@") > 0 &&
      value.lastIndexOf(".") < value.length - 1 &&
      value.lastIndexOf(".") > value.indexOf("@") + 1 &&
      value.split("@").length === 2 &&
      value.length < 50) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return [hook, handleValue, isValid] as CustomHook;
};

export const usePassword = (initialValue: string) => {
  const [hook, setHook] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleValue = (value: string) => {
    setHook(value);

    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

    if (regex.test(value) &&
      value.length >= 8 &&
      value.length <= 50) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return [hook, handleValue, isValid] as CustomHook;
};

export const useName = (initialValue: string) => {
  const { error, dismiss } = useToast();
  const [hook, setHook] = useState<string>(initialValue);

  const handleValue = (value: string) => {
    dismiss({ id: idToast });
    // Only letters, numbers, underscores, dots, spaces
    const regex = /^[a-zA-Z0-9_. ]*$/;

    if (value === "" || regex.test(value)) {
      setHook(value);
    } else {
      error({ message: "Invalid character", id: idToast });
    }
  };

  return [hook, handleValue] as CustomHook;
};

export const useUsername = (initialValue: string) => {
  const { error, dismiss } = useToast();
  const [hook, setHook] = useState<string>(initialValue);

  const handleValue = (value: string) => {
    dismiss({ id: idToast });
    // Only letters, numbers, underscores and dots
    const regex = /^[a-zA-Z0-9_.]*$/;

    if (value === "" || regex.test(value)) {
      setHook(value.toLocaleLowerCase());
    } else {
      error({ message: "Invalid character", id: idToast });
    }
  };

  return [hook, handleValue] as CustomHook;
};

export const useNumber = (initialValue: string | number) => {
  const { error, dismiss } = useToast();
  const [hook, setHook] = useState<string | number>(initialValue);

  const handleValue = (value: string) => {
    dismiss({ id: idToast });
    // Only numbers
    const regex = /^[0-9]*$/;

    if (value === "" || regex.test(value)) {
      setHook(value);
    } else {
      error({ message: "Invalid value", id: idToast });
    }
  };

  return [hook, handleValue] as CustomHook;
};

export const useProvince = (initialValue: string) => {
  const { error, dismiss } = useToast();
  const [hook, setHook] = useState<string>(initialValue);

  const handleValue = (value: string) => {
    dismiss({ id: idToast });
    // Only letters
    const regex = /^[a-zA-Z]*$/;

    if (value === "" || regex.test(value)) {
      setHook(value.toUpperCase());
    } else {
      error({ message: "Invalid character", id: idToast });
    }
  };

  return [hook, handleValue] as CustomHook;
};

export const usePrice = (initialValue: string | number) => {
  const { error, dismiss } = useToast();
  const [hook, setHook] = useState<string | number>(initialValue);

  const handleValue = (value: string) => {
    dismiss({ id: idToast });
    // Only numbers and dots
    const regex = /^[0-9.]*$/;

    if (value === "" || regex.test(value)) {
      setHook(value);
    } else {
      error({ message: "Invalid value", id: idToast });
    }
  };

  return [hook, handleValue] as CustomHook;
};

export function useDebounceEffect(effect: any, deps: DependencyList, delay = 250) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}