'use client'

import { useState, useEffect } from 'react';

export const useFilter = () => {
    const [ordering, setOrdering] = useState('-id');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderingParam = params.get('ordering');
        if (orderingParam) {
            setOrdering(orderingParam);
        }
    }, []);

    return { ordering, setOrdering };
};
