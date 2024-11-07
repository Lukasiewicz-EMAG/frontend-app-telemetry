import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { DetailsData } from '../pages/Inf/Details/types';
import { Loader } from '../components/Loader/Loader';
import { useGetData } from '../hooks/useGetData';

export interface Course {
  id: string;
  name: string;
  course_type: string;
}


export interface SelectionContextProps<T> {
  items: T[];
  selectedItem: Course | undefined;
  setSelectedItem: (item: Course) => void;
  detailsData?: DetailsData;
}

const SelectionContext = createContext<SelectionContextProps<any> | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: ReactNode; endpoint: string }> = ({
  children,
  endpoint
}) => {
  const [selectedItem, setSelectedItem] = useState<Course>();
  const { data: itemsData, isLoading, error }: UseQueryResult<Course[], Error> = useGetData<Course[]>(endpoint);

  const items = itemsData || [];

  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0]);
    }
  }, [items, selectedItem]);

  // Only make the request when selectedItem is defined and not an empty string
  const shouldFetchDetails = selectedItem && selectedItem.course_type && selectedItem.id;
  const { data: detailsData, error: detailsError }: UseQueryResult<DetailsData, Error> = useGetData<DetailsData>(
    shouldFetchDetails ? `/student/enrollment_stats?course_id=${selectedItem?.id}&course_type=${selectedItem?.course_type}` : '',
    !!shouldFetchDetails,
  );


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Failed to load items: {error.message}</div>;
  }

  return (
    <SelectionContext.Provider value={{ items, selectedItem, setSelectedItem, detailsData }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = <T,>(): SelectionContextProps<T> => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};



//TODO REMOVE THIS ONCE BACKEND FOR ADMIN IS ALSO MIGRATED:

export interface Task {
  id: string;
  title: string;
  link: string;
  task_difficulty: number;
}

export interface OldSelectionContextProps<T> {
  items: T[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  detailsData?: any;
}

const OldSelectionContext = createContext<OldSelectionContextProps<any> | undefined>(undefined);

export const OldSelectionProvider: React.FC<{ children: ReactNode; endpoint: string, secondEndpoint?: string }> = ({
  children,
  endpoint,
  secondEndpoint
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const { data: itemsData, isLoading, error }: UseQueryResult<Course[] | Task[], Error> = useGetData<Course[] | Task[]>(endpoint);

  const items = itemsData || [];

  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0].id);
    }
  }, [items, selectedItem]);

  // Only make the request when selectedItem is defined and not an empty string
  const shouldFetchDetails = selectedItem !== '';
  const { data: detailsData, error: detailsError }: UseQueryResult<DetailsData, Error> = useGetData<any>(
    shouldFetchDetails ? (secondEndpoint ? `${secondEndpoint}/${selectedItem}` : `${endpoint}/${selectedItem}`) : '',
    !!shouldFetchDetails,
  );


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Failed to load items: {error.message}</div>;
  }

  return (
    <OldSelectionContext.Provider value={{ items, selectedItem, setSelectedItem, detailsData }}>
      {children}
    </OldSelectionContext.Provider>
  );
};

export const useOldSelection = <T,>(): OldSelectionContextProps<T> => {
  const context = useContext(OldSelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};

