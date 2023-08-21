import { useDispatch, useSelector } from 'react-redux';
import googleLogo from '../../../assets/google-logo.webp';
import brandLogo from '../../../assets/favicon.png';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const handlePopUp = (e) => {
    e.preventDefault();
    const authWindow = window.open(
      `${process.env.REACT_APP_SERVER_URI}/auth/google`,
      '_blank',
      'width=500,height=600'
    );
    navigate('/');
    popupRef.current = authWindow;
  };

  const listenPopUp = (e) => {
    if (e.origin === process.env.REACT_APP_SERVER_URI) {
      const { token } = e.data;
      localStorage.setItem('token', token);
      document.cookie = `token=${token}; Secure; sameSite=None; path=/`;
      window.location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener('message', listenPopUp);
    return () => {
      window.removeEventListener('message', listenPopUp);
    };
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="  flex justify-center items-center p-4 rounded-md mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <img src={brandLogo} alt="" className="w-10 mr-4 " />
            Expense Tracker
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <button
                className="flex m-auto items-center w-fit justify-between rounded-sm bg-[#4889f4] px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-[#6ea3f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                onClick={handlePopUp}
              >
                <img
                  src={googleLogo}
                  alt="Google logo"
                  className="w-10 bg-white rounded-sm mr-2 p-2"
                />
                Sign in with Google
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in manually
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
