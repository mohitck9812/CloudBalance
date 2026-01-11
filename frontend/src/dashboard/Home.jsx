
import { useSelector } from 'react-redux';

const Home = () => {
    // const { user } = useContext(authData);
    const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div className='flex flex-col h-[88vh] justify-center items-center'>
            <h1 className='text-5xl'>Hello! {user.firstName}</h1>
            <br />
            <h1>Welcome to CloudKeeper</h1>
      </div>
    </div>
  )
}

export default Home
