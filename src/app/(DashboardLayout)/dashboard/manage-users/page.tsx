import DeleteUserModalProvider from '@/contexts/delete-user.context';
import UserRoleModalProvider from '@/contexts/user-role.context';
import UserStatusModalProvider from '@/contexts/user-status.context';
import AllUsers from './_components/AllUsers';

export default function MyPosts() {
  return (
    <div className="p-4">
      <UserRoleModalProvider>
        <UserStatusModalProvider>
          <DeleteUserModalProvider>
            <AllUsers />
          </DeleteUserModalProvider>
        </UserStatusModalProvider>
      </UserRoleModalProvider>
    </div>
  );
}
