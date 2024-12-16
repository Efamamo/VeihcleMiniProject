import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Add from '../components/Add';

function AddPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Nav />
        <Add />
      </div>
    </div>
  );
}

export default AddPage;
