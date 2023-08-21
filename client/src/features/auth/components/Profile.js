import { useSelector } from 'react-redux';
import { selectUser } from '../authSlice';

export default function Profile() {
  const user = useSelector(selectUser);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-solid border-1 border w-96 m-auto rounded-md bg-gray-50 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-25 rounded-full shadow-sm shadow-blue-600 w-auto"
            src={user.avatar}
            alt="Your Company"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name:
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className=" w-full rounded-md border-1 py-1.5 text-gray-500  "
                  value={user.name}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className=" w-full rounded-md border-1 py-1.5 text-gray-500  "
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

            <div>
              <span className="font-medium text-gray-900">Joined</span> -{' '}
              {user.createdAt}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
