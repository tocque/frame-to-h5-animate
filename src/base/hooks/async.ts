import { useMemo, useState } from "react"

export const usePromiseValue = <T>(promise: Promise<T>) => {
    const [result, setResult] = useState<[undefined, true] | [T, false]>([void 0, true]);
    useMemo(() => {
        setResult([void 0, true]);
        promise.then((value) => {
            setResult([value, false]);
        });
    }, [promise]);
    return result;
}
