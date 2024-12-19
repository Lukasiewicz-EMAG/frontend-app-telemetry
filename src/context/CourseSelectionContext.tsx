import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader/Loader';
import NoDataToDisplay from '../components/NoDataToDisplay/NoDataToDisplay';
import { useGetData } from '../hooks/useGetData';
import { DetailsData } from '../pages/Inf/Details/types';

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

export const SelectionProvider: React.FC<{ children: ReactNode; endpoint: string }> = ({ children, endpoint }) => {
  const queryClient = useQueryClient();
  const { data: itemsData, isLoading, error }: UseQueryResult<Course[], Error> = useGetData<Course[]>(endpoint);

  const items = itemsData || [];

  const selectedItemQueryKey = ['selectedItem', endpoint];

  const { data: selectedItem } = useQuery<Course | undefined>(
    selectedItemQueryKey,
    () => {
      const storedItem = localStorage.getItem(`selectedItem-${endpoint}`);
      let item: any;
      if (storedItem) {
        item = JSON.parse(storedItem);
        // Verify if the item exists in items
        const itemExists = items.some((i) => i.id === item.id);
        if (!itemExists) {
          item = items[0];
        }
      } else {
        item = items[0];
      }
      // Update localStorage
      localStorage.setItem(`selectedItem-${endpoint}`, JSON.stringify(item));
      return item;
    },
    {
      enabled: items.length > 0,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const setSelectedItem = (item: Course) => {
    queryClient.setQueryData(selectedItemQueryKey, item);
    localStorage.setItem(`selectedItem-${endpoint}`, JSON.stringify(item));
  };

  // Fetch detailsData when selectedItem changes
  const shouldFetchDetails = selectedItem && selectedItem.course_type && selectedItem.id;
  const { data: detailsData, error: detailsError }: UseQueryResult<DetailsData, Error> = useGetData<DetailsData>(
    shouldFetchDetails ? `/student/enrollment_stats/${selectedItem?.course_type}/${selectedItem?.id}` : '',
    !!shouldFetchDetails,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NoDataToDisplay title='no_data.student_general.title' desc='no_data.student_general.desc' />;
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

// TODO REMOVE THIS ONCE BACKEND FOR ADMIN IS ALSO MIGRATED:

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

export const OldSelectionProvider: React.FC<{ children: ReactNode; endpoint: string; secondEndpoint?: string }> = ({
  children,
  endpoint,
  secondEndpoint,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const { data: itemsData, isLoading, error }: UseQueryResult<any[], Error> = useGetData<Course[] | Task[]>(endpoint);
  const items = itemsData || [];

  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0].id);
    }
  }, [items, selectedItem]);

  // Only make the request when selectedItem is defined and not an empty string
  const shouldFetchDetails = selectedItem !== '';
  secondEndpoint = `/admin/course/${selectedItem}/general_stats`;

  const { data: detailsData, error: detailsError }: UseQueryResult<DetailsData, Error> = useGetData<any>(
    shouldFetchDetails ? secondEndpoint : '',
    !!shouldFetchDetails,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NoDataToDisplay title='no_data.student_general.title' desc='no_data.student_general.desc' />;
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
