import { useNavigate } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center'>
      <Tabs defaultValue='account' className='w-3/4 mt-4'>
        <TabsList className='flex justify-center items-center space-x-2'>
          <TabsTrigger className='flex-grow text-center' value='general' onClick={() => navigate('/')}>
            General
          </TabsTrigger>
          <TabsTrigger className='flex-grow text-center' value='details' onClick={() => navigate('/details')}>
            Details
          </TabsTrigger>
          <TabsTrigger className='flex-grow text-center' value='referral' onClick={() => navigate('/referral')}>
            Referral
          </TabsTrigger>
        </TabsList>
        <Separator className='mt-4' />
      </Tabs>
    </div>
  );
};
