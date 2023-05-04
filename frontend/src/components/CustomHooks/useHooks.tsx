import { useEffect, useState } from "react";

type FetchData<T> = () => Promise<T>;

const useFetchData = <T,>(
    fetchData: FetchData<T>
): [T | null, boolean, Error | null] => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            try {
                const result = await fetchData();
                setData(result);
            } catch (error: any) {
                setError(error);
            }
            setLoading(false);
        };
        fetchDataAsync();
    }, [fetchData]);

    return [data, loading, error];
};
export default useFetchData;