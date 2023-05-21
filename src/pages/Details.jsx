
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import usePostDetials from '../hooks/use-post-details';
import Loading from '../components/Loading';

const Details = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    return()=>{
      dispatch({type:"posts/cleanRecords"})
    }
  },[dispatch])
  const {loading,error,record}=usePostDetials();
  return (
    <div>
      <Loading loading={loading} error={error} >
        <h2 style={{color: "red"}}>ID :  {record?.id}</h2>
        <h2 style={{color: "red"}}>Title :  {record?.title}</h2>
        <h2 style={{color: "red"}}>Description:  {record?.description}</h2>
      </Loading>
    </div>
  );
}

export default Details;
